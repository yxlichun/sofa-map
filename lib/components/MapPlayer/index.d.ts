import { MapProps } from '../Map';
import { PlayerProps } from '../Player';

export interface MapPlayerProps extends PlayerProps {
  children: any;
  data: {
    [key: string]: any;
  },
  mapProps?: MapProps;
  onFrameChange?: (current: number, nearestTime: any, frameData: any) => any;
}

export interface FrameProps {
  frameData: any;
  preTime: string;
}

declare function MapPlayer(props: MapPlayerProps): any;

export default MapPlayer;
