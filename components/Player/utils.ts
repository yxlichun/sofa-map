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