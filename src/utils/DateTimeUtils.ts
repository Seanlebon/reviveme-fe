import { Thread, Comment } from '../types/CommonTypes';

// Gets a user's local timezone
const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

// Separate ISO timestamp into date and time
const getCreatedAtDate = (item: Thread | Comment) =>
  new Date(item.created_at).toLocaleDateString('EN-CA', {
    timeZone: getTimeZone(),
  });

const getCreatedAtTime = (item: Thread | Comment) =>
  new Date(item.created_at).toLocaleTimeString('EN-CA', {
    timeZone: getTimeZone(),
  });

const pluralize = (count: number, unit: string) =>
  Math.floor(count) == 1 ? unit : unit + 's';

// Get the approximate time it's been since the created_at date
const getTimeSinceCreated = (item: Thread | Comment) => {
  const timestamp = Date.parse(item.created_at);
  const seconds = (Date.now() - timestamp) / 1000;

  if (seconds < 60)
    return `${Math.floor(seconds)} ${pluralize(seconds, 'second')}`;

  const minutes = seconds / 60;
  if (minutes < 60)
    return `${Math.floor(minutes)} ${pluralize(minutes, 'minute')}`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)} ${pluralize(hours, 'hour')}`;

  const days = hours / 24;
  if (days < 30) return `${Math.floor(days)} ${pluralize(days, 'day')}`;

  const months = days / 30;
  if (days < 365) return `${months} ${pluralize(months, 'month')}`;

  const years = days / 365;
  return `${years} ${pluralize(years, 'year')}`;
};

export { getCreatedAtDate, getCreatedAtTime, getTimeSinceCreated };
