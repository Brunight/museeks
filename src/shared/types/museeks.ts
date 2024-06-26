/**
 * Player related stuff
 */
export enum PlayerStatus {
  PLAY = 'play',
  PAUSE = 'pause',
  STOP = 'stop',
}

export enum Repeat {
  ALL = 'all',
  ONE = 'one',
  NONE = 'none',
}

export enum SortBy {
  ARTIST = 'artist',
  ALBUM = 'album',
  TITLE = 'title',
  DURATION = 'duration',
  GENRE = 'genre',
}

export enum SortOrder {
  ASC = 'asc',
  DSC = 'dsc',
}

/**
 * App models
 */
export interface Track {
  album: string;
  artist: string[];
  disk: {
    no: number;
    of: number;
  };
  duration: number;
  genre: string[];
  loweredMetas: {
    artist: string[];
    album: string;
    title: string;
    genre: string[];
  };
  path: string;
  playCount: number;
  title: string;
  track: {
    no: number;
    of: number;
  };
  year: number | null;
}

export interface Playlist {
  name: string;
  tracks: string[];
  importPath?: string; // associated m3u file
}

/**
 * Database schemes
 */
export type TrackModel = PouchDB.Core.ExistingDocument<
  Track & PouchDB.Core.AllDocsMeta
>;

export type PlaylistModel = PouchDB.Core.ExistingDocument<
  Playlist & PouchDB.Core.AllDocsMeta
>;

/**
 * Editable track fields (via right-click -> edit track)
 */
export type TrackEditableFields = Pick<
  TrackModel,
  'title' | 'artist' | 'album' | 'genre'
>;

/**
 * Various
 */
export interface Toast {
  id: string;
  content: string;
  type: ToastType;
}

export type ToastType = 'success' | 'danger' | 'warning';

export interface LibrarySort {
  by: SortBy;
  order: SortOrder;
}

/**
 * Config
 */

export interface ConfigBounds {
  width: number;
  height: number;
  x: number;
  y: number;
}

// https://github.com/microsoft/TypeScript/issues/29729#issuecomment-460346421
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyThemeID = string & { whatever?: any };
// TODO: how to automate this? Maybe losen types to "string"
type ThemeIDs = 'dark' | 'light' | 'omni' | AnyThemeID;

export interface Config {
  theme: ThemeIDs | '__system';
  audioVolume: number;
  audioPlaybackRate: number;
  audioOutputDevice: string;
  audioMuted: boolean;
  audioShuffle: boolean;
  audioRepeat: Repeat;
  tracksDensity: 'normal' | 'compact';
  defaultView: string;
  librarySort: {
    by: SortBy;
    order: SortOrder;
  };
  // musicFolders: string[],
  sleepBlocker: boolean;
  autoUpdateChecker: boolean;
  displayNotifications: boolean;
  bounds: ConfigBounds;
}

/**
 * Themes
 */

export interface Theme {
  _id: ThemeIDs;
  name: string;
  themeSource: Electron.NativeTheme['themeSource'];
  variables: Record<string, string>;
}

/**
 * Helpers
 */

type StringableKey<T> = T extends readonly unknown[]
  ? number extends T['length']
    ? number
    : `${number}`
  : string | number;

export type Path<T> = T extends object
  ? {
      [P in keyof T & StringableKey<T>]: `${P}` | `${P}.${Path<T[P]>}`;
    }[keyof T & StringableKey<T>]
  : never;
