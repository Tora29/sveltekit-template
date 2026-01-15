# スキルテンプレート集

## 1. シンプルなスキル

コードなし、指示のみのスキル用。

````markdown
---
name: skill-name
description: スキルの説明。何をするか＋いつ使うかを含める。
---

# スキルタイトル

## 概要
（スキルの目的を1-2文で）

## 使い方

1. ステップ1の説明
2. ステップ2の説明
3. ステップ3の説明

## ガイドライン

- ガイドライン1
- ガイドライン2
- ガイドライン3
````

## 2. コード付きスキル

ユーティリティスクリプトを含むスキル用。

````markdown
---
name: skill-name
description: スキルの説明。何をするか＋いつ使うかを含める。
---

# スキルタイトル

## クイックスタート

```python
# 基本的な使用例
import library
result = library.do_something("input")
```

## ユーティリティスクリプト

**script_name.py**: スクリプトの説明

```bash
python scripts/script_name.py input_file output_file
```

## 高度な機能

詳細は [REFERENCE.md](REFERENCE.md) を参照してください。
````

## 3. ワークフロー付きスキル

複数ステップのタスク用。

````markdown
---
name: skill-name
description: スキルの説明。何をするか＋いつ使うかを含める。
---

# スキルタイトル

## ワークフロー

このチェックリストをコピーして進行状況を追跡します：

```
タスク進捗：
- [ ] ステップ1：（説明）
- [ ] ステップ2：（説明）
- [ ] ステップ3：（説明）
- [ ] ステップ4：（説明）
```

### ステップ1：（タイトル）

（詳細な指示）

### ステップ2：（タイトル）

（詳細な指示）

### ステップ3：（タイトル）

（詳細な指示）

### ステップ4：（タイトル）

（詳細な指示）

検証が失敗した場合は、ステップ2に戻ってください。
````

## 4. ドメイン別整理スキル

複数のドメインを扱うスキル用。

````markdown
---
name: skill-name
description: スキルの説明。何をするか＋いつ使うかを含める。
---

# スキルタイトル

## 利用可能なドメイン

**ドメインA**: 説明 → [reference/domain-a.md](reference/domain-a.md)
**ドメインB**: 説明 → [reference/domain-b.md](reference/domain-b.md)
**ドメインC**: 説明 → [reference/domain-c.md](reference/domain-c.md)

## クイック検索

grepを使用して特定の情報を検索：

```bash
grep -i "keyword" reference/domain-a.md
```
````

## ディレクトリ構造例

### シンプルなスキル
```
skill-name/
└── SKILL.md
```

### 中規模スキル
```
skill-name/
├── SKILL.md
├── REFERENCE.md
└── EXAMPLES.md
```

### 大規模スキル
```
skill-name/
├── SKILL.md
├── reference/
│   ├── domain-a.md
│   ├── domain-b.md
│   └── domain-c.md
├── examples/
│   ├── basic.md
│   └── advanced.md
└── scripts/
    ├── utility1.py
    └── utility2.py
```
