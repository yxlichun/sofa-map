import * as React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import { secondToDatetime } from './utils';

const Player = styled.div`
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0px;
  width: 100%;
  display: flex;
  align-items: center;
  .anticon {
    color: #ccc;
    font-size: 30px;
    margin: 0 10px;
  }
  .controller__toolbar {
    width: 70px;
    display: flex;
    align-items: center;
  }
  .controller__timeline {
    height: 1px;
    width: 100px;
    flex-grow: 1;
    background: #ccc;
    margin: 0 10px;
    position: relative;
  }
  .controller__timeline__ball {
    width: 10px;
    height: 10px;
    background: #1890FF;
    border-radius: 10px;
    position: absolute;
    top: -5px;
    left: ${(props: { left: number }) => `${props.left}%`};
    .current-time {
      position: absolute;
      width: 200px;
      font-size: 12px;
      top: -10px;
    }
  }
`;

const { useState, useRef, useEffect } = React;

export interface PlayerProps {
  range: number[]; // 毫秒级时间戳
  frequency: number; // 十二秒内渲染次数
  loading?: boolean;
  onPlay?: (time: number) => any;
  onPause?: (time: number) => any;
  onStop?: (time: number) => any;
}

function PlayController(props: PlayerProps) {
  const { range, frequency, onPlay, onPause, onStop, loading } = props;
  const currentTime = useRef(0);

  const [ left, setLeft ] = useState(0);

  const [ playState, setPlayState ] = useState('stop');
  const [ speed, setSpeed ] = useState(1);
  const [ timer, setTimer ]: [ number | null, any ] = useState(null);
  const interval = Math.floor(12000 / frequency);

  const stopRun = () => {
    clearInterval(timer as any);
    setTimer(null);
  };

  const reset = () => {
    currentTime.current = range[0];
    setLeft(0);
  }

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
          const nextTime = currentTime.current + speed * interval;
          currentTime.current = nextTime;
          setLeft(getLeftByCurrentTime(nextTime));
          if (onPlay) {
            onPlay(nextTime);
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
    }
    return stopRun;
  }, [playState, speed, loading]);

  return (
    <Player left = { left }>
      <div className = "controller__toolbar">
        { (playState === 'stop' || playState === 'pause') &&
          <Icon type = "caret-right" onClick = { () => setPlayState('playing') } /> }
        { playState === 'playing' &&
          <Icon type = "pause" onClick = { () => setPlayState('pause') }/> }
        { (playState === 'playing' || playState === 'pause') &&
          <div style = { { width: 15, height: 15, background: '#ccc' } } onClick = { () => setPlayState('stop') } /> }
      </div>
      <div className = "controller__timeline">
        <div className = "controller__timeline--passed" />
        <div className = "controller__timeline__ball">
          <div className = "current-time">{secondToDatetime(currentTime.current)}</div>
        </div>
      </div>
      <div style = {{ position: 'absolute', top: -70 }}>
        <div>开始时间：{secondToDatetime(range[0])}</div>
        <div>结束时间：{secondToDatetime(range[1])}</div>
        <div>{ loading ? 'loading' : 'ready' }</div>
      </div>
      <div>
        <span onClick = { () => setSpeed(1) }>1.x</span>
        <span onClick = { () => setSpeed(2) }>2.x</span>
        <span onClick = { () => setSpeed(4) }>4.x</span>
      </div>
    </Player>
  );
}

export default PlayController;
