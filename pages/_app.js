import { useEffect } from 'react';
import '@/styles/globals.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PageTransitions from '../components/PageTransitions';
import { useRouter } from 'next/router';
import { SessionProvider, useSession } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <SessionProvider session={session}>
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
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push('/unauthorized?message=admin login required');
  }
  if (vendorOnly && !session.user.isVendor) {
    router.push('/unauthorized?message=vendor login required');
  }
  return children;
}