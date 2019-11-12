import * as React from 'react';

export interface MapProps {
  plugins?: AMap.PluginName[];
  mapOptions?: { [key: string]: any };
  style?: any;
  children?: any;
}

export function setAMapVersion(version: string): any;

export function getAMapVerion(): any;

export function setAMapKey(key: string): any;

export function getAMapKey(): any;

export const MapContext: any;

declare function Map(props: MapProps): any;

export default Map;
