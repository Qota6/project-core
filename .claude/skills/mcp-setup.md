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

- 初回は `/mcp` → 「Authenticate」でブラウザOAuth認証が必要
- `.mcp.json` の `"url"` フィールドでも設定可能だが、OAuth認証フローが失敗する場合は CLI経由で追加する方が安定する

### ローカルstdioサーバー（トークン認証）

`.mcp.json` に記述:
```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "package-name", "--token", "TOKEN"]
    }
  }
}
```

### よく使うMCPサーバー

| サーバー | 種類 | コマンド/URL |
|----------|------|-------------|
| Cloudflare API | リモートHTTP | `https://mcp.cloudflare.com/mcp` |
| Cloudflare Docs | リモートHTTP | `https://docs.mcp.cloudflare.com/mcp` |
| Supabase | ローカルstdio | `npx -y @supabase/mcp-server-supabase` |
| GitHub | リモートHTTP | `https://api.githubcopilot.com/mcp/` |
| Sentry | リモートHTTP | `https://mcp.sentry.dev/mcp` |

## セキュリティ

- `.mcp.json` にはAPIトークンが含まれるため **必ず `.gitignore` に追加**
- トークンは `.env` にも保管し、スキルから参照できるようにする

## トラブルシュート

### 「Failed to reconnect」
- セッションを再起動（MCPはセッション開始時に接続）

### 「Authentication successful, but reconnection failed」
- OAuth成功後の再接続失敗 → セッション再起動で解決

### リモートHTTPサーバーが `.mcp.json` から接続できない
- `claude mcp add --transport http` でCLI経由追加が安定

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
