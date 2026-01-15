---
name: creating-prs
description: mainブランチから作業ブランチを作成し、変更をコミット分割してPRを作成します。また、マージ後のブランチクリーンアップも行います。「PR作成」「プルリクエスト」「完了」と言われたときに使用してください。
---

# PR作成とクリーンアップ

## フロー判定

ユーザーの発言に応じてフローを選択:

- **「PR作成」「プルリクエスト」** → PR作成フローへ
- **「完了」** → クリーンアップフローへ

---

## PR作成フロー

### ステップ1：現在の状態を確認

```bash
git status
git branch --show-current
```

**確認事項**:
- 現在mainブランチにいるか
- 未コミットの変更があるか

**既に作業ブランチの場合**: ステップ5へスキップ

### ステップ2：変更をスタッシュ

```bash
git stash push -m "WIP: PR preparation"
```

**変更がない場合**: ステップ3へ進む

### ステップ3：ブランチを作成

ユーザーに変更内容を確認し、適切なブランチ名を提案:

```bash
# 新機能の場合
git checkout -b feature/機能名

# バグ修正の場合
git checkout -b fix/修正内容
```

**命名規則**:
- 小文字、ハイフン区切り
- 簡潔かつ説明的に
- 例: `feature/user-authentication`, `fix/date-format-bug`

**ブランチが既に存在する場合**:
1. ユーザーに確認
2. 別名を使用（`-v2`サフィックス等）
3. または既存ブランチを使用

### ステップ4：変更を復元

```bash
git stash pop
```

**コンフリクトが発生した場合**:
1. `git status` でコンフリクトファイルを確認
2. 手動で解決
3. `git add [ファイル]` で解決済みをマーク
4. `git stash drop` でスタッシュを削除

### ステップ5：コミットを分割して作成

**変更の確認**:
```bash
git status
git diff
```

**コミット分割の指針**:

1. **論理単位で分割**: 機能追加、バグ修正、リファクタリング、テスト、ドキュメント
2. **各コミットは独立**: 単体でビルド可能であること
3. **小さく保つ**: 1コミット = 1つの目的

**部分的なステージング**:
```bash
# ファイル内の一部だけをステージ
git add -p [ファイル]

# 対話モードで y/n を選択
# y = この変更をステージ
# n = スキップ
# s = より細かく分割
```

**Conventional Commits形式**:
```
feat: 新機能を追加
fix: バグを修正
docs: ドキュメントを更新
refactor: コードを整理
test: テストを追加
chore: 雑務タスク
```

**コミット例**:
```bash
git add src/auth/
git commit -m "feat(auth): JWT認証を実装"

git add tests/
git commit -m "test(auth): 認証のユニットテストを追加"

git add README.md
git commit -m "docs: 認証機能のセットアップ手順を追加"
```

### ステップ6：リモートにプッシュ

```bash
git push -u origin [ブランチ名]
```

**失敗した場合**:
- 認証エラー: SSH/HTTPSの設定を確認
- 権限エラー: リポジトリへのアクセス権を確認

### ステップ7：PRを作成

```bash
gh pr create --base main --title "タイトル" --body "説明"
```

**PRタイトル**: Conventional Commits形式を推奨
**PR本文**: コミットメッセージから自動生成可

**ghコマンドがない場合**:
```
手動でPRを作成:
https://github.com/[owner]/[repo]/compare/main...[ブランチ名]
```

**PRテンプレート**:
```markdown
## What
<!-- 何を変更したか -->

## Why
<!-- なぜ変更が必要か（Issue リンクなど） -->

## How
<!-- どう実装したか -->

## Test
<!-- テスト内容・確認方法 -->
- [ ] ユニットテスト追加/更新
- [ ] 手動確認済み

## Checklist
- [ ] Breaking changes: なし / あり（詳細: ）
- [ ] デグレ確認: 既存機能に影響なし
```

---

## クリーンアップフロー

ユーザーが「完了」と言った場合、PRがマージされたと判断:

### ステップ1：現在の状態を確認

```bash
git branch --show-current
git status
```

**削除するブランチ名を記録**

**未コミットの変更がある場合**:
```
警告: 未コミットの変更があります。
- スタッシュする: git stash push -m "temp"
- コミットする
- 破棄する: git checkout -- . (注意)
```

### ステップ2：mainに切り替え

```bash
git checkout main
```

### ステップ3：最新を取得

```bash
git pull origin main
```

**コンフリクトが発生した場合**:
1. `git status` で確認
2. コンフリクトを解決
3. `git add [ファイル]` && `git commit`

### ステップ4：ローカルブランチを削除

```bash
git branch -d [ブランチ名]
```

**「not fully merged」エラーの場合**:
```
警告: ブランチがマージされていない可能性があります。
確認後、強制削除する場合: git branch -D [ブランチ名]
```

### ステップ5：リモートブランチを削除

```bash
git push origin --delete [ブランチ名]
```

**既に削除済みの場合**: エラーを無視

---

## エラー対処リファレンス

### ブランチ名が既に存在する

```bash
git branch -a | grep [名前]
```

選択肢:
1. 別の名前を使用: `[名前]-v2`
2. 既存を削除（安全な場合）
3. 既存にチェックアウト

### gh認証エラー

```bash
gh auth status
gh auth login
```

### プッシュが拒否された

```bash
# リモートの状態を確認
git fetch origin
git log origin/main..HEAD
```

---

## ヒント

- **コミットは小さく**: レビューしやすく、リバートしやすい
- **ブランチは短命に**: 長期間放置するとコンフリクトが増える
- **PRは早めに作成**: ドラフトPRで早期レビューを得る
