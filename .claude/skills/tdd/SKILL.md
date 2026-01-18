---
name: tdd
description: ユースケース駆動のTDDでビジネスロジックを作成します。「TDD」「テスト駆動」「Phase 0」「ロジックを先に作成」と言われたときに使用してください。
---

# ロジック作成 TDD（Phase 0）

## 概要

ユースケース駆動のテスト駆動開発（TDD）でビジネスロジックを作成する。
Red → Green → Refactor サイクルで、テスト可能な純粋関数を実装。

**ルール: 1関数 = 1ファイル = 1テストファイル**

## ワークフロー

```
タスク進捗：
- [ ] ステップ1：ユースケースを列挙
- [ ] ステップ2：ディレクトリ構造を作成
- [ ] ステップ3：型定義を作成
- [ ] ステップ4-6：各関数をTDDで実装（Red → Green → Refactor）
- [ ] ステップ7：エクスポート設定
- [ ] ステップ8：テスト実行で確認
```

### ステップ1：ユースケースを列挙

**ユーザーに確認**:

- 機能名（`$lib/{feature}/` の {feature} 部分）
- 主要なユースケース（箇条書きで）

**例**:
```
機能名: todo

ユースケース:
1. Todoを作成できる（createTodo）
2. Todoを取得できる（getTodos）
3. Todoを更新できる（updateTodo）
4. Todoを削除できる（deleteTodo）
5. Todoをフィルタリングできる（filterTodos）
```

各ユースケース = 1関数 = 1ファイル

### ステップ2：ディレクトリ構造を作成

```bash
mkdir -p src/lib/{feature}/service
```

### ステップ3：型定義を作成

`$lib/{feature}/types.ts` を作成:

```typescript
// types.ts
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type FilterType = 'all' | 'active' | 'completed';
```

### ステップ4-6：各関数をTDDで実装

**1関数ずつ Red → Green → Refactor を繰り返す。**

#### 例: createTodo

**Red: テストを作成** (`service/createTodo.spec.ts`)

```typescript
import { describe, it, expect } from 'vitest';
import { createTodo } from './createTodo';

describe('createTodo', () => {
  it('タイトルを指定してTodoを作成できる', () => {
    const todo = createTodo('買い物');
    expect(todo.title).toBe('買い物');
    expect(todo.completed).toBe(false);
    expect(todo.id).toBeDefined();
  });

  it('空のタイトルはエラーになる', () => {
    expect(() => createTodo('')).toThrow();
  });
});
```

**テスト実行（失敗を確認）**:
```bash
npm run test:unit
```

**Green: 実装** (`service/createTodo.ts`)

```typescript
import type { Todo } from '../types';

export function createTodo(title: string): Todo {
  if (!title.trim()) {
    throw new Error('タイトルは必須です');
  }
  return {
    id: crypto.randomUUID(),
    title,
    completed: false
  };
}
```

**テスト実行（パスを確認）**:
```bash
npm run test:unit
```

**Refactor: 必要なら改善**

#### 例: getTodos

**Red** (`service/getTodos.spec.ts`)

```typescript
import { describe, it, expect } from 'vitest';
import { getTodos } from './getTodos';
import type { Todo } from '../types';

describe('getTodos', () => {
  it('全てのTodoを取得できる', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true }
    ];
    expect(getTodos(todos)).toEqual(todos);
  });

  it('空配列を渡すと空配列を返す', () => {
    expect(getTodos([])).toEqual([]);
  });
});
```

**Green** (`service/getTodos.ts`)

```typescript
import type { Todo } from '../types';

export function getTodos(todos: Todo[]): Todo[] {
  return todos;
}
```

#### 例: updateTodo

**Red** (`service/updateTodo.spec.ts`)

```typescript
import { describe, it, expect } from 'vitest';
import { updateTodo } from './updateTodo';

describe('updateTodo', () => {
  it('Todoのタイトルを更新できる', () => {
    const todo = { id: '1', title: 'Old', completed: false };
    const updated = updateTodo(todo, { title: 'New' });
    expect(updated.title).toBe('New');
    expect(updated.id).toBe('1');
  });

  it('Todoの完了状態を更新できる', () => {
    const todo = { id: '1', title: 'Task', completed: false };
    const updated = updateTodo(todo, { completed: true });
    expect(updated.completed).toBe(true);
  });
});
```

**Green** (`service/updateTodo.ts`)

```typescript
import type { Todo } from '../types';

export function updateTodo(todo: Todo, data: Partial<Omit<Todo, 'id'>>): Todo {
  return { ...todo, ...data };
}
```

#### 例: deleteTodo

**Red** (`service/deleteTodo.spec.ts`)

```typescript
import { describe, it, expect } from 'vitest';
import { deleteTodo } from './deleteTodo';

describe('deleteTodo', () => {
  it('指定したIDのTodoを削除できる', () => {
    const todos = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true }
    ];
    const result = deleteTodo(todos, '1');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });
});
```

**Green** (`service/deleteTodo.ts`)

```typescript
import type { Todo } from '../types';

export function deleteTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter(todo => todo.id !== id);
}
```

#### 例: filterTodos

**Red** (`service/filterTodos.spec.ts`)

```typescript
import { describe, it, expect } from 'vitest';
import { filterTodos } from './filterTodos';

describe('filterTodos', () => {
  const todos = [
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: true }
  ];

  it('全てのTodoを取得できる', () => {
    expect(filterTodos(todos, 'all')).toHaveLength(2);
  });

  it('未完了のTodoのみ取得できる', () => {
    const result = filterTodos(todos, 'active');
    expect(result).toHaveLength(1);
    expect(result[0].completed).toBe(false);
  });

  it('完了済みのTodoのみ取得できる', () => {
    const result = filterTodos(todos, 'completed');
    expect(result).toHaveLength(1);
    expect(result[0].completed).toBe(true);
  });
});
```

**Green** (`service/filterTodos.ts`)

```typescript
import type { Todo, FilterType } from '../types';

export function filterTodos(todos: Todo[], filter: FilterType): Todo[] {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}
```

### ステップ7：エクスポート設定

`$lib/{feature}/service/index.ts` を作成:

```typescript
export { createTodo } from './createTodo';
export { getTodos } from './getTodos';
export { updateTodo } from './updateTodo';
export { deleteTodo } from './deleteTodo';
export { filterTodos } from './filterTodos';
```

`$lib/{feature}/index.ts` を作成:

```typescript
// ロジック
export * from './service';

// 型
export type * from './types';
```

### ステップ8：テスト実行で確認

```bash
npm run test:unit
npm run check
```

- 全テストがパスすること
- TypeScriptエラーがないこと

## 完了条件

- 全てのユースケースがテストでカバーされている
- 全テストがパスする
- 1関数 = 1ファイル = 1テストファイル の構造になっている

## ファイル構成（Phase 0 完了時点）

```
src/lib/{feature}/
├── service/
│   ├── createTodo.ts
│   ├── createTodo.spec.ts
│   ├── getTodos.ts
│   ├── getTodos.spec.ts
│   ├── updateTodo.ts
│   ├── updateTodo.spec.ts
│   ├── deleteTodo.ts
│   ├── deleteTodo.spec.ts
│   ├── filterTodos.ts
│   ├── filterTodos.spec.ts
│   └── index.ts            ← re-export
├── types.ts                ← 型定義
└── index.ts                ← エクスポート
```

## バリデーション（zodを使用）

複雑なバリデーションにはzodを使用。バリデーションも1ファイルで作成:

`service/validateTodoInput.ts`:

```typescript
import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(100, '100文字以内'),
});

export type TodoInput = z.infer<typeof todoSchema>;

export function validateTodoInput(input: unknown) {
  return todoSchema.safeParse(input);
}
```

`service/validateTodoInput.spec.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { validateTodoInput } from './validateTodoInput';

describe('validateTodoInput', () => {
  it('有効な入力を受け入れる', () => {
    const result = validateTodoInput({ title: 'Test' });
    expect(result.success).toBe(true);
  });

  it('空のタイトルを拒否する', () => {
    const result = validateTodoInput({ title: '' });
    expect(result.success).toBe(false);
  });
});
```

## 次のステップ

Phase 0 が完了したら:

- **Phase 1** (`/feature`): UIを作成（ロジックをimportして使用）
