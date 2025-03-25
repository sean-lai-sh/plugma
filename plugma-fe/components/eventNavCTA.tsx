'use client';

import { useAuth } from '@/lib/providers/AuthProvider';
import { Button } from './ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink } from 'lucide-react';

type Props = {
  slug?: string;
};

const EventNavCTA = ({ slug }: Props) => {
  const { user, loading } = useAuth();
  const [isHost, setIsHost] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkHost = async () => {
      if (!slug || !user?.id) return;

      const params = new URLSearchParams({ event_id: slug, user_id: user.id });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/check_host/?${params.toString()}`, {
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        setIsHost(data ? true : false); // or however your backend returns it
      }
    };

    checkHost();
  }, [slug, user]);

  if (loading) return null;

  return isHost && slug ? (
    <a href={`/event/manage/${slug}`}>
      <Button size="sm">Manage Event
      <ExternalLink className="h-4 w-4" />
      </Button>
    </a>
  ) : (
    <Link href={`/create`}>
        <Button
        size="sm"
        onClick={() => {
            router.push('/create');
        }}
        >
        Create New Event
        </Button>
    </Link>
  );
};

export default EventNavCTA;
