export const dateFormat = (value) => {
  //调用时间戳为日期显示
  let date = new Date(value);
  let y = date.getFullYear(); //获取年份
  let m = date.getMonth() + 1; //获取月份
  m = m < 10 ? '0' + m : m; //月份不满10天显示前加0
  let d = date.getDate(); //获取日期
  d = d < 10 ? '0' + d : d; //日期不满10天显示前加0
  return y + '-' + m + '-' + d;
};
