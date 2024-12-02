import ScriptInput from './script_input.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KScriptInput: SFCWithInstall<typeof ScriptInput> = withInstall(ScriptInput);
export default KScriptInput;

export * from './type';