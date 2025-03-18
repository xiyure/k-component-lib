import { StyleModules, CompSize, CssVariables } from '../../utils/typescript';

export interface GlobalProviderProps {
  locale?: 'zh' | 'en'
  styleModule?: StyleModules
  size?: CompSize
  cssVariables: CssVariables
}