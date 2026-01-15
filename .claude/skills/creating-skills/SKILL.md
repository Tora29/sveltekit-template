---
name: creating-skills
description: Claudeエージェント用のスキル（SKILL.md）を作成します。スキルの作成、スキルテンプレート、ベストプラクティスについて質問されたときに使用してください。
---

# スキル作成ガイド

## クイックスタート

### 1. 基本構造を作成

```
.claude/skills/your-skill-name/
├── SKILL.md          # メイン指示（必須）
└── (参照ファイル)     # 必要に応じて追加
```

### 2. SKILL.md を作成

```markdown
---
name: your-skill-name
description: スキルの説明。何をするか＋いつ使うかを含める。
---

# スキルタイトル

## 使い方
（指示をここに）
```

### 3. 命名規則

**推奨: 動名詞形**
- `processing-pdfs`
- `analyzing-data`
- `creating-reports`

**name フィールド**: 小文字、数字、ハイフンのみ（最大64文字）

### 4. 説明の書き方

- **三人称で書く**（「〜します」ではなく「〜する」）
- **何をするか** + **いつ使うか** を含める
- 最大1024文字

**良い例**:
```yaml
description: PDFファイルからテキストと表を抽出します。PDFファイルやドキュメント抽出について言及されたときに使用してください。
```

## コア原則

1. **簡潔に**: Claudeが既に知っていることは書かない
2. **適切な自由度**: タスクの脆弱性に応じて指示の厳密さを調整
3. **段階的開示**: SKILL.mdは500行以下、詳細は別ファイルに

## 参照

**テンプレート**: [TEMPLATES.md](TEMPLATES.md) - スキルテンプレート集
**パターン**: [PATTERNS.md](PATTERNS.md) - 共通パターン
**チェックリスト**: [CHECKLIST.md](CHECKLIST.md) - 公開前の品質確認
**例**: [examples/](examples/) - 実際のスキル例
