/**
 * 时间戳转换
 * @param {String} date eg: 1234567890
 * @return {String} 2017-07-27 10:10:10
 * @author zhangning
 */
export function secondToDatetime(timestap: number) {
  if (!timestap) {
    return '';
  }
  const date = new Date(timestap);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
  const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

export function secondToMinutetime(statTime: number, endTime: number) {
  if (!statTime || !endTime || statTime > endTime) {
    return '';
  }
  const difference = Math.round((endTime - statTime ) / 1000);
  let h = 0;
  let i = 0;
  let s = parseInt((difference as unknown as string), 10);
  if (s > 60) {
    i = parseInt((s / 60) as unknown as string, 10);
    s = parseInt((s % 60) as unknown as string, 10);
    if (i > 60) {
      h = parseInt((i / 60) as unknown as string, 10);
      i = parseInt((i % 60) as unknown as string, 10);
    }
  }
  // 补零
  const zero =  (v: number) => v >= 0 && v < 10 ? "0" + v : v;
  const h2 = zero(h);
  const i2 = zero(i);
  const s2 = zero(s);
  let differenceRange = "";
  if (h2 <= 0) {
    differenceRange = [i2, s2].join(":");
  } else {
    differenceRange = [h2, i2, s2].join(":");
  }
  return differenceRange;
}
