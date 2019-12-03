// 自定义hook，定时器
import * as React from 'react';

const { useRef, useEffect } = React;

function useInterval(callback: () => any, time = 300) {
  const intervalFn = useRef({}); 

  useEffect(() => {
    intervalFn.current.fn = callback;
  });

  useEffect(() => {
    intervalFn.current.timer = setInterval(() => {
      intervalFn.current.fn();
    }, time);
    return () => {
      clearInterval(intervalFn.current.timer);
    };
  }, []);

  return intervalFn.current.timer;
};

export default useInterval;
