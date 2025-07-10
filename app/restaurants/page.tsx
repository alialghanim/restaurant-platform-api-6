'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RestaurantsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/my-restaurants');
  }, [router]);

  return null;
}
