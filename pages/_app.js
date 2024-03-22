import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.scss';
import '@/styles/editorStyles.scss';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { StoreProvider } from '@/utils/Store';
import PageTransitions from '../components/PageTransitions';
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner';
import { SessionProvider, useSession } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PageTransitions route={router.asPath}>
          {Component.auth ? (
            <Auth 
              adminOnly={Component.auth.adminOnly} 
              vendorOnly={Component.auth.vendorOnly}
            >
              <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
        </PageTransitions>
      </StoreProvider>
    </SessionProvider>
  ) 
}

function Auth({ children, adminOnly, vendorOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    }
  });
  if ( status === 'loading') {
    return <Spinner animation="grow" />;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push('/unauthorized?message=admin login required');
  }
  if (vendorOnly && !session.user.isVendor) {
    router.push('/unauthorized?message=vendor login required');
  }
  return children;
}