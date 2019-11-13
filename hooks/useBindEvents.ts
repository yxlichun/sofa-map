// 自定义hook，完成地图组件对事件的统一处理逻辑
import * as React from 'react';
import { IEvents } from '../components/types';

const { useEffect } = React;

/**
 * 
 * @param overlay 覆盖物
 * @param events 事件对象
 */
function useBindEvents(overlay: any, events: IEvents | undefined) {
  useEffect(() => {
    console.log('useBindEvents');

    if (!overlay || !events) {
      return;
    }

    Object.keys(events).forEach((eventName: string) => {
      // 这里可以对事件进行特殊的处理
      overlay.on(eventName, (e: any) => {
        const newEvent = {
          ...e,
          target: overlay,
        }
        events[eventName](newEvent);
      })
    });
  }, [overlay, events]);
}

export default useBindEvents;
