import '../src/app/globals.css';
import '../src/app/fonts.css';
import { ClerkProvider} from '@clerk/nextjs'
import type { AppProps } from 'next/app'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
      </ClerkProvider>
  );
}