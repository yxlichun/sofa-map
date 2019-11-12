import * as React from 'react';

const { useEffect, useState, useRef } = React;

export interface MapProps {
  plugins?: AMap.PluginName[];
  mapOptions?: { [key: string]: any };
  style?: any;
  children?: any;
}

export const setAMapVersion = (version: string) => {
  (window as any).AMapVersion = version;
}

export const getAMapVerion = () => (window as any).AMapVersion;

export const setAMapKey = (key: string) => {
  (window as any).AMapKey = key;
}

export const getAMapKey = () => (window as any).AMapKey;

function requireMap(callback: () => any) {
  // 如果不存在全局的AMap对象，则按需引入
  if (!(window as any).AMap) {
    if (!(window as any).AMapVersion || !(window as any).AMapKey) {
      throw new Error('Please use method setAMapVersion、setAMapKey, set AMap Version and Key!');
    }

    const url = `https://webapi.amap.com/maps?v=${getAMapVerion()}&key=${getAMapKey()}`;

    const jsapi = document.createElement('script');

    jsapi.addEventListener('load', (e) => {
      callback();
    });

    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
  } else {
    callback();
  }
}

export const MapContext = React.createContext(null);

function Map(props: MapProps) {
  const { plugins, style, mapOptions } = props;

  const [map, setMap]: [AMap.Map | null, (params: any) => void] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const mapContainer: { current: HTMLDivElement | null } = useRef(null);

  // 加载地图脚本
  useEffect(() => {
    requireMap(
      () => {
        setScriptLoaded(true);
      }
    );
  }, []);

   // 初始化地图
   useEffect(() => {
    if (!scriptLoaded || !(window as any).AMap) {
      return;
    }

    // 初始化地图
    const mapEntity = new AMap.Map(mapContainer.current as HTMLDivElement, {
      center: [116.39, 39.9],
      zoom: 11,
      ...mapOptions,
    });
    (window as any).superMap++;

    // 加载插件
    AMap.plugin(([
      'AMap.ToolBar',
      'AMap.Scale',
      'AMap.Geolocation',
    ].concat(plugins ? plugins : [])) as AMap.PluginName[], () => {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        (mapEntity).addControl(new (AMap as any).ToolBar());
    });

    setMap(mapEntity);
    (Map as any).map = mapEntity;

    // 销毁地图
    return () => {
      if (map) {
        (map as AMap.Map).destroy();
      }
    };
  }, [(window as any).AMap, scriptLoaded]);

  const containerStyle = {
    width: 600,
    height: 400,
    background: '#e0e0e0',
    ...style,
  }

  return(
    <MapContext.Provider value = { map }>
      <div style = { containerStyle } ref = { mapContainer }>
        Map is Loading
      </div>
      { props.children }
    </MapContext.Provider>

  )
}

export default Map;
