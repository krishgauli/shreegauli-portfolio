export function readLocalStorage(key: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeLocalStorage(key: string, value: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function readCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const encodedName = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const trimmed = cookie.trim();
    if (trimmed.startsWith(encodedName)) {
      return decodeURIComponent(trimmed.slice(encodedName.length));
    }
  }

  return null;
}

export function writeCookie(name: string, value: string, days = 180): boolean {
  if (typeof document === 'undefined') {
    return false;
  }

  try {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
    return true;
  } catch {
    return false;
  }
}
