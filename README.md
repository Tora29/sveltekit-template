# SvelteKit SSR Template

AI駆動開発用のSvelteKitテンプレート。

## Stack

- **Frontend**: Svelte 5, SvelteKit 2, TailwindCSS 4
- **Backend**: Prisma 7, PostgreSQL
- **Testing**: Vitest, Playwright
- **Type Safety**: TypeScript 5, Zod

## セットアップ

```bash
# 依存関係をインストール
npm install

# PostgreSQLを起動
docker compose up -d

# マイグレーションを実行
npx prisma migrate deploy

# 開発サーバーを起動
npm run dev
```

## コマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | プロダクションビルド |
| `npm run check` | 型チェック |
| `npm run lint` | Lint実行 |
| `npm run format` | コード整形 |
| `npm run test:unit` | ユニットテスト |
| `npm run test:e2e` | E2Eテスト |

## ディレクトリ構造

```
src/
├── lib/
│   ├── {feature}/        # 機能別ディレクトリ
│   │   ├── components/
│   │   ├── service/
│   │   ├── types.ts
│   │   └── index.ts
│   └── shared/           # 共有コード
│       ├── components/
│       ├── server/
│       ├── utils/
│       └── types/
├── routes/               # ページ
└── app.html
prisma/                   # DBスキーマ
e2e/                      # E2Eテスト
```

## 開発フロー

1. **TDD**: テスト → 失敗確認 → 実装 → パス
2. テストはソースの隣に配置: `*.spec.ts`
3. サーバー専用コードは `server/` に配置
