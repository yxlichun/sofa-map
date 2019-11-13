/// <reference types="amap-js-api-typings" />

export interface IEvents {
  [event: string]: (e: any) => any;
}

export interface MapProps {
  plugins?: AMap.PluginName[];
  mapOptions?: { [key: string]: any };
  style?: any;
  children?: any;
}

export function Map(props: MapProps): any;

export type NavigateType = 'Driving' | 'Transfer' | 'Walking' | 'Riding' | 'TruckDriving';

export interface NavigateProps {
  path: AMap.LocationValue[];
  type: NavigateType;
  navigateOptions?: { [key: string]: any };
}

export function Navigate(props: NavigateProps): any;


export interface PolygonProps {
  polygonOptions: {
    path: any; // AMap.LocationValue[] | AMap.LocationValue[][] | undefined;
    [option: string]: any 
  };
  events?: IEvents;
}

export function Polygon(props: PolygonProps): any;
