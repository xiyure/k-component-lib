import {
  defineComponent,
  ref,
  watch,
  provide,
  nextTick,
  inject,
} from "vue";
import { ElSteps } from "element-plus";
import { genRandomStr, getExposeProxy } from "../../utils";

export default defineComponent({
  name: "KSteps",
  props: {
    processStatus: { type: String, default: "finish" },
    finishStatus: { type: String, default: "success" },
    useAntStyle: { type: Boolean, default: false },
    capsule: { type: Boolean, default: false },
    height: { type: [String, Number], default: undefined },
    active: { type: Number, default: undefined },
  },
  setup(props, { attrs, expose, slots }) {
    const _styleModule = inject("_styleModule", "");
    const steps = ref<any[]>([]);
    const id = genRandomStr(8);
    const KStepsRef = ref(null);

    // 监听高度变化
    watch(
      () => props.height,
      (newValue) => {
        if (!newValue) return;
        if (typeof window !== "undefined") {
          nextTick(() => {
            const stepBoxHeight =
              typeof newValue === "number" ? `${newValue}px` : String(newValue);
            const element = document.getElementById(id);
            element?.style.setProperty("--height", stepBoxHeight);
          });
        }
      },
      { immediate: true }
    );

    // 获取步骤状态
    function getProcessStatus(type: string) {
      switch (type) {
        case "primary":
          return "finish";
        case "wait":
          return "wait";
        case "success":
          return "success";
        case "error":
          return "error";
        default:
          return "finish";
      }
    }

    provide("stepProps", props);
    provide("stepsInfo", steps);

    const instance: unknown = {};
    expose(getExposeProxy(instance, KStepsRef));

    return () => {
      if (props.capsule) {
        const children = slots.default?.()[0]?.children || [];
        steps.value = (children as any[])
          .map((item, index) => {
            if (item.type && item.type.name === "KStep") {
              return {
                key: index,
                name: item.props?.title || "",
              };
            }
            return null;
          })
          .filter((item) => item);
      }
      return (
      <div class={`k-steps ${_styleModule}`}>
        {!props.capsule ? (
          <ElSteps
            ref={KStepsRef}
            {...attrs}
            process-status={getProcessStatus(props.processStatus)}
            finish-status={getProcessStatus(props.finishStatus)}
            active={props.active}
            class={{ "k-steps--ant": props.useAntStyle }}
            v-slots={slots}
          >
          </ElSteps>
        ) : (
          <div id={id} class="k-step__capsule">
            {slots.default?.()}
          </div>
        )}
      </div>
    )};
  },
});
