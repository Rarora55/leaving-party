import type { MessageCard } from '../../shared/types/site.types';
import { GuestMessageCard } from './GuestMessageCard';

interface GuestMessagesListProps {
  messages: MessageCard[];
  isEmpty: boolean;
}

export function GuestMessagesList({ messages, isEmpty }: GuestMessagesListProps) {
  if (isEmpty) {
    return (
      <div className="rounded-[2rem] border border-dashed border-ink/15 bg-white/60 px-6 py-16 text-center shadow-soft">
        <p className="font-display text-sm uppercase tracking-[0.24em] text-ink/55">
          Empty wall
        </p>
        <p className="mx-auto mt-4 max-w-xl font-body text-lg leading-8 text-ink/65">
          No messages have been published yet. Leave the first note and start the pile.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 pb-10">
      {messages.map((message, index) => (
        <GuestMessageCard key={message.id} message={message} index={index} />
      ))}
    </div>
  );
}
