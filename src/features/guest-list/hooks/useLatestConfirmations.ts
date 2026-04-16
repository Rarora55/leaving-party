import { useCallback, useEffect, useState } from 'react';
import { fetchLatestConfirmedRSVPs } from '../../../services/supabase/guestList.api';
import type { LatestConfirmationItem } from '../../../shared/types/site.types';

const MAX_CONFIRMATIONS = 3;

function sortLatestConfirmations(items: LatestConfirmationItem[]) {
  return [...items]
    .sort((left, right) => {
      const confirmedDelta =
        new Date(right.confirmedAt).getTime() - new Date(left.confirmedAt).getTime();

      if (confirmedDelta !== 0) {
        return confirmedDelta;
      }

      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    })
    .slice(0, MAX_CONFIRMATIONS);
}

export function useLatestConfirmations() {
  const [items, setItems] = useState<LatestConfirmationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const latestItems = await fetchLatestConfirmedRSVPs(MAX_CONFIRMATIONS);
      setItems(sortLatestConfirmations(latestItems));
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Unable to load the latest confirmations right now.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const prependConfirmation = (item: LatestConfirmationItem) => {
    setItems((current) => sortLatestConfirmations([item, ...current]));
  };

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    items,
    isLoading,
    error,
    refresh,
    prependConfirmation,
  };
}
