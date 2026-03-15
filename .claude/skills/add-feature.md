---
name: add-feature
description: 新機能追加時のチェックリスト（TDD + 仕様書更新 + 型定義）
user_invocable: true
---

# 新機能追加スキル

新しい機能を追加する際の手順。

## チェックリスト

1. **仕様書に追加** — `docs/spec.md` に機能番号（Fn）を振って記載
2. **型定義の更新** — `packages/core/src/types/` の型を更新（必要なら）
3. **TDDでコアロジック実装**
   - テストを先に書く（RED）
   - 最小限の実装（GREEN）
   - リファクタリング（REFACTOR）
4. **Web UIの実装** — `apps/web/src/components/` にコンポーネント追加・修正
5. **テスト確認** — `pnpm test` で全テスト通過を確認
6. **ビルド確認** — `pnpm build` で本番ビルド通過を確認

## 注意

- コアロジック（`packages/core`）はプラットフォーム非依存にする
- UIコンポーネントは `apps/web` に閉じる
- 仕様書の「今後の拡張候補」から実装した項目は削除し、「機能詳細」に移動する
