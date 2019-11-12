import * as React from 'react';
import { MapContext } from '../Map';
import useBindEvents from '../../hooks/useBindEvents';
import { IEvents } from '../../types';

const { useContext, useEffect, useState } = React;

export interface PolylineProps {
  polylineOptions: {
    path: any; // AMap.LocationValue[] | AMap.LocationValue[][] | undefined;
    [option: string]: any 
  };
  events?: IEvents;
}

function Polyline(props: PolylineProps) {
  const { polylineOptions, events } = props;
  const map = useContext(MapContext);
  const [polyline, setPolyline]: [any, any] = useState(null);

  useBindEvents(polyline, events);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (polyline) {
      (map as unknown as AMap.Map).remove([polyline]);
    }

    const newPolyline = new AMap.Polyline(props.polylineOptions);

    (map as unknown as AMap.Map).add(newPolyline);

    setPolyline(newPolyline);
  }, [map, polylineOptions]);

  return null;
}

export default Polyline;
