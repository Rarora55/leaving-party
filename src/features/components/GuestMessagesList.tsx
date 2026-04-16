import type { MessageCard } from '../../shared/types/site.types';
import { GuestMessageCard } from './GuestMessageCard';

interface GuestMessagesListProps {
  messages: MessageCard[];
  isEmpty: boolean;
}

export function GuestMessagesList({ messages, isEmpty }: GuestMessagesListProps) {
  if (isEmpty) {
    return (
      <div className="rounded-[2rem] border border-dashed border-ink/15 bg-white/70 px-6 py-16 text-center shadow-soft backdrop-blur-sm">
        <p className="font-display text-sm uppercase tracking-[0.24em] text-ink/55">
          Empty wall
        </p>
        <p className="mx-auto mt-4 max-w-xl font-body text-lg leading-8 text-ink/65">
          No notes yet. Leave the first one.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 pb-2">
      {messages.map((message, index) => (
        <GuestMessageCard key={message.id} message={message} index={index} />
      ))}
    </div>
  );
}
