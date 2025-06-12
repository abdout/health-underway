import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function parseStringify<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function convertFileToUrl(file: File) {
  return URL.createObjectURL(file);
}

export function encryptKey(value: string): string {
  return Buffer.from(value, "utf-8").toString("base64");
}

export function decryptKey(value: string): string {
  return Buffer.from(value, "base64").toString("utf-8");
}

export function formatDateTime(date: Date | string, options?: Intl.DateTimeFormatOptions) {
  const d = typeof date === "string" ? new Date(date) : date;
  const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", ...(options || {}) });
  const timeFormatter = new Intl.DateTimeFormat("en-US", { timeStyle: "short", ...(options || {}) });

  return {
    dateTime: `${dateFormatter.format(d)} ${timeFormatter.format(d)}`.trim(),
    date: dateFormatter.format(d),
    time: timeFormatter.format(d),
  } as const;
}
