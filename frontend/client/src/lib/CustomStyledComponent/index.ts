import React, { ReactHTML } from 'react';

const style = document.createElement('style');

document.head.appendChild(style);

const css = (styles: string) => {
  const index = style.sheet?.cssRules.length;
  const className = `css-${index}`;
  const rule = `.${className} { ${styles} }`;
  style.sheet?.insertRule(rule, index);
  return className;
};

interface StylePropsFn<P> {
  (x: P): string;
}

export const styled = (tag: keyof ReactHTML) => {
  return function styledTemplate<P = {}>(rules: TemplateStringsArray, ...args: StylePropsFn<P>[]): React.FC<P> {
    return (props) => {
      const resolved = resolveRule(rules, args, props);
      const className = css(resolved);
      return React.createElement(tag, { className, ...props });
    };
  };
};

function resolveRule<P>(parts: TemplateStringsArray, args: StylePropsFn<P>[], props: P) {
  return parts.reduce((output: string, part: string, index: number) => {
    if (index === parts.length - 1) {
      return output + part;
    }
    return output + part + args[index](props);
  });
}
