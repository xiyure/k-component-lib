import ScriptInput from './script_input.vue';
import { withInstall } from '../../utils/install';
import { KScriptInput as _KScriptInput } from '../../../typings/all';

export const KScriptInput = withInstall<typeof _KScriptInput>(ScriptInput);
export default KScriptInput;

export * from './type';