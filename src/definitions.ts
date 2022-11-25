/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    GoogleAuth: GoogleAuthPluginOptions;
  }
}

export interface User {
  id: string;
  email: string;

  name: string;
  familyName: string;
  givenName: string;
  imageUrl: string;

  serverAuthCode: string;
  authentication: Authentication;
}

export interface Authentication {
  accessToken: string;
  idToken: string;

  /**
   * refreshToken only for iOS and Android
   */
  refreshToken?: string;
}

export interface GoogleAuthPluginOptions {
  /**
   * API Key, found and created in the Google Developers Console.
   * common for Android or iOS
   * @example xxxxxx-xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
   * @since 3.3.0
   */
  apiKey?: string;

  /**
   * The app's client ID, found and created in the Google Developers Console.
   * common for Android or iOS
   * @example xxxxxx-xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
   * @since 3.1.0
   */
  clientId?: string;

  /**
   * Specific client ID key for iOS
   * @since 3.1.0
   */
  iosClientId?: string;

  /**
   * Specific client ID key for Android
   * @since 3.1.0
   */
  androidClientId?: string;

  /**
   * Scopes that you might need to request to access Google APIs
   * @example ["profile", "email"]
   * @default []
   * @see @link https://developers.google.com/identity/protocols/oauth2/scopes
   */
  scopes?: string[];

  /**
   * This is used for offline access and server side handling
   * @example xxxxxx-xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
   * @default false
   */
  serverClientId?: string;

  /**
   * Force user to select email address to regenerate AuthCode used to get a valid refreshtoken (work on iOS and Android)
   * @default false
   */
  forceCodeForRefreshToken?: boolean;
}

export interface InitOptions extends Pick<GoogleAuthPluginOptions, 'scopes' | 'clientId' | 'apiKey'> {
  /**
   * Set if your application needs to refresh access tokens when the user is not present at the browser.
   * In response use `serverAuthCode` key
   *
   * @default false
   * @since 3.1.0
   * */
  grantOfflineAccess: boolean;
}

export interface CalendarEvent {
  kind: 'calendar#event';
  etag: string;
  id: string;
  status?: 'conmfirmed' | 'tentative' | 'cancelled' | undefined;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location?: string | undefined;
  colorId?: string | undefined;
  creator: {
    id?: string | undefined;
    email?: string | undefined;
    displayName?: string | undefined;
    self?: boolean | undefined;
  };
  organizer: {
    id?: string | undefined;
    email?: string | undefined;
    displayName?: string | undefined;
    self?: boolean | undefined;
  };
  start: {
    date?: string | undefined;
    dateTime?: string | undefined;
    timeZone?: string | undefined;
  };
  end: {
    date?: string | undefined;
    dateTime?: string | undefined;
    timeZone?: string | undefined;
  };
  endTimeUnspecified?: boolean | undefined;
  recurrence: string[];
  recurringEventId?: string | undefined;
  originalStartTime?:
    | {
        date: string;
        dateTime: string;
        timeZone?: string | undefined;
      }
    | undefined;
  transparency?: 'opaque' | 'transparent' | undefined;
  visibility?: 'default' | 'public' | 'private' | 'confidential' | undefined;
  iCalUID: string;
  sequence: number;
  attendees?:
    | {
        id: string;
        email: string;
        displayName?: string | undefined;
        organizer: boolean;
        self: boolean;
        resource: boolean;
        optional?: boolean | undefined;
        responseStatus: 'needsAction' | 'declined' | 'tentative' | 'accepted';
        comment?: string | undefined;
        additionalGuests?: number | undefined;
      }[]
    | undefined;
  attendeesOmitted?: boolean | undefined;
  extendedProperties?:
    | {
        private: {
          [key: string]: string;
        };
        shared: {
          [key: string]: string;
        };
      }
    | undefined;
  hangoutLink?: string | undefined;
  gadget?:
    | {
        type: string;
        title: string;
        link: string;
        iconLink: string;
        width?: number | undefined;
        height?: number | undefined;
        display?: 'icon' | 'chip' | undefined;
        preferences: {
          [key: string]: string;
        };
      }
    | undefined;
  anyoneCanAddSelf?: boolean | undefined;
  guestsCanInviteOthers?: boolean | undefined;
  guestsCanModify?: boolean | undefined;
  guestsCanSeeOtherGuests?: boolean | undefined;
  privateCopy?: boolean | undefined;
  locked?: boolean | undefined;
  reminders: {
    useDefault: boolean;
    overrides?:
      | {
          method: 'email' | 'sms' | 'popup';
          minutes: number;
        }[]
      | undefined;
  };
  source?:
    | {
        url: string;
        title: string;
      }
    | undefined;
  attachments?:
    | {
        fileUrl: string;
        title: string;
        mimeType: string;
        iconLink: string;
        fileId: string;
      }[]
    | undefined;
}

export interface CalendarEventResponse {
  kind: 'calendar#events';
  etag: string;
  summary: string;
  description: string;
  updated: string;
  timeZone: string;
  accessRole: 'none' | 'freeBusyReader' | 'reader' | 'writer' | 'owner';
  defaultReminders: {
    method: 'email' | 'sms' | 'popup';
    minutes: number;
  }[];
  nextPageToken?: string | undefined;
  nextSyncToken?: string | undefined;
  items: CalendarEvent[];
}

export interface GoogleAuthPlugin {
  signIn(): Promise<User>;
  refresh(): Promise<Authentication>;
  signOut(): Promise<any>;
  getEventList(): Promise<CalendarEventResponse>;

  /**
   * Init hook for load gapi and init plugin
   * @since 3.1.0
   * */
  initialize(options?: Partial<InitOptions>): void;
}
