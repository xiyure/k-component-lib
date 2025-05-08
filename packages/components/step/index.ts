import Steps from './steps.vue';
import Step from './step.vue';
import { withInstall, withNoopInstall } from '../../utils/install';
import { KSteps as _KSteps, KStep as _KStep } from '../../../typings/all';

export const KSteps = withInstall<typeof _KSteps, { Step: typeof Step }>(Steps, { Step });
export default KSteps;

export const KStep = withNoopInstall<typeof _KStep>(Step);

export * from './type';