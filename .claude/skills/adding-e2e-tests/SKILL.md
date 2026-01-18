---
name: adding-e2e-tests
description: E2Eテストを追加し、ユーザーフロー全体の品質を保証します。「E2Eテスト」「Playwrightテスト」「Phase 3」と言われたときに使用してください。
---

# E2Eテスト追加（Phase 3）

## 概要

Playwrightを使用してユーザーフロー全体をテストする。
ユニットテストでは検証できない、実際のブラウザでの動作を確認する。

## 前提条件

- Phase 1〜3 のいずれかが完了していること
- 機能が動作すること

## ワークフロー

```
タスク進捗：
- [ ] ステップ1：テスト対象を確認
- [ ] ステップ2：テストシナリオを設計
- [ ] ステップ3：E2Eテストを作成
- [ ] ステップ4：テスト実行と確認
```

### ステップ1：テスト対象を確認

**ユーザーに確認**:

- テスト対象の機能名（例: `todo`）
- 対象ページのパス（例: `/todo`）
- 主要なユーザーフロー

確認後、対象ページの +page.svelte を読み、以下を把握:

- ページの主要な要素（フォーム、ボタン、リストなど）
- ユーザーが行う操作フロー
- 期待される結果

### ステップ2：テストシナリオを設計

ユーザーに提示して確認:

- テストするシナリオの一覧
- 各シナリオの操作と期待結果

**テストシナリオの選び方**:

- ハッピーパス（正常系）を優先
- クリティカルなユーザーフローを網羅
- エッジケースは必要に応じて追加

**例: Todoアプリのシナリオ**:

1. ページが表示される
2. 新しいタスクを追加できる
3. タスクを完了にできる
4. タスクを削除できる
5. フィルタリングが動作する

### ステップ3：E2Eテストを作成

`e2e/{feature}.test.ts` を作成:

```typescript
import { expect, test } from '@playwright/test';

test.describe('{feature} feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/{feature}');
  });

  test('should display the page correctly', async ({ page }) => {
    // ページタイトルまたは主要要素の確認
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should add a new item', async ({ page }) => {
    // フォームに入力
    await page.fill('input[name="title"]', 'New Item');

    // 送信ボタンをクリック
    await page.click('button[type="submit"]');

    // 結果を確認
    await expect(page.locator('text=New Item')).toBeVisible();
  });

  test('should complete an item', async ({ page }) => {
    // アイテムを追加
    await page.fill('input[name="title"]', 'Task to complete');
    await page.click('button[type="submit"]');

    // 完了チェックボックスをクリック
    await page.click('input[type="checkbox"]');

    // 完了状態を確認
    await expect(page.locator('.completed')).toBeVisible();
  });

  test('should delete an item', async ({ page }) => {
    // アイテムを追加
    await page.fill('input[name="title"]', 'Task to delete');
    await page.click('button[type="submit"]');

    // 削除ボタンをクリック
    await page.click('button.delete');

    // 削除されたことを確認
    await expect(page.locator('text=Task to delete')).not.toBeVisible();
  });
});
```

### Playwright セレクタのパターン

**推奨: data-testid を使用**:

```svelte
<!-- +page.svelte -->
<button data-testid="submit-button">送信</button>
<input data-testid="title-input" />
<ul data-testid="item-list">
  {#each items as item}
    <li data-testid="item-{item.id}">{item.name}</li>
  {/each}
</ul>
```

```typescript
// e2e/{feature}.test.ts
await page.click('[data-testid="submit-button"]');
await page.fill('[data-testid="title-input"]', 'New Item');
await expect(page.locator('[data-testid="item-list"]')).toBeVisible();
```

**その他のセレクタ**:

```typescript
// テキストで検索
await page.click('text=送信');
await expect(page.locator('text=New Item')).toBeVisible();

// ロールで検索（アクセシビリティ）
await page.click('role=button[name="送信"]');

// CSSセレクタ
await page.click('button.primary');
await page.fill('input[name="title"]');

// 複合セレクタ
await page.locator('form').locator('button[type="submit"]').click();
```

### よく使うアサーション

```typescript
// 表示されている
await expect(page.locator('h1')).toBeVisible();

// 表示されていない
await expect(page.locator('.error')).not.toBeVisible();

// テキストを含む
await expect(page.locator('.message')).toContainText('成功');

// 特定のテキスト
await expect(page.locator('.count')).toHaveText('3件');

// 属性を持つ
await expect(page.locator('input')).toHaveAttribute('disabled', '');

// 要素数
await expect(page.locator('li')).toHaveCount(3);

// URLの確認
await expect(page).toHaveURL('/dashboard');
```

### フォーム操作

```typescript
// テキスト入力
await page.fill('input[name="email"]', 'test@example.com');

// セレクトボックス
await page.selectOption('select[name="category"]', 'option-value');

// チェックボックス
await page.check('input[type="checkbox"]');
await page.uncheck('input[type="checkbox"]');

// ラジオボタン
await page.check('input[value="option1"]');

// ファイルアップロード
await page.setInputFiles('input[type="file"]', 'path/to/file.pdf');

// フォーム送信
await page.click('button[type="submit"]');
```

### 待機パターン

```typescript
// 要素が表示されるまで待機
await page.waitForSelector('.loaded');

// ネットワークリクエストが完了するまで待機
await page.waitForResponse(response =>
  response.url().includes('/api/items') && response.status() === 200
);

// ナビゲーションが完了するまで待機
await Promise.all([
  page.waitForNavigation(),
  page.click('a[href="/next-page"]')
]);

// カスタム条件で待機
await page.waitForFunction(() => {
  return document.querySelectorAll('li').length > 0;
});
```

### ステップ4：テスト実行と確認

```bash
npm run test:e2e
```

**特定のテストのみ実行**:

```bash
npx playwright test e2e/{feature}.test.ts
```

**UIモードでデバッグ**:

```bash
npx playwright test --ui
```

**ヘッドフルモード（ブラウザ表示）**:

```bash
npx playwright test --headed
```

## 完了条件

- E2Eテストがパスする
- 主要なユーザーフローがカバーされている

## ファイル構成

```
e2e/
└── {feature}.test.ts    ← E2Eテスト
```

## 注意事項

### テストの独立性

各テストは独立して実行できるようにする:

```typescript
test.beforeEach(async ({ page }) => {
  // 毎回初期状態から開始
  await page.goto('/{feature}');
});
```

### テストデータのリセット

データベースを使用する場合は、テスト前にリセット:

```typescript
test.beforeEach(async ({ page, request }) => {
  // APIでデータをリセット（テスト用エンドポイント）
  await request.post('/api/test/reset');
  await page.goto('/{feature}');
});
```

### フレーキーテストを避ける

- 固定のタイムアウト（`page.waitForTimeout`）は避ける
- 条件による待機（`waitForSelector`）を使用
- ネットワーク状態に依存しない

### data-testid の追加

E2Eテスト作成時に、必要に応じて +page.svelte やコンポーネントに `data-testid` を追加する。
