import { detect } from 'detect-browser';

const browser = detect();

export const isUserAgentTelegram = browser?.name.includes('webview');
