import { Theme } from '../types/museeks';
// IMPROVE ME: scan the directory for all json files instead
import lightTheme from '../themes/light.json';
import darkTheme from '../themes/dark.json';
import omniTheme from '../themes/omni.json';

export const themes = [lightTheme as Theme, darkTheme as Theme, omniTheme as Theme];
