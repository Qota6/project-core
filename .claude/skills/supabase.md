---
name: supabase
description: Supabaseの確認・設定・スキーマ変更・マイグレーション・RLS管理を行うスキル
user_invocable: true
---

# Supabase スキル

Supabaseに関する操作・変更を行う際のガイドライン。

## 認証情報

- Management APIトークンとプロジェクト情報は `.env` に格納（`.gitignore` 済み）
- フロントエンド用キーは `apps/web/.env.local` に格納

```bash
# .env から読み込んで使う
source .env
```

## API操作パターン

### テーブル・RLS確認
```bash
source .env
curl -s -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.supabase.com/v1/projects/$SUPABASE_PROJECT_REF/database/query" \
  -d '{"query": "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = '\''public'\''"}'
```

### SQL実行（テーブル作成・RLSポリシー設定など）
```bash
source .env
curl -s -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.supabase.com/v1/projects/$SUPABASE_PROJECT_REF/database/query" \
  -d '{"query": "YOUR SQL HERE"}'
```

### プロジェクト情報確認
```bash
source .env
curl -s -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  "https://api.supabase.com/v1/projects/$SUPABASE_PROJECT_REF"
```

## 構成

- ストレージ抽象層: `packages/core/src/storage/adapter.ts` に `StorageAdapter` インターフェース
- アダプター実装:
  - `LocalStorageAdapter` — ローカル保存（オフラインフォールバック）
  - `SupabaseAdapter` — クラウド同期
- Supabase クライアント: `apps/web/src/lib/supabase.ts`
- 認証UI: `apps/web/src/components/AuthModal.tsx`

## ルール

- 環境変数は `.env` / `.env.local` に配置（`.gitignore` 済み）
- スキーマ変更時はマイグレーションSQLを `supabase/migrations/` にも保存
- **RLS（Row Level Security）を必ず有効にする**
- publicスキーマの全テーブルにRLSポリシーを設定すること
- anon keyはフロントエンド公開前提、service_role keyは絶対にフロントに含めない
