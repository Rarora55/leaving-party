import { useEffect, useState } from 'react';
import { HomeEntryPopup } from '../../features/home/components/HomeEntryPopup';
import { HomeScene } from '../../features/home/components/HomeScene';

export function HomePage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setIsPopupOpen(true);
  }, []);

  return (
    <main>
      {isPopupOpen ? (
        <HomeEntryPopup onClose={() => setIsPopupOpen(false)} />
      ) : null}
      <HomeScene />
    </main>
  );
}
