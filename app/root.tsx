import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,   
  LiveReload,
  
} from "@remix-run/react";
import  DiscountDetails  from "./routes/ProductDiscountForm";
import { AppProvider  } from "@shopify/polaris";

export default function App() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
      <AppProvider i18n={{}}>
      {/* <DiscountDetails/> */}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {/* <LiveReload /> */}
        </AppProvider>
      </body>
    </html>
  );
}
