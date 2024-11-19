import Radio from './radio.vue';
import RadioGroup from './radio_group.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall, withNoopInstall } from '../../utils/install';

export const KRadio: SFCWithInstall<typeof Radio> &
{
  RadioGroup: typeof RadioGroup
} = withInstall(Radio, { RadioGroup });
export default KRadio;

export const KRadioGroup: SFCWithInstall<typeof RadioGroup> = withNoopInstall(RadioGroup);

export * from './type';