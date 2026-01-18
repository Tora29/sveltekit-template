# SvelteKit SSR Template

AI駆動開発用のSvelteKitテンプレート。

## Stack

Svelte 5, SvelteKit 2, TailwindCSS 4, TypeScript 5, Prisma 7 (PostgreSQL), Vitest, Playwright, zod

## Structure

- `$lib/{feature}/` - 機能別ディレクトリ（components/, service/, types.ts, index.ts）
- `$lib/shared/` - 共有コード（components/, server/, utils/, types/）
- `prisma/` - スキーマ定義とマイグレーション
- `e2e/` - E2Eテスト

## Commands

```bash
npm run check        # 型チェック（ビルド前に必須）
npm run test:unit    # ユニットテスト
npm run test:e2e     # E2Eテスト
```

## Conventions

- テストはソースの隣に配置: `*.spec.ts`
- サーバー専用コードは `server/` ディレクトリに配置
- TDD: テスト → 失敗確認 → 実装 → パス
