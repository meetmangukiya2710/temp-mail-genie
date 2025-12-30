import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.tempmail',
  appName: 'Temp Mail OneTap',
  webDir: 'dist',
  ios: {
    contentInset: 'never',
    webContentsDebuggingEnabled: true,
    limitsNavigationsToAppBoundDomains: false,
    scrollEnabled: true,
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
