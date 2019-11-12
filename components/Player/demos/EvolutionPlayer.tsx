import * as React from 'react';
import Player from '../index';
import Map, { MapContext } from '../../Map';
import Polyline from '../../Polyline';

export interface EvolutionPlayerProps {

}

const { useState, useContext } = React;

function EvolutionPlayer(props: EvolutionPlayerProps) {
  const map = useContext(MapContext);

  const data: any = {
    1532579620000: [
      [[116.303843, 39.933412], [116.407012, 39.992093]],
      [[116.203843, 39.23412], [116.407012, 39.992093]],
      [[116.103843, 39.283412], [116.407012, 39.992093]],
    ],
    1532579621000: [
      [[116.303343, 39.923412], [116.407012, 39.992093]],
      [[116.30243, 39.983412], [116.407012, 39.992093]],
      [[116.33843, 39.63412], [116.407012, 39.992093]],
    ],
    1532579623000: [
      [[116.30243, 39.983412], [116.407012, 39.992093]],
      [[116.32843, 39.98212], [116.407012, 39.992093]],
      [[116.30343, 39.91412], [116.407012, 39.992093]],
      [[116.33843, 39.63412], [116.407012, 39.992093]],
    ],
    1532579625000: [
      [[116.303343, 39.923412], [116.407012, 39.992093]],
      [[116.403843, 39.982412], [116.407012, 39.992093]],
      [[116.32843, 39.98212], [116.407012, 39.992093]],
      [[116.30343, 39.91412], [116.407012, 39.992093]],
    ],
    1532579650000: [
      [[116.103843, 39.283412], [116.407012, 39.992093]],
      [[116.323843, 39.933412], [116.407012, 39.992093]],
      [[116.302843, 39.33412], [116.407012, 39.992093]],
      [[116.303343, 39.943412], [116.407012, 39.992093]],
    ],
    1532580620000: [
      [[116.30343, 39.91412], [116.407012, 39.992093]],
      [[116.33843, 39.63412], [116.407012, 39.992093]],
      [[116.323843, 39.583412], [116.407012, 39.992093]],
    ]
  }

  const [paths, setPaths] = useState([]);
  // 缓存上次渲染数据，提高渲染性能；
  const [preTime, setPreTime] = useState('');

  const onPlay = (current: number) => {
    const timeArray = Object.keys(data);
    const nearestTime: string | undefined = timeArray.find((item, index) => 
      current >= parseInt(item, 10) && current < parseInt(timeArray[index + 1], 10));

    if (nearestTime && nearestTime !== preTime) {
      setPaths(data[nearestTime]);
      setPreTime(nearestTime);
      ((Map as any).map as unknown as AMap.Map).setFitView();
    }
  }

  return (
    <div style = { { width: 1000, height: 600 } }>
      <Map style = { { width: 1000, height: 600 } }>
        { paths.map((path: any, index: number) => (
          <Polyline
            key = { index }
            polylineOptions = { { path } }
          />
        ))}
      </Map>
      <Player
        range = {[1532579620000, 1532580620000]}
        frequency = { 12 }
        onPlay = { onPlay }
      />
    </div>
  )
}

export default EvolutionPlayer;
