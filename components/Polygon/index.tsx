import * as React from 'react';
import { MapContext } from '../Map';
import useBindEvents from '../../hooks/useBindEvents';
import { IEvents } from '../../types';

const { useContext, useEffect, useState } = React;

interface PolygonProps {
  polygonOptions: {
    path: any; // AMap.LocationValue[] | AMap.LocationValue[][] | undefined;
    [option: string]: any 
  };
  events?: IEvents;
}

function Polygon(props: PolygonProps) {
  const { polygonOptions, events } = props;
  const map = useContext(MapContext);
  const [polygon, setPolygon]: [any, any] = useState(null);

  useBindEvents(polygon, events);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (polygon) {
      (map as unknown as AMap.Map).remove([polygon]);
    }

    const newPolygon = new AMap.Polygon(props.polygonOptions);
    (map as unknown as AMap.Map).add(newPolygon);

    setPolygon(newPolygon);
  }, [map, polygonOptions]);

  return null;
}

export default Polygon;
