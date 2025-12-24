import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7dae9d49922046cb9fc91824f48e4b16',
  appName: 'TempMail',
  webDir: 'dist',
  server: {
    url: 'https://7dae9d49-9220-46cb-9fc9-1824f48e4b16.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  ios: {
    contentInset: 'automatic',
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
