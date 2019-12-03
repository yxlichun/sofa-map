// 自定义hook，获取地图
import * as React from 'react';

const { useEffect, useState } = React;

/**
 * useMap
 * @param Map 地图组件或包含地图的组件
 * @param callback 获取地图后的回调
 * @param deps hook的依赖数据
 * @param name 多个地图时，需要使用name进行命名的区分
 */
function useMap(Map: any, callback: (map: AMap.Map) => any, deps?: any[], name?: any) {
  const [ count, setCount ] = useState(0);

  useEffect(() => {
    if (Map.map) {
      const map = name ? Map.map[name] : Map.map;
      callback(map);
    } else {
      // 没有获取到map，手动重试
      setTimeout(() => {
        setCount(count + 1);
      }, 400);
    }
  }, [Map.map, count].concat(deps || []));
}

export default useMap;
