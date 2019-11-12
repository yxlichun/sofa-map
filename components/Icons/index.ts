require('./iconfont.js');
require('./iconfont.css');

export interface IconProps {
  iconOptions: {
    image?: string;
    [option: string]: any 
  };
}

function Icon(props: IconProps) {
  if ((window as any).AMap) {
    const icon = new AMap.Icon({
      ...props.iconOptions,
    });
    return icon;
  }
  return null;
}

export default Icon;

const defaultIconSize = [40, 50];

export function imageIcon(size = defaultIconSize) {
  return Icon({
    iconOptions: {
      image: '//webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png',
      size,
    }
  })
}

// 组件库内置了部分Icon，可以直接使用；SVG图标使用
export type IconFontType = 'car' | 'warehouse';

export interface IconFontProps {
  size?: [number, number]; // 宽，高
  color?: string;
  className?: string;
}

export function iconFontContent(type: string, props: IconFontProps): string {
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
