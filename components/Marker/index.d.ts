import { IEvents } from '../../types';

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
