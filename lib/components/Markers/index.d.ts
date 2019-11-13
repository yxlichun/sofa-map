import { IconMarkerProps } from '../Marker';
import { IEvents } from '../types';

export interface MarkersProps {
  data?: IconMarkerProps[];
  positions?: [number, number][];
  events?: IEvents;
}

declare function Markers(props: MarkersProps): any;

export default Markers;
