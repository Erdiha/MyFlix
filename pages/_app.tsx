import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../data/data';
import {
  RecoilRoot
} from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  //wrap whole app with auth to prevent unprotected url
  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp
