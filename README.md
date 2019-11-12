# Sofa-Map

## 前言

高德地图应用在我们系统的非常多处，但是在我们开发中复用度还是比较低的，每次开发时都在挠头，要从头开始查官网、找SDK，尤其在我们使用function component的开发方式后，地图的使用问题也暴露的比较多。
Super-Map的组件除了包含Map、Polygon等对齐高德地图API的基础组件外，我们系统的梳理了我们所有系统（极+、SDS、ROS、Havi等）对高德地图的调用（感谢清清），抽象了一些通用的使用场景，以期对外提供更大粒度的复用。
此外，Super-Map也致力于提供更优良的地图UI视觉方案，提供丰富的地图Plugin组件等。

## 项目内容规划

### 基础数据

* 维护省市区JSON信息
* 维护amap.d.ts声明文件

### 基础组件

* Map
* Marker
* Markers
* Circle
* Polygon
* Polyline

```jsx
<Map style = { { width: 1000, height: 600 } }>
    <Marker point = {[]} />
    <Polygon
        polygonOptions = { { path } }
        events = { { click: (e) => { // 这里存在很大的隐患
            const target = e.target;
            target.setPath([[116.382122,39.901176], [116.387271,39.912501], [116.398258,39.904600]]);
            } 
        } }
    />
</Map>
```

### 高级组件

* TrackPlayer：按照时间轴顺序播放
* Navigate: 两点之间导航，支持首末端图标选择（提供仓、站点等多种图片），路线规划导航类型选择，路线样式选择。
* PolyEditor: 多边形编辑工具，多用于画区域
* ThermalMap: 热力图
* PolygonSelector（多选模式、单选模式）
* PolylineSelector（多选模式、单选模式）: 在一个线路的Group中实现高亮选择一条或几条路线；
* MarkerSelector（多选模式、单选模式）
* FullScreen: 地图全屏展示插件

## 项目框架及技术点

1、Typescript；
2、Function Component;
3、Travis ci，持续集成&单元测试；
*4、sf-map support
