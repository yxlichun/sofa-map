import * as React from 'react';
import Player, { PlayerProps } from '../Player';
import Map, { MapProps } from '../Map';

export interface MapPlayerProps extends PlayerProps {
  children: any;
  data: {
    [key: string]: any;
  },
  mapProps?: MapProps;
  name?: string;
  onFrameChange?: (current: number, nearestTime: any, frameData: any) => any;
}

export interface FrameProps {
  frameData: any;
  preTime: string;
}

const { useState, useEffect } = React;

function MapPlayer(props: MapPlayerProps) {
  const { data, children, mapProps, onFrameChange, ...playerProps } = props;

  // 帧数据
  const [ frameData, setFrameData ] = useState([]);

  const [ loading, setLoading ] = useState(true);

  // 缓存上次渲染数据，提高渲染性能；
  const [ preTime, setPreTime ] = useState('');

  useEffect(() => {
    if (data && Object.keys(data).length) {
      setLoading(false);
    }
  }, [data]);

  const onPlay = (current: number) => {

    const timeArray = Object.keys(data);

    // TODO: 需要验证寻找的是否正确
    const nearestTime: string | undefined = timeArray.find((item, index) => 
      current < parseInt(timeArray[index + 1], 10)) || timeArray[timeArray.length - 1];

    if (nearestTime && nearestTime !== preTime) {
      setFrameData(data[nearestTime]);
      setPreTime(nearestTime);
      ((Map as any).map as unknown as AMap.Map).setFitView();
      if (props.onFrameChange) {
        props.onFrameChange(current, nearestTime, data[nearestTime]);
      }
    }

    if (props.onPlay) {
      props.onPlay(current);
    }
  }

  (MapPlayer as any).map = (Map as any).map;

  return (
    <>
      <Map
        style = { { width: 600, height: 400 } }
        name = { name }
        { ...mapProps }
      >
        { props.children({ frameData, preTime } as FrameProps) }
      </Map>
      <Player
        { ...playerProps }
        onPlay = { onPlay }
        loading = { loading }
      />
    </>
  )
}

export default MapPlayer;
