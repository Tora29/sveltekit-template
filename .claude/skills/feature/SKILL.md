---
name: feature
description: 新機能を+page.svelteに全て実装します。「新機能」「機能を作成」と言われたときに使用してください。
---

# UI作成（Phase 1）

## 概要

Phase 0（`/tdd`）で作成したロジックを使用して、UIを+page.svelteに実装する。
ロジックはimportして使うだけ。UIの状態管理とイベントハンドリングに集中。

## 前提条件

- Phase 0（`/tdd`）が完了していること
- `$lib/{feature}/` にロジックと型が存在すること

## ワークフロー

```
タスク進捗：
- [ ] ステップ1：要件を確認
- [ ] ステップ2：ルートを作成
- [ ] ステップ3：+page.svelte に実装
- [ ] ステップ4：+page.server.ts を作成（必要な場合）
- [ ] ステップ5：動作確認
```

### ステップ1：要件を確認

ユーザーに以下を確認:

- 機能名（ルートパスになる）
- 画面のレイアウト・デザイン要件
- サーバー処理の有無（データ取得、フォーム送信など）

Phase 0で作成済みのロジックを確認:

```bash
ls src/lib/{feature}/
```

### ステップ2：ルートを作成

```bash
mkdir -p src/routes/{feature}
```

### ステップ3：+page.svelte に実装

**ロジックと型をimportして使用**:

```svelte
<script lang="ts">
  import {
    createTodo,
    toggleTodo,
    filterTodos,
    deleteTodo
  } from '$lib/{feature}';
  import type { Item, FilterType } from '$lib/{feature}';

  // Props（サーバーからのデータ）
  let { data } = $props();

  // 状態
  let items: Item[] = $state(data.items ?? []);
  let filter: FilterType = $state('all');
  let newTitle = $state('');

  // 派生状態（ロジックを使用）
  let filteredItems = $derived(filterTodos(items, filter));

  // イベントハンドラ（ロジックを使用）
  function handleAdd() {
    try {
      const newItem = createTodo(newTitle);
      items = [...items, newItem];
      newTitle = '';
    } catch (e) {
      // バリデーションエラー処理
    }
  }

  function handleToggle(item: Item) {
    items = items.map(i => i.id === item.id ? toggleTodo(i) : i);
  }
</script>

<!-- UI -->
<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Todo</h1>

  <!-- 入力フォーム -->
  <form onsubmit={handleAdd} class="mb-4">
    <input
      type="text"
      bind:value={newTitle}
      placeholder="新しいTodo"
      class="border p-2 rounded"
    />
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
      追加
    </button>
  </form>

  <!-- フィルター -->
  <div class="mb-4">
    <button onclick={() => filter = 'all'}>全て</button>
    <button onclick={() => filter = 'active'}>未完了</button>
    <button onclick={() => filter = 'completed'}>完了</button>
  </div>

  <!-- リスト -->
  <ul>
    {#each filteredItems as item (item.id)}
      <li class="flex items-center gap-2 p-2">
        <input
          type="checkbox"
          checked={item.completed}
          onchange={() => handleToggle(item)}
        />
        <span class:line-through={item.completed}>{item.title}</span>
      </li>
    {/each}
  </ul>
</div>
```

**ポイント**:
- ビジネスロジックは `$lib/{feature}/` からimport
- +page.svelte は状態管理・イベントハンドリング・UIのみ
- スタイルはTailwindCSSを使用

### ステップ4：+page.server.ts を作成（必要な場合）

サーバー処理が必要な場合のみ作成:

```typescript
import type { PageServerLoad, Actions } from './$types';

// データ取得
export const load: PageServerLoad = async () => {
  return {
    items: []
  };
};

// フォーム処理
export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    // ...
  }
};
```

### ステップ5：動作確認

```bash
npm run dev
```

ブラウザで `http://localhost:5173/{feature}` を開き、動作を確認。

```bash
npm run check
```

TypeScriptエラーがないことを確認。

## 完了条件

- 機能が動作する
- ユーザーが画面を確認できる
- ロジックは `$lib/{feature}/` からimportしている

## ファイル構成（Phase 1 完了時点）

```
src/lib/{feature}/
├── service/
│   ├── {feature}.ts        ← Phase 0 で作成済み
│   └── {feature}.spec.ts   ← Phase 0 で作成済み
├── types.ts                ← Phase 0 で作成済み
└── index.ts                ← Phase 0 で作成済み

src/routes/{feature}/
├── +page.svelte            ← 今回作成（UIのみ）
└── +page.server.ts         ← サーバー処理（任意）
```

## 次のステップ

機能が完成したら、必要に応じて:

- **Phase 2** (`/split-ui`): UIをコンポーネントに分割
- **Phase 3** (`/adding-e2e-tests`): E2Eテストを追加
