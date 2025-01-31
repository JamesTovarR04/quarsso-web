import { MsalInterceptorConfiguration, MsalGuardConfiguration } from '@azure/msal-angular';
import {
  IPublicClientApplication,
  PublicClientApplication,
  BrowserCacheLocation,
  LogLevel,
  InteractionType,
} from '@azure/msal-browser';

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(logLevel, message);
}

export function msalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'f58215a8-77d8-4f48-b0f5-36013b7e3aa7', //environment.msalConfig.auth.clientId,
      authority: 'https://login.microsoftonline.com/c5508734-a3bb-4b43-978d-b6ac685fc2a5/', //environment.msalConfig.auth.authority,
      redirectUri: '/',
      postLogoutRedirectUri: '/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function msalInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['User.Read']);

  protectedResourceMap.set(`http://localhost:4200/api/*`, [`api://7376dc7a-eaf6-4369-8065-10cf40bb2d01/.default`]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function msalGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
    loginFailedRoute: '/login-failed',
  };
}
