import { IEvents } from '../types';

export interface PolylineProps {
  polylineOptions: {
    path: any; // AMap.LocationValue[] | AMap.LocationValue[][] | undefined;
    [option: string]: any 
  };
  events?: IEvents;
}

declare function Polyline(props: PolylineProps): any;

export default Polyline;
