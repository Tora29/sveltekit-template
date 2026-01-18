---
name: split-ui
description: +page.svelteからUIコンポーネントを$lib/{feature}/に分割します。「UI分割」「コンポーネント化」「Phase 2」と言われたときに使用してください。
---

# UI分割（Phase 2）

## 概要

+page.svelteに実装された機能から、再利用可能なUIコンポーネントを切り出す。
動作は変えずに、構造だけを整理する。

## 前提条件

- Phase 1（`/feature`）が完了していること
- +page.svelte に動作する機能が実装されていること

## ワークフロー

```
タスク進捗：
- [ ] ステップ1：現状を分析
- [ ] ステップ2：分割計画を確認
- [ ] ステップ3：コンポーネントを作成
- [ ] ステップ4：+page.svelte を更新
- [ ] ステップ5：動作確認
```

### ステップ1：対象ファイルを確認

**まずユーザーに確認**:

- 分割対象の +page.svelte のパス（例: `src/routes/todo/+page.svelte`）
- 機能名（`$lib/{feature}/` の {feature} 部分）

確認後、対象の +page.svelte を読み、以下を把握:

- UIの構造（どんな要素があるか）
- 状態（`$state`）とその用途
- イベントハンドラ
- 繰り返しパターン

### ステップ2：分割計画を確認

ユーザーに分割計画を提示して確認:

- 作成するコンポーネント一覧
- 各コンポーネントの責務
- Props と イベントの設計

**分割の判断基準**:
- 同じUIパターンが繰り返し出現 → コンポーネント化
- 意味のある単位としてまとまっている → コンポーネント化
- 他のページでも使いそう → コンポーネント化

### ステップ3：コンポーネントを作成

`$lib/{feature}/` にコンポーネントを作成:

```bash
mkdir -p src/lib/{feature}
```

**コンポーネントの基本構造**:

```svelte
<script lang="ts">
  // Props（Svelte 5）
  type Props = {
    item: Item;
    onDelete?: (id: string) => void;
  };

  let { item, onDelete }: Props = $props();
</script>

<!-- UI -->
<div class="component">
  {item.name}
  {#if onDelete}
    <button onclick={() => onDelete(item.id)}>削除</button>
  {/if}
</div>
```

**index.ts を作成**:

```typescript
export { default as ItemCard } from './ItemCard.svelte';
export { default as ItemList } from './ItemList.svelte';
```

### ステップ4：+page.svelte を更新

コンポーネントをインポートして使用:

```svelte
<script lang="ts">
  import { ItemCard, ItemList } from '$lib/{feature}';

  // 状態とロジックはここに残す
  let items = $state([]);

  function handleDelete(id: string) {
    items = items.filter(item => item.id !== id);
  }
</script>

<!-- コンポーネントを使うだけのシンプルな構造 -->
<ItemList>
  {#each items as item}
    <ItemCard {item} onDelete={handleDelete} />
  {/each}
</ItemList>
```

**ポイント**:
- +page.svelte は「組み立てるだけ」の薄いレイヤーに
- 状態管理とロジックは +page.svelte に残す（Phase 3 で分割）
- コンポーネントは見た目と Props/イベントのみを担当

### ステップ5：動作確認

```bash
npm run dev
```

- 動作が Phase 1 と変わらないことを確認
- TypeScript エラーがないことを確認

```bash
npm run check
```

## 完了条件

- 動作が変わらない
- コンポーネントが適切に分離されている
- +page.svelte が薄いレイヤーになっている

## ファイル構成

```
src/lib/{feature}/
├── {Component}.svelte
├── {Component}.svelte           ← 複数可
└── index.ts

src/routes/{feature}/
├── +page.svelte                 ← コンポーネントを使うだけ
└── +page.server.ts
```

## 次のステップ

UI分割が完了したら:

- **Phase 3** (`/adding-e2e-tests`): E2Eテストを追加
