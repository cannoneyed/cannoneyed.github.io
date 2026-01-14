import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useScrollRestoration() {
  const router = useRouter();

  useEffect(() => {
    const saveScrollPos = () => {
      const scrollPos = window.scrollY;
      const key = `scroll-pos-${router.asPath}`;
      sessionStorage.setItem(key, scrollPos.toString());
    };

    const restoreScrollPos = () => {
      const key = `scroll-pos-${router.asPath}`;
      const scrollPos = sessionStorage.getItem(key);
      if (scrollPos) {
        window.scrollTo(0, parseInt(scrollPos, 10));
      }
    };

    // Restore on mount
    restoreScrollPos();

    // Save on route change start (for client-side nav)
    const handleRouteChangeStart = () => {
      saveScrollPos();
    };

    // Save on beforeunload (for full reloads)
    window.addEventListener('beforeunload', saveScrollPos);
    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      window.removeEventListener('beforeunload', saveScrollPos);
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router]);
}
