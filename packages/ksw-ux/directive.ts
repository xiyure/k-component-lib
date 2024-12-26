import { App } from 'vue';
import * as directives from '../directives';

// register directives
type Directive = keyof typeof directives;
export function useDirectives(app: App) {
  for (const name in directives) {
    app.directive(`ksw_${name}`, (directives[name as Directive]));
  }
}