import { useCodeCopy } from './hooks/use-codecopy';
import { KMessage } from '@ksware/ksw-ux';
const { clickCopy } = useCodeCopy();

export const toLeadPlugin = (componentName: string) => {
  const sourceCode = `import { ${componentName} } from "antd";`;

  const clickCodeCopy = () => {
    clickCopy(sourceCode);
    KMessage({
      message: '复制成功',
      type: 'success'
    });
  };

  return `
    <div>
      <k-button onClick={${clickCodeCopy}} text>
        ${sourceCode}
      </k-button>
    </div>
  `;
};
