import '../src/components/globals.css';
import '../src/components/fonts.css';
import { ClerkProvider} from '@clerk/nextjs'
import Head from 'next/head';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <><Head>
      <title>Luminae</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    </Head><ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider></>
  );
}