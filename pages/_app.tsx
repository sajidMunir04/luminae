
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
      <Component {...pageProps} />
  )
}