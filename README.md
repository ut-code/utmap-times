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
2. `/.env.local.sample` を `/.env.local` にコピーし、[DatoCMS](https://www.datocms.com/)のAPIトークンを設定する
3. `npm ci`
4. `npm run graphql:codegen`
5. `npm run dev`

## GraphQL

`npm run graphql:codegen` を実行すると、 [graphql-tag](https://github.com/apollographql/graphql-tag) により記述されたGraphQLクエリからTypeScriptの型定義情報が `/__generated__` に生成されます。
