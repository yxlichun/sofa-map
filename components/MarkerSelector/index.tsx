import * as React from 'react';
import Map, { IMapProps } from '../Map';
import Marker from '../Marker';

const warehouseMarker = `<div class="station-marker">
  <div class="warehouse-marker__image"></div>
  <div class="station-marker__circle" style="border-color: '#DD2E35'"></div>
</div>`;

const selectedMarker = (index?: any) => `<div class="station-marker">
  <div class="station-marker_base station-marker__image"><div>${ index  }</div></div>
  <div class="station-marker__circle" style="border-color: '#000'"></div>
</div>`;

const unSelectedMarker = `<div class="station-marker">
  <div class="station-marker_base unselected-marker__image"></div>
  <div class="station-marker__circle" style="border-color: '#DD2E35'"></div>
</div>`;

export interface IMarkerOptions {
  // lat: string;
  // lng: string;
  // 该点是否可以选择
  isCanSelect?: boolean;
  // 该点是否是选中态
  isSelected?: boolean;
  [option: string]: any;
}

export interface IMarkerSelectorProps {
  mapProps?: IMapProps;
  mode?: 'default' | 'multiple'; // 点选模式
  markersData?: IMarkerOptions[]; // marker点的初始数据
  selectedMarkersData?: IMarkerOptions[]; // 选中的marker数据
  onChange?: (params: IMarkerOptions[]) => any; // 点选后触发的父组件回调
}

const { useState, useEffect, useMemo } = React;

function MarkerSelector(props: IMarkerSelectorProps) {
  const { mapProps, markersData, selectedMarkersData } = props;

  // 点线的初始数据
  const [ markers, setMarkers ] = useState([] as any[]);
  // 选中的点的数据
  const [ selectedMarkers, setSelectedMarkers ] = useState([] as any[]);

  useEffect(() => {
    if ((Map as any).map && markersData && Array.isArray(markersData)) {
      // (MarkerSelector as any).map = (Map as any).map;
      // const markerOverlays = (MarkerSelector as any).map.getAllOverlays('marker');
      // (MarkerSelector as any).map.remove(markerOverlays);
      // ((Map as any).map as unknown as AMap.Map).clearMap();
      // setTimeout(() => {
      //   ((Map as any).map as unknown as AMap.Map).setFitView();
      // }, 1000);
      setMarkers(markersData);
    }
  }, [JSON.stringify(markersData), (Map as any).map]);

  useEffect(() => {
    if ((Map as any).map) {
      (MarkerSelector as any).map = (Map as any).map;
      // const markerOverlays = (MarkerSelector as any).map.getAllOverlays('marker');
      // (MarkerSelector as any).map.remove(markerOverlays);
      // ((Map as any).map as unknown as AMap.Map).clearMap();
      // setTimeout(() => {
      //   ((Map as any).map as unknown as AMap.Map).setFitView();
      // }, 1000);
      if (selectedMarkersData && selectedMarkersData.length) {
        setSelectedMarkers([...selectedMarkersData]);
      }
    }
  }, [JSON.stringify(selectedMarkersData), (Map as any).map]);

  // marker 选择事件
  const onSelect = (marker: IMarkerOptions) => {
    if (!marker.isCanSelect || marker.station_type === 1 ) {
      return;
    }
    // 选择/取消选择处理
    const foundMarkerIndex = hasSelected(marker);
    if (foundMarkerIndex !== -1) {
      marker.isSelected = false;
      selectedMarkers.splice(foundMarkerIndex, 1);
      setSelectedMarkers([...selectedMarkers]);
      if (props.onChange) {
        props.onChange([...selectedMarkers]);
      }
    } else {
      marker.isSelected = true;
      selectedMarkers.push(marker);
      setSelectedMarkers([...selectedMarkers]);
      if (props.onChange) {
        props.onChange([...selectedMarkers]);
      }
      // 下面这种写法有问题：会出现重复添加的现象
      // setSelectedMarkers((data: IMarkerOptions[]) => {
      //   data.push(marker);
      //   if (props.onChange) {
      //     props.onChange(data);
      //   }
      //   return [...data];
      // });
    }
  };

  /**
   * 根据点的经纬度信息去判断当前marker是否已在选中marker里面
   * @param marker 判断的marker对象
   * @returns number markerIndex 当前marker在选中marker中的index
   */
  const hasSelected = (marker: IMarkerOptions) => {
    let markerIndex = -1;
    selectedMarkers.filter((itemMarker: IMarkerOptions, index: number) => {
      if(marker.lat === itemMarker.lat && marker.lng === itemMarker.lng) {
        markerIndex = index;
      }
      return false;
    });
    return markerIndex;
  };

  const renderMarker = useMemo(() => {
    if ((Map as any).map) {
      (MarkerSelector as any).map = (Map as any).map;
      const markerOverlays = (MarkerSelector as any).map.getAllOverlays('marker');
      (MarkerSelector as any).map.remove(markerOverlays);
      // (MarkerSelector as any).map.clearMap();
      // setTimeout(() => {
      //   (MarkerSelector as any).map.setFitView();
      // }, 1000);

      return markers.map((marker: any, mIndex: number) => {
        let markerContent: any = unSelectedMarker;
        if (marker.station_type === 1) {
          // 仓库
          markerContent = warehouseMarker;
        } else if (marker.isSelected) {
          // 选中
          markerContent = selectedMarker(hasSelected(marker));
        }
        return <Marker
          key = { mIndex }
          markerOptions = { {
            position: [Number(marker.lng), Number(marker.lat)],
            content: markerContent,
            label: marker.station_name || '',
            offset: new AMap.Pixel(-10, -21),
          } }
          isCanSelect = { marker.isCanSelect || false }
          events = { {
            click: () => onSelect(marker),
            // 此处的hover效果要放到Marker组件中写，因为会导致地图变化，不断刷新
            // mouseover: () => setHoverMarkerIndex(mIndex),
            // mouseout: () => setHoverMarkerIndex(-1),
          } }
        />;
      });
    }
  }, [JSON.stringify(markers), (Map as any).map]);

  return (
    <div style = { mapProps && mapProps.style ?  mapProps.style : '' }>
      <Map
        mapOptions = { { mapStyle: 'amap://styles/whitesmoke' } }
        fullScreen =  { true }
        { ...mapProps }
      >
        { renderMarker }
      </Map>
    </div>
  );
}

export default MarkerSelector;
