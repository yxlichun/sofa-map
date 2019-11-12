import * as React from 'react';

require('./iconfont.js');
require('./iconfont.css');

// 组件库内置了部分Icon，可以直接使用；SVG图标使用
export type IconFontType = 'car' | 'warehouse';

export interface IconProps {
  type: IconFontType;
}

function Icon(props: IconProps) {
  return (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref={`#icon-${props.type}`} />
    </svg>
  )
}

export interface IconFontProps {
  size?: [number, number]; // 宽，高
  color?: string;
  className?: string;
}

export function iconStr(type: string, props: IconFontProps): string {
  let styleStr = '';
  let classStr = 'icon';

  if (props.size) {
    styleStr += `width: ${props.size[0]}; height: ${props.size[1]};`;
  }
  if (props.color) {
    styleStr += `color: ${props.color};`;
  }
  if (styleStr.length) {
    styleStr = ` style = "${styleStr}" `;
  }
  if (props.className) {
    classStr += ` ${props.className} `;
  }
  return `<svg class="${classStr}" aria-hidden="true" ${styleStr}><use xlink:href="#icon${type}"></use></svg>`
}

export default Icon;