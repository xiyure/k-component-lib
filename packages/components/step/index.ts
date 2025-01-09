import Steps from './steps.vue';
import Step from './step.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall, withNoopInstall } from '../../utils/install';

export const KSteps: SFCWithInstall<typeof Steps> &
{
  Step: typeof Step
} = withInstall(Steps, { Step });
export default KSteps;

export const KStep: SFCWithInstall<typeof Step> = withNoopInstall(Step);

export * from './type';