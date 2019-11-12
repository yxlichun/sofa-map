import * as React from 'react';
import { MapContext } from '../Map';
import useBindEvents from '../../hooks/useBindEvents';
import { iconStr } from '../Icon';
import { IconMarkerProps, MarkerOptions } from '../Marker';
import { IEvents } from '../../types';

const { useContext, useEffect, useState } = React;

export interface MarkersProps {
  data?: IconMarkerProps[];
  positions?: [number, number][];
  events?: IEvents;
}

function Markers(props: MarkersProps) {
  const { data, positions, events } = props;
  const map = useContext(MapContext);
  const [markers, setMarkers]: [any, any] = useState([]);

  useBindEvents(markers, events);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (markers) {
      (map as unknown as AMap.Map).remove(markers);
    }

    let newMarkers;

    if (positions) {
      newMarkers = positions.map((item) => {
        const markerOptions: MarkerOptions = {} as MarkerOptions;
        markerOptions.position = item;
        return new AMap.Marker(markerOptions);
      });
    } else if (data){
      newMarkers = data.map((item) => {
        const markerOptions: MarkerOptions = {} as MarkerOptions;
        if (item.position) {
          const { position, type, ...iconFontProps } = item;
          markerOptions.position = item.position;
          markerOptions.content = iconStr(type, iconFontProps);
        }
        return new AMap.Marker(markerOptions);
      });
    }

    if (newMarkers) {
      (map as unknown as AMap.Map).add(newMarkers);
      setMarkers(newMarkers);
    }

  }, [map, data, positions]);

  return null;
}

export default Markers;
