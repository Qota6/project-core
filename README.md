# project-core

新規プロジェクトの土台テンプレート。Claude Code と pnpm モノレポによるTDD開発環境を素早く立ち上げる。

## 含まれるもの

- **CLAUDE.md テンプレート** — プロジェクト固有の情報を穴埋めして使う
- **Claude Code Skills** — TDD、仕様書更新、機能追加、Supabase、MCP設定
- **モノレポ設定** — pnpm workspace、TypeScript、Vitest
- **Memory構造** — プロジェクト横断で学びを蓄積するメモリテンプレート
- **インフラ設定** — .gitignore、.env、Cloudflare Pages、Supabase

## 使い方

```bash
# 1. 新プロジェクトを作成
mkdir my-project && cd my-project && git init

# 2. Claude Code でこのリポジトリを読み込む
claude "https://github.com/Qota6/project-core を参考に、このプロジェクトの土台を構築して。
プロジェクト名: MyApp
概要: ○○するアプリ"
```

## Skills一覧

| スキル | コマンド | 説明 |
|--------|----------|------|
| TDD | `/tdd` | RED→GREEN→REFACTORワークフロー |
| 仕様書更新 | `/update-spec` | 機能追加時に仕様書を同期 |
| 機能追加 | `/add-feature` | 機能追加チェックリスト |
| Supabase | `/supabase` | DB/Auth設定・RLS管理 |
| MCP設定 | `/mcp-setup` | MCPサーバーの追加・トラブルシュート |

## 技術方針

- **TDD**: テストを先に書く（仕様書ベース、実装ベースNG）
- **モノレポ**: core（共有ロジック）+ web/native（UI層）
- **StorageAdapter**: localStorage → Supabase への移行を抽象化
- **無料ホスティング**: Cloudflare Pages + Supabase + Expo EAS
