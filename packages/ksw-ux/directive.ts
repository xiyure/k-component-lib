import * as directives from '../directives';

// register directives
export function useDirectives(app: any) {
  for (const name in directives) {
    app.directive(`ksw_${name}`, directives[name]);
  }
}