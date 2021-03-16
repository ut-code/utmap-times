import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import { gtagInjectedHeadElements } from "../utils/gtag";

export default class MyDocument extends Document {
  /**
   * SSR時にstyled-componentsのスタイルを適用させるために必要
   * https://styled-components.com/docs/advanced#nextjs
   */
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            // eslint-disable-next-line react/jsx-props-no-spreading
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ja">
        <Head>{gtagInjectedHeadElements}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
