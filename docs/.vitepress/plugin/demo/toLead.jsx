import { defineComponent } from 'vue';
import { useCodeCopy } from './hooks/use-codecopy';
import { KMessage, KButton } from '@ksware/ksw-ux';

export const toLeadPlugin = defineComponent({
  name: 'KToLead',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { clickCopy } = useCodeCopy();

    const sourceCode = `import { ${props.name} } from "@ksware/ksw-ux";`;

    const clickCodeCopy = () => {
      clickCopy(sourceCode);
      KMessage({
        message: '复制成功',
        type: 'success'
      });
    };

    return () => 
      <div class="mt-1 flex items-center">
        <div>按需使用：</div>
        <KButton onClick={clickCodeCopy} text>
          {sourceCode}
        </KButton>
      </div>;
  }
});
