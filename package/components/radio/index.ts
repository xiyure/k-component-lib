import Radio from './radio.vue';
import RadioGroup from './radio_group.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KRadio: SFCWithInstall<typeof Radio> &
{
  RadioGroup: typeof RadioGroup
} = withInstall(Radio, { RadioGroup });
export default KRadio;

export const KRadioGroup: SFCWithInstall<typeof RadioGroup> = withInstall(RadioGroup);

export * from './type';