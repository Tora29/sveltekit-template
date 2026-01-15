# 高度なスキル例: PDF処理

スクリプト付き、ワークフロー付きのスキルの例。

## ディレクトリ構造

```
processing-pdfs/
├── SKILL.md
├── FORMS.md
├── REFERENCE.md
└── scripts/
    ├── analyze_form.py
    ├── fill_form.py
    └── validate.py
```

## SKILL.md

```markdown
---
name: processing-pdfs
description: PDFファイルからテキストと表を抽出し、フォームに入力し、ドキュメントをマージします。PDFファイル、フォーム、またはドキュメント抽出について言及されたときに使用してください。
---

# PDF処理

## クイックスタート

テキスト抽出にはpdfplumberを使用：

```python
import pdfplumber

with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

## ユーティリティスクリプト

**analyze_form.py**: PDFからフォームフィールドを抽出
```bash
python scripts/analyze_form.py input.pdf > fields.json
```

**fill_form.py**: フィールド値をPDFに適用
```bash
python scripts/fill_form.py input.pdf fields.json output.pdf
```

**validate.py**: 出力を検証
```bash
python scripts/validate.py output.pdf
```

## ワークフロー

このチェックリストをコピーして進行状況を追跡：

```
タスク進捗：
- [ ] ステップ1：フォームを分析（analyze_form.py）
- [ ] ステップ2：フィールドマッピングを作成（fields.json編集）
- [ ] ステップ3：マッピングを検証（validate.py）
- [ ] ステップ4：フォームに入力（fill_form.py）
- [ ] ステップ5：出力を確認（validate.py）
```

## 参照

**フォーム入力**: [FORMS.md](FORMS.md) を参照
**APIリファレンス**: [REFERENCE.md](REFERENCE.md) を参照
```

## FORMS.md

```markdown
# フォーム入力ガイド

## フィールドタイプ

| タイプ | 説明 | 例 |
|--------|------|-----|
| text | テキスト入力 | 名前、住所 |
| checkbox | チェックボックス | 同意確認 |
| radio | ラジオボタン | 性別選択 |
| signature | 署名欄 | 契約署名 |

## fields.json 形式

```json
{
  "field_name": {
    "type": "text",
    "value": "入力値",
    "x": 100,
    "y": 200
  }
}
```

## エラー処理

**フィールドが見つからない場合**:
1. analyze_form.py の出力を確認
2. フィールド名のスペルを確認
3. 座標が正しいか確認

**検証が失敗した場合**:
1. エラーメッセージを確認
2. fields.json を修正
3. 再度検証を実行
```

## ポイント

1. **段階的開示**: SKILL.mdは概要のみ、詳細はFORMS.mdに
2. **ワークフロー**: チェックリスト形式で進行管理
3. **フィードバックループ**: 検証→修正→繰り返し
4. **スクリプト**: 決定論的な操作は事前作成
5. **エラー処理**: 明示的な対処法を記載
