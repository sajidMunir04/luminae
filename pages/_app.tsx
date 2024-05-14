import '../src/app/globals.css';
import '../src/app/fonts.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
      <Component {...pageProps} />
  );
}