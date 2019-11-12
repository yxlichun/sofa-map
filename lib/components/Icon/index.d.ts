export type IconFontType = 'car' | 'warehouse';

export interface IconProps {
  type: IconFontType;
}

declare function Icon(props: IconProps): any;

export default Icon;

export interface IconFontProps {
  size?: [number, number]; // 宽，高
  color?: string;
  className?: string;
}

export function iconStr(type: string, props: IconFontProps): string;
