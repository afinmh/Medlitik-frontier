'use client';

import { useEffect, useState } from 'react';

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

export function ClientOnly({ children, fallback = null }) {
  const isClient = useIsClient();

  if (!isClient) {
    return fallback;
  }

  return children;
}
