'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IntranetPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/intranet/dashboard');
  }, [router]);

  return null;
}