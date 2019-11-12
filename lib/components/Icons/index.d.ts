export interface IconProps {
  iconOptions: {
    image?: string;
    [option: string]: any 
  };
}

declare function Icon(props: IconProps): any;
export default Icon;

export function imageIcon(size?: any): any;

// 组件库内置了部分Icon，可以直接使用；SVG图标使用
export type IconFontType = 'car' | 'warehouse';

export interface IconFontProps {
  size?: [number, number]; // 宽，高
  color?: string;
  className?: string;
}

export function iconFontContent(type: string, props: IconFontProps): string;
