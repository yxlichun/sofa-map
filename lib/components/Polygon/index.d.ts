import { IEvents } from '../../../types';

export interface PolygonProps {
  polygonOptions: {
    path: any; // AMap.LocationValue[] | AMap.LocationValue[][] | undefined;
    [option: string]: any 
  };
  events?: IEvents;
}

declare function Polygon(props: PolygonProps): any;

export default Polygon;
