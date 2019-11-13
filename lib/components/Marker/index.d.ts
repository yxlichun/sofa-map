import { IEvents } from '../types';
import { IconFontProps, IconFontType } from '../Icon';

export interface MarkerOptions {
  position: any; // AMap.LocationValue[] | AMap.LocationValue[][] | undefined;
  [option: string]: any 
}

export interface MarkerProps {
  markerOptions: MarkerOptions;
  events?: IEvents;
}

declare function Marker(props: MarkerProps): any;

export default Marker;

export interface IconMarkerProps extends IconFontProps {
  position: any;
  type: IconFontType;
}

export function IconMarker(props: IconMarkerProps): any;

