---
name: mcp-setup
description: MCP（Model Context Protocol）サーバーの設定・トラブルシュートガイド
user_invocable: true
---

# MCP サーバー設定スキル

MCPサーバーの追加・設定・トラブルシュート手順。

## 設定方法

### リモートHTTPサーバー（OAuth認証）

```bash
claude mcp add --transport http --scope local <名前> <URL>
```

例: Cloudflare API
```bash
claude mcp add --transport http --scope local cloudflare https://mcp.cloudflare.com/mcp
```

- 初回は `/mcp` → 「Authenticate」でブラウザOAuth認証が必要
- `.mcp.json` の `"url"` フィールドでも設定可能だが、OAuth認証フローが失敗する場合は CLI経由で追加する方が安定する

### ローカルstdioサーバー（トークン認証）

`.mcp.json` に記述:
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase", "--access-token", "TOKEN", "--project-ref", "REF"]
    }
  }
}
```

### よく使うMCPサーバー

| サーバー | 種類 | 用途 |
|----------|------|------|
| Cloudflare API | リモートHTTP | Pages/Workers/DNS管理 |
| Cloudflare Docs | リモートHTTP | ドキュメント検索 |
| Supabase | ローカルstdio | DB/RLS/Auth管理 |
| GitHub | リモートHTTP | PR/Issue操作 |
| Sentry | リモートHTTP | エラー監視 |

### Cloudflare

```bash
# API操作（Pages, Workers, DNS等）
claude mcp add --transport http --scope local cloudflare https://mcp.cloudflare.com/mcp

# ドキュメント検索
claude mcp add --transport http --scope local cloudflare-docs https://docs.mcp.cloudflare.com/mcp
```

- **注意**: `@cloudflare/mcp-server-cloudflare` (npm) は古いパッケージ。リモートHTTP方式を使う
- OAuth認証後「reconnection failed」と出たらセッション再起動で解決

### Supabase

```bash
# CLI経由
claude mcp add --transport stdio --scope local supabase -- \
  npx -y @supabase/mcp-server-supabase \
  --access-token YOUR_TOKEN --project-ref YOUR_REF
```

または `.mcp.json`:
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase", "--access-token", "TOKEN", "--project-ref", "REF"]
    }
  }
}
```

- トークン取得: https://supabase.com/dashboard/account/tokens
- プロジェクトRef: ダッシュボードURL or API (`https://api.supabase.com/v1/projects`)

## セキュリティ

- `.mcp.json` にはAPIトークンが含まれるため **必ず `.gitignore` に追加**
- トークンは `.env` にも保管し、スキルから参照できるようにする
- anon keyはフロントエンド公開前提なので問題なし、service_role keyは絶対にコミットしない

## トラブルシュート

### 「Failed to reconnect」
1. セッションを再起動（MCPはセッション開始時に接続）
2. `/mcp` で状態確認

### 「Authentication successful, but reconnection failed」
- OAuth成功後の再接続失敗 → セッション再起動で解決

### リモートHTTPサーバーが `.mcp.json` から接続できない
- `.mcp.json` に `"type": "http"` を明示してみる
- それでもダメなら `claude mcp add --transport http` でCLI経由追加（local scopeに保存される）

### 一方のMCPが他方に影響
- 接続失敗するサーバーを一旦削除して他方の動作を確認
- `claude mcp remove <名前>` で削除可能

## スコープ

| スコープ | 保存先 | 共有 |
|----------|--------|------|
| local | `~/.claude.json` | 自分のみ、このプロジェクトのみ |
| project | `.mcp.json` | チーム共有（git管理） |
| user | `~/.claude.json` | 自分のみ、全プロジェクト |

- トークン含む設定は **local** スコープ推奨
- チーム共有する場合は `${ENV_VAR}` で環境変数展開を使う
