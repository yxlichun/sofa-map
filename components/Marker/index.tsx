import * as React from 'react';
import { MapContext } from '../Map';
import useBindEvents from '../../hooks/useBindEvents';
import { IconFontType, iconFontContent, IconFontProps } from '../Icons';
import { IEvents } from '../../types';

const { useContext, useEffect, useState } = React;

export interface MarkerOptions {
  position: any; // AMap.LocationValue[] | AMap.LocationValue[][] | undefined;
  [option: string]: any 
};

export interface MarkerProps {
  markerOptions: MarkerOptions;
  events?: IEvents;
}

function Marker(props: MarkerProps) {
  const { markerOptions, events } = props;
  const map = useContext(MapContext);
  const [marker, setMarker]: [any, any] = useState(null);

  useBindEvents(marker, events);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (marker) {
      (map as unknown as AMap.Map).remove([marker]);
    }

    const newMarker = new AMap.Marker(markerOptions);

    (map as unknown as AMap.Map).add(newMarker);

    setMarker(marker);
  }, [map, markerOptions]);

  return null;
}

export default Marker;


export interface IconMarkerProps extends IconFontProps {
  position: any;
  type: IconFontType;
}

export function IconMarker(props: IconMarkerProps) {
  const { position, type, ...iconFontProps } = props;
  return (
    <Marker
      markerOptions = { {
        position,
        content: iconFontContent(type, iconFontProps),
      } }
    />
  )
}