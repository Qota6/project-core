---
name: ui-ux-review
description: UI/UXの設計レビュー・改善提案を行うスキル。ui-ux-pro-maxプラグインの導入方法も含む。
user_invocable: true
---

# UI/UX レビュースキル

UI/UXの品質チェックと改善提案を行う。

## ui-ux-pro-max プラグイン

高品質なUI/UX設計を支援するプラグイン。50+スタイル、161カラーパレット、99 UXガイドラインを含む。

### インストール

```bash
npm install -g uipro-cli
uipro init --ai claude
```

インストール後、セッション再起動で `/ui-ux-pro-max` スキルが使えるようになる。

### 使い方

- `review` — 既存UIのレビュー・改善提案
- `build` — 新規コンポーネント設計
- `improve` — 既存コンポーネントの改善
- `check` — アクセシビリティ・レスポンシブチェック

## モバイルファースト設計パターン

### ボトムナビゲーション
- 主要機能を3-4タブに集約
- safe-area-inset-bottom対応（ノッチ付き端末）
- activeタブはアクセントカラーで明示

### FAB（フローティングアクションボタン）
- 最頻操作を右下に常時表示
- BottomNavの上に配置（bottom: 64px + safe-area）
- タップフィードバック（scale animaton）

### ヘッダー断捨離
- 上部には最小限の情報（タイトル + ナビ）
- 設定・メニューはボトムナビの設定タブへ
- 親指が届く範囲に操作を集中
