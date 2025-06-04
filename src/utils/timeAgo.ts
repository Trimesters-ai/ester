// Utility to format timestamps as "now", "2 minutes ago", etc. using date-fns
import { format, formatDistanceToNow, isThisMinute } from 'date-fns';

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  // If less than 1 minute ago, show "now"
  if (isThisMinute(date)) return 'now';
  // If less than 1 hour, show relative (e.g. "2 minutes ago")
  const diff = Math.abs(now.getTime() - date.getTime());
  if (diff < 60 * 60 * 1000) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  // Otherwise, show time in 12-hour format (e.g. 2:13 PM)
  return format(date, 'h:mm a');
}
