# UTMap Times

[Pyxida株式会社](https://pyxida.jp/) x [ut.code();](https://utcode.net/)

https://utmap.jp/

## 技術構成

* [Next.js](https://nextjs.org/)
* [TypeScript](https://nextjs.org/)
* [Apollo Client](https://www.apollographql.com/)
* [DatoCMS](https://www.datocms.com/)
* [Vercel](https://vercel.com/)

## 環境構築手順

1. リポジトリをクローンする
2. `/.env.local.sample` を `/.env.local` にコピーし、必要な情報を入力する
   * `NEXT_PUBLIC_GRAPHQL_ENDPOINT`: [DatoCMS](https://www.datocms.com/)のAPIエンドポイント
   * `NEXT_PUBLIC_GRAPHQL_TOKEN`: [DatoCMS](https://www.datocms.com/)の認証トークン
   * `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID`: `gtag.js`の識別子
3. `npm ci`
4. `npm run prebuild`
5. `npm run graphql:codegen`
6. `npm run dev`

## GraphQL

`npm run graphql:codegen` を実行すると、 [graphql-tag](https://github.com/apollographql/graphql-tag) により記述されたGraphQLクエリからTypeScriptの型定義情報が `/__generated__` に生成される。

## Storybook

* `npm run storybook`: Storybookの開発用サーバーの起動
* https://ut-code.github.io/utmap-times/
