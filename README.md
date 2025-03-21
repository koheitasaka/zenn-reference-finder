# Zenn Reference Finder

[Zenn Reference Finder](https://zenn.dev)は、Zennの記事が他のZenn記事で参照されているかどうかを調べるためのWebアプリケーションです。ユーザーがZennの記事URLを入力すると、参照元の記事タイトルと正確なURLをリスト形式で表示します。

## 技術スタック

- **フロントエンド**: [Next.js](https://nextjs.org) v14.x（App Router使用）
- **TypeScript**: 型安全性を確保
- **Tailwind CSS**: 迅速なUIデザイン
- **外部API**:
  - [Google Custom Search API](https://developers.google.com/custom-search/v1/overview): Zenn内の被リンクを検索
  - [Zenn Search API](https://zenn.dev/api/search): 非公式エンドポイントでタイトルからURLを取得

## セットアップ

このプロジェクトをローカルで実行するには、以下の手順に従ってください：

1. **プロジェクトのクローン**:

   ```bash
   git clone <your-repo-url>
   cd zenn-reference-finder
   ```

2. **依存関係のインストール**:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **環境変数の設定**:

   `.env.local`ファイルを作成し、以下の環境変数を設定してください：

   ```plaintext
   GOOGLE_API_KEY=your_google_api_key
   GOOGLE_CSE_ID=your_search_engine_id
   ```

   Google APIキーの取得方法については、[仕様書](仕様書.md#環境変数設定envlocal)を参照してください。

4. **開発サーバーの起動**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   ブラウザで[http://localhost:3000](http://localhost:3000)を開いて結果を確認してください。

## 主要ファイル

- `app/page.tsx`: メインページ（入力フォームと結果表示）
- `app/api/search/route.ts`: 検索エンドポイント
- `lib/zenn-api.ts`: Zenn APIリクエスト
- `lib/google-search.ts`: Google検索リクエスト
- `types/zenn.ts`: TypeScript型定義

## デプロイ

このアプリケーションは[Vercel](https://vercel.com)でのデプロイを推奨しています。以下のコマンドでデプロイできます：

```bash
vercel
```

詳細なデプロイ手順については、[仕様書](仕様書.md#デプロイとテスト)を参照してください。

## 注意点

- Zenn APIは非公式APIのため、過度な使用は避けてください。
- Google APIには無料枠が1日100リクエストまであります。超過時は課金が必要です。
- 本番環境では`console.error`をロギングサービスに置き換えてください。

## 貢献

このプロジェクトへの貢献を歓迎します。バグ報告、機能提案、プルリクエストはいつでも受け付けています。

## ライセンス

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。
