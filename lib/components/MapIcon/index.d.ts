export interface MapIconProps {
  iconOptions: {
    image?: string;
    [option: string]: any 
  };
}

declare function MapIcon(props: MapIconProps): any;

export default MapIcon;
