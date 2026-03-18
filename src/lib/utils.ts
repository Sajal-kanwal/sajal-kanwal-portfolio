export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

export function normalize(str: string): string {
  return str.toLowerCase().trim();
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function getWeatherEmoji(condition: string): string {
  switch (condition) {
    case 'Clear': return '☀️';
    case 'Clouds': return '☁️';
    case 'Rain': return '🌧️';
    case 'Drizzle': return '🌦️';
    case 'Thunderstorm': return '⛈️';
    case 'Snow': return '❄️';
    case 'Mist':
    case 'Fog':
    case 'Haze': return '🌫️';
    default: return '🌡️';
  }
}

export function formatTime(): string {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const utcOffset = now.getTimezoneOffset() / -60;
  const utcSign = utcOffset >= 0 ? '+' : '-';
  const utcString = `UTC${utcSign}${Math.abs(utcOffset)}`;
  return `${hours}:${minutes} ${ampm} (${utcString})`;
}
