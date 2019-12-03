import * as React from 'react';
import { MapContext } from '../Map';
import useBindEvents from '../../hooks/useBindEvents';
import { IconFontType, iconStr, IconFontProps } from '../Icon';
import { IEvents } from '../types';
// tslint:disable-next-line: no-var-requires
require('./index.less');
const { useContext, useEffect, useState } = React;

export interface MarkerOptions {
  position: any; // AMap.LocationValue[] | AMap.LocationValue[][] | undefined;
  [option: string]: any;
}

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

    if (markerOptions.label) {
      // 设置hover显示marker名称
      newMarker.on('mouseover', (e: any) => {
        newMarker.setLabel({
          offset: new AMap.Pixel(22, 0),  // 设置文本标注偏移量
          content: markerOptions.label || '',
        });
      });
      newMarker.on('mouseout', (e: any) => {
        newMarker.setLabel();
      });
    }

    (map as unknown as AMap.Map).add(newMarker);

    setMarker(newMarker);

    return () => {
      if (newMarker) {
        (map as unknown as AMap.Map).remove([newMarker]);
      }
    }
  }, [map, markerOptions]);

  return null;
}

export default Marker;

export interface ConMarkerProps extends IconFontProps {
  position: any;
  type: IconFontType;
}

export function IconMarker(props: ConMarkerProps) {
  const { position, type, ...iconFontProps } = props;
  return (
    <Marker
      markerOptions = { {
        position,
        content: iconStr(type, iconFontProps),
      } }
    />
  );
}
