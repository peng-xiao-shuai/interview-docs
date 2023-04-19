import type { Plugin } from 'vite';
import MarkdownIt from 'markdown-it';
import { highlight } from '../utils/highlight';
const md = new MarkdownIt();

export function MarkdownTransform(): Plugin {
  return {
    name: 'element-plus-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return;

      // 替换内容
      const newCode = code.replaceAll(
        /:::\sdemo([\s\S]*?):::/g,
        (_, source) => {
          return `<Demo source="${encodeURIComponent(
            highlight(source, 'md')
          )}"></Demo>`;
        }
      );

      return newCode;
    },
  };
}
