import * as React from 'react';
import Player, { PlayerProps } from '../Player';
import Map, { MapProps } from '../../components/Map';

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

const { useState, useEffect } = React;

function EvolutionPlayer(props: MapPlayerProps) {
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
    console.log('============================playing', current, data);

    const timeArray = Object.keys(data);
    const nearestTime: string | undefined = timeArray.find((item, index) => 
      current >= parseInt(item, 10) && current < parseInt(timeArray[index + 1], 10));

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

  console.log('============================', frameData, data);
  return (
    <div>
      <Map
        { ...mapProps }
      >
        { props.children({ frameData, preTime } as FrameProps) }
      </Map>
      <Player
        { ...playerProps }
        onPlay = { onPlay }
        loading = { loading }
      />
    </div>
  )
}

export default EvolutionPlayer;
