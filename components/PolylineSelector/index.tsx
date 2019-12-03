import * as React from 'react';
import Map, { IMapProps } from '../Map';
import Polyline from '../Polyline';
import Marker from '../Marker';

export interface IPolylineSelectorProps {
  data: any; // 点线的初始数据
  stationLabel: any; // 鼠标hover时的站点名称数据
  isCanSelect?: boolean;// 是否可以点选地图中的点
  selectedMarkerData?: (params: any) => any;// 点选后的数据
  showPath?: boolean;// 是否将选中的点连线
  mapProps?: IMapProps;
  searchSelected?: any;
}

const { useState, useEffect } = React;

function PolylineSelector(props: IPolylineSelectorProps) {
  const { mapProps, data, stationLabel } = props;

  // 点线的初始数据
  const [ marker, setMarker ] = useState([]);

  // 点的hover站点完整数据
  const [ stationMarker, setStationMarker ] = useState([]);

  // 选中的点的数据
  const [ selectedMarker, setSelectedMarker ] = useState([]);

  const [ showLine, setShowLine ]= useState(false);

  useEffect(() => {
    if ((Map as any).map) {
      (PolylineSelector as any).map = (Map as any).map;
      ((Map as any).map as unknown as AMap.Map).clearMap();
      setTimeout(() => {
        ((Map as any).map as unknown as AMap.Map).setFitView();
      }, 1000);
      setMarker(data);
      setStationMarker(stationLabel);
      if(props.showPath) {
        setShowLine(true);
      } else {
        setShowLine(false);
      }
    }
  }, [data, (Map as any).map, props.showPath]);

  const onSelect = (itemMarker: any) => {// 通过点击Marker组件选中某点，将对应点样式变为黑色数字样式，并将对应点数据发给父组件
    let point: any = [];
    let isHas = false;
    point = selectedMarker.map((item: any) => {
      return [item[0],item[1]];
    });
    point.map((item: any,index: any) => {
      if(item[0] === itemMarker[0] && item[1] === itemMarker[1] ) {
        point.splice(index,1);
        isHas = true;
      }
    });
    if(!isHas) {
      point.push(itemMarker);
    }
    setSelectedMarker(point);
    if(props.selectedMarkerData) {
      props.selectedMarkerData(point);
    }
  };

  useEffect(() => {
    if(props.searchSelected && props.searchSelected[0]) {
      onSelect(props.searchSelected[0]);
    }
  }, [props.searchSelected]);

  return (
    <div style = { mapProps && mapProps.style ?  mapProps.style : '' }>
      <Map
        mapOptions = { { mapStyle: 'amap://styles/whitesmoke' } }
        fullScreen =  { true }
        { ...mapProps }
      >
        {
          marker.map((path: number[][], index: number) => {
            return <div key  = { index }>
              {
                showLine ?
                  <Polyline
                    key = { index }
                    polylineOptions = { {
                      path,
                      strokeColor: '#DD2E35',
                      strokeWeight: 4,
                      showDir: true,
                    } }
                  />
                :
                  ''
              }
              {
                path.map((point, indexP: any) => {
                  let isSelected = false;
                  let contentIndex = '';
                  selectedMarker.map((item: any,indexM: any) => {
                    if(point[0] === item[0] && point[1] === item[1] ) {
                      isSelected = true;
                      contentIndex = indexM+1;
                    }
                  });
                  return point.length && ( point.length === 3 ?
                    <Marker
                      markerOptions = { {
                        position: point,
                        content: { type: 1, color: '#DD2E35'},
                        offset: new AMap.Pixel(-10,-21),
                      } }
                      label = { stationMarker }
                      key = { index + indexP }
                    /> :
                      isSelected ?
                        <Marker
                          markerOptions = { {
                            position: point,
                            content: { type: 2, color: '#DD2E35', index: contentIndex },
                            offset: new AMap.Pixel(-10,-21),
                          } }
                          label = { stationMarker }
                          isCanSelect = { props.isCanSelect || false }
                          onSelect = { onSelect }
                          key = { index + indexP }
                        />:
                        <Marker
                          markerOptions = { {
                            position: point,
                            content: { type: 3, color: '#DD2E35'},
                            offset: new AMap.Pixel(-10,-21),
                          } }
                          label = { stationMarker }
                          isCanSelect = { props.isCanSelect || false  }
                          onSelect = { onSelect }
                          key = { index + indexP }
                        />
                  );
                })
              }
            </div>;
            })
        }
      </Map>
    </div>
  );
}

export default PolylineSelector;
