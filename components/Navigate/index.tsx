import * as React from 'react';
import { MapContext } from '../Map';
import { NavigateType } from '../types';

const { useEffect, useContext } = React;

export interface IProps {
  path: AMap.LocationValue[];
  type: NavigateType;
  navigateOptions?: { [key: string]: any };
}

function Navigate(props: IProps) {
  const { path, type, navigateOptions } = props;
  const map = useContext(MapContext);

  useEffect(() => {
    if (!map || !path ) {
      return;
    }

    const type2Plugin: { [key: string]: any } = {
      Driving: 'AMap.Driving',
      Transfer: 'AMap.Transfer',
      Walking: 'AMap.Walking',
      Riding: 'AMap.Riding',
      TruckDriving: 'AMap.TruckDriving',
    }

    AMap.plugin([type2Plugin[type]], function() {
      const driving = new (AMap as any)[type]({
        // policy: (AMap as any).DrivingPolicy.LEAST_TIME,
        map: map,
        ...navigateOptions,
      });

      let points: any = path;

      const searchCallback = (status: any, result: any) => {
        if (status === 'complete') {
          console.log('绘制路线完成', result);
        } else {
          console.log('获取规划数据失败：' + status)
        }
      }

      if (type === 'TruckDriving') {
        if (!navigateOptions || !navigateOptions.size) {
          console.log('error，TruckDriving navigateOptions.size is null');
          return;
        }
        points = path.map((item) => ({
          lnglat: item,
        }));
        driving.search(points, searchCallback);
      } else {
        driving.search(...points, searchCallback);
      }
    })
  }, [map, path, type]);

  return null;
}

export default Navigate;
