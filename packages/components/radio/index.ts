import Radio from './radio.vue';
import RadioGroup from './radio_group.vue';
import { withInstall, withNoopInstall } from '../../utils/install';
import { KRadio as _KRadio, KRadioGroup as _KRadioGroup } from '../../../typings/all';

export const KRadio = withInstall<typeof _KRadio, { RadioGroup: typeof _KRadioGroup }>(Radio, { RadioGroup });
export default KRadio;

export const KRadioGroup = withNoopInstall<typeof _KRadioGroup>(RadioGroup);

export * from './type';