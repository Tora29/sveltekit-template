---
paths:
  - "src/**/*.ts"
  - "src/**/*.svelte"
---

# Import順序ルール

TypeScript/Svelteファイルでimportを書く際は、以下の順序とコメントを使用する。

## 順序

1. 外部ライブラリ（node_modules）
2. フレームワーク固有（@sveltejs/*）
3. プロジェクト内絶対パス（$lib/*）
4. 相対パス（./*, ../*)

## フォーマット

各グループの先頭にコメントを付け、グループ間は空行で区切る。
type importは各グループの末尾にまとめる。

```typescript
// 外部ライブラリ
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

// SvelteKit
import { error, json } from '@sveltejs/kit';

// 内部モジュール
import { validateUser } from '$lib/shared/utils';
import type { User } from '$lib/user/types';

// 相対インポート
import { helper } from './helper';
import type { LocalType } from './types';
```

## 例外

- importが1〜2行のみの小さなファイルではコメント不要
- テストファイル（*.spec.ts）ではコメント省略可
