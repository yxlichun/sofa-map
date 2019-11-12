export interface PlayerProps {
  range: number[]; // 毫秒级时间戳
  frequency: number; // 十二秒内渲染次数
  loading?: boolean;
  onPlay?: (time: number) => any;
  onPause?: (time: number) => any;
  onStop?: (time: number) => any;
}

declare function PlayController(props: PlayerProps): any;

export default PlayController;