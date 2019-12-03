import * as React from 'react';
import { secondToDatetime, secondToMinutetime } from './utils';
// tslint:disable-next-line: no-var-requires
require('./index.less');

const { useState, useRef, useEffect } = React;

export interface IPlayerProps {
  range: number[]; // 毫秒级时间戳
  frequency: number; // 十二秒内渲染次数
  loading?: boolean;
  onPlay?: (time: number) => any;
  onPause?: (time: number) => any;
  onStop?: (time: number) => any;
  beforeStart?: () => any;
}

function PlayController(props: IPlayerProps) {
  const { range, frequency, onPlay, onPause, onStop, loading, beforeStart } = props;
  const currentTime = useRef(0);

  const [ left, setLeft ] = useState(0);
  const [ isStart, setIsStart ] = useState(false);

  const [ playState, setPlayState ] = useState('stop');
  const [ speed, setSpeed ] = useState(1);
  const [ speedTimes, setSpeedTimes ] = useState(1);
  const [ timer, setTimer ]: [ number | null, any ] = useState(null);
  const interval = Math.floor(12000 / frequency);

  const stopRun = () => {
    clearInterval(timer as any);
    setTimer(null);
  };

  const reset = () => {
    currentTime.current = range[0];
    setLeft(0);
    setSpeed(1);
  };

  const overPlay = () => {
    currentTime.current = range[1];
    setLeft(100);
    clearInterval(timer as any);
    setTimer(null);
    if (onPlay) {
      onPlay(range[1]);
    }
  };

  function getLeftByCurrentTime(current: number): number {
    if (range && range.length === 2) {
      return (current - range[0]) / (range[1] - range[0]) * 100;
    }
    return 0;
  }

  useEffect(() => {
    if (range && range[0]) {
      currentTime.current = range[0];
    }
  }, [range.join()]);

  useEffect(() => {
    if (loading) {
      stopRun();
    } else {
      if (playState === 'playing') {
        stopRun();

        const playTimer = setInterval(() => {
          if(currentTime.current <= range[1]) {
            const nextTime = currentTime.current + speed * interval;
            if(nextTime > range[1]) {
              setPlayState('over');
            } else {
              currentTime.current = nextTime;
              setLeft(getLeftByCurrentTime(nextTime));
              if (onPlay) {
                onPlay(nextTime);
              }
            }
          }
        }, interval);

        setTimer(playTimer);
      }

      if (playState === 'pause') {
        stopRun();
        if (onPause) {
          onPause(currentTime.current);
        }
      }
      if (playState === 'stop') {
        stopRun();
        reset();
        if (onStop) {
          onStop(currentTime.current);
        }
      }
      if(playState === 'over') {
        stopRun();
        overPlay();
        if (onStop) {
          onStop(currentTime.current);
        }
      }
    }
    return stopRun;
  }, [playState, speed, loading]);

  const handleStart = () => {
    setIsStart(true);
    setPlayState('playing');
    if(beforeStart) {
      beforeStart();
    }
  };

  const handleSpeed = () => {
    const arr = [1,2,4,8,16];
    setSpeed(arr[(speedTimes) % 5]);
    setSpeedTimes(speedTimes+1);
  };

  return (
    <div>
    {
      isStart ?
        <div className = 'player_container'>
          <div className = "controller__toolbar">
            {
              (playState === 'playing' || playState === 'pause' || playState === 'over') &&
              <div onClick = { () => setPlayState('stop') } className = 'stop_btn small_btn' />
            }
            {
              (playState === 'stop' || playState === 'pause' || playState === 'over') &&
              <div onClick = { () => setPlayState('playing') }  className = 'btn pause_btn'>
                <div className = 'player_tranggle'/>
                <div className = 'player_triangle'/>
              </div>
            }
            {
              playState === 'playing' &&
              <div onClick = { () => setPlayState('pause') } className = 'btn playing_btn' />
            }
            {
              (playState === 'playing' || playState === 'pause' || playState === 'over') &&
              <div className = 'speed_btn small_btn' onClick = { handleSpeed } >
                <div className = 'player_tranggle player_tranggle_0'/>
                <div className = 'player_triangle player_triangle_0'/>
                <div className = 'player_tranggle player_tranggle_1'/>
                <div className = 'player_triangle player_triangle_1'/>
              </div>
            }
            { speed > 1 ? <span className = 'speed_text'>{ speed }x</span> : <span className = 'speed_text'/> }
          </div>
          <div className = "controller__timePart">
            <div className = 'time'>{ secondToMinutetime(range[0], currentTime.current) }</div>
            <div className = "controller__timeline">
              <div className = "controller__timeline--passed" />
              <div className = "controller__timeline__ball" style = { { left: left + '%' } }>
                { /* <div className = "current-time">{ secondToDatetime(currentTime.current) }</div> */}
              </div>
            </div>
            <div className = 'time'>{ secondToMinutetime(range[0], range[1]) }</div>
          </div>
        </div>
      :
        <div onClick = { handleStart } className = 'start_btn'>
          <div className = 'player_tranggle'/>
          <div className = 'player_triangle'/>
        </div>
    }
    </div>
  );
}

export default PlayController;
