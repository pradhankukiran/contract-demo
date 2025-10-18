import { Mark, mergeAttributes } from '@tiptap/core';

export interface RiskHighlightOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    riskHighlight: {
      setRiskHighlight: (level: 'critical' | 'high' | 'medium' | 'low') => ReturnType;
      unsetRiskHighlight: () => ReturnType;
    };
  }
}

export const RiskHighlight = Mark.create<RiskHighlightOptions>({
  name: 'riskHighlight',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      level: {
        default: null,
        parseHTML: element => element.getAttribute('data-risk-level'),
        renderHTML: attributes => {
          if (!attributes.level) {
            return {};
          }

          return {
            'data-risk-level': attributes.level,
            class: `risk-highlight risk-${attributes.level}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-risk-level]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setRiskHighlight:
        (level: 'critical' | 'high' | 'medium' | 'low') =>
        ({ commands }) => {
          return commands.setMark(this.name, { level });
        },
      unsetRiskHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
