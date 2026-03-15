# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

## 技術スタック

- React 19 + TypeScript
- Vite（ビルド）
- pnpm ワークスペース（モノレポ）
- {{ADDITIONAL_TECH}}

## ディレクトリ構成

```
packages/core/        # @{{PROJECT_SLUG}}/core — 共有ロジック（Web/Native共通）
  src/constants/      # 定数定義
  src/types/          # 型定義
  src/utils/          # ユーティリティ関数
  src/hooks/          # カスタムフック
  src/storage/        # StorageAdapter（localStorage / Supabase）
  src/__tests__/      # コアのテスト（node環境）

apps/web/             # @{{PROJECT_SLUG}}/web — Webアプリ
  src/components/     # UIコンポーネント
  src/lib/            # 外部サービス接続（Supabase等）
  src/styles/         # CSS・共有スタイル
  src/__tests__/      # コンポーネントテスト（jsdom環境）

apps/native/          # @{{PROJECT_SLUG}}/native — Expo（将来追加）

docs/                 # 仕様書
.claude/skills/       # Claude Code スキル
```

## テスト方針

- **TDD**: テストを先に書いてから実装する（RED → GREEN → REFACTOR）
- **仕様書ベース**: `docs/spec.md` の記載に基づいてテストを書く
- 実装の内部構造に依存しないブラックボックステストを基本とする
- テストフレームワーク: Vitest
- コマンド: `pnpm test` / `pnpm test:core` / `pnpm test:web`

## 仕様書

- 仕様書は `docs/spec.md` に配置
- アプリの機能追加・変更時は仕様書も同時に更新すること（`/update-spec`）

## ホスティング

- Web: Cloudflare Pages（無料枠、商用利用可）
- Native: Expo EAS（無料枠）
- DB/Auth: Supabase（無料枠）

## project-core 同期ルール

- このプロジェクトで再利用可能なskillsや設定パターンを作成・更新した場合、`project-core` リポジトリ（`/Users/kotaro/Documents/GitHub/project-core`）にも汎用化して反映する
- プロジェクト固有の記述（ファイル名、プロジェクト名等）は `{{PLACEHOLDER}}` 形式に置き換える
- 対象: skills、CLAUDE.md、memory-template、設定ファイルテンプレート

# currentDate
Today's date is {{CURRENT_DATE}}.
