import '../src/app/globals.css';
import '../src/app/fonts.css';
import UserProvider from '@/app/utils/UserContext';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
      <UserProvider>
      <Component {...pageProps} />
      </UserProvider>
  )
}