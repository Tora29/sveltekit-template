---
name: regenerating-claude-md
description: CLAUDE.mdを再生成します。「CLAUDE.md更新」「プロジェクト説明を更新」と言われたときに使用してください。
---

# CLAUDE.md 再生成

## 基本原則

LLMはステートレス関数であり、コードベースについて知っているのは入力したトークンだけ。CLAUDE.mdはすべてのセッションに自動的に含まれる唯一のファイル。

## ワークフロー

```
タスク進捗：
- [ ] ステップ1：コードベース分析
- [ ] ステップ2：CLAUDE.md作成
- [ ] ステップ3：検証
```

### ステップ1：コードベース分析

以下を確認：

```bash
# 技術スタック
cat package.json | jq '.dependencies, .devDependencies'

# ディレクトリ構造
find src -type d | head -20

# 既存のCLAUDE.md
cat CLAUDE.md
```

### ステップ2：CLAUDE.md作成

**必須3要素**:

1. **WHAT**: 技術スタック、プロジェクト構造、ファイルマップ
2. **WHY**: プロジェクトの目的と各部分の機能
3. **HOW**: 作業方法、テスト実行方法、検証手段

**テンプレート**:

```markdown
# プロジェクト名

（1-2文でプロジェクトの目的）

## Stack

（主要技術をカンマ区切りで）

## Structure

- `path/` - 説明
- `path/` - 説明

## Commands

```bash
command    # 説明
```

## Conventions

- 規約1
- 規約2
```

### ステップ3：検証

- [ ] 300行未満か
- [ ] 指示数は150以下か（システムプロンプトで50使用済み）
- [ ] 普遍的に適用可能な情報のみか
- [ ] コードスタイル規則を含んでいないか（linter/hookに任せる）

## アンチパターン

- `/init` などの自動生成を使用
- コードスタイル規則を記載（autoformatter/hookを使う）
- タスク固有の指示を含める（別ファイルに分離）
- 関連性の低い情報を含める
