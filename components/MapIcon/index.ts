
export interface MapIconProps {
  iconOptions: {
    image?: string;
    [option: string]: any 
  };
}

export function MapIcon(props: MapIconProps) {
  if ((window as any).AMap) {
    const icon = new AMap.Icon({
      ...props.iconOptions,
    });
    return icon;
  }
  return null;
}

export default MapIcon;