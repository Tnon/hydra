export const setupPostCss = (): void => {
  // 基准大小
  const baseSize = 16;
  // 设置 rem 函数
  function setRem(): void {
    const scale: number = document.documentElement.clientWidth / 750;
    // 设置页面根节点字体大小
    const size = baseSize * Math.min(scale, 2) < 25 ? 25 : baseSize * Math.min(scale, 2);
    document.documentElement.style.fontSize = size + 'px';
  }
  // 初始化
  setRem();
  // 改变窗口大小时重新设置 rem
  window.onresize = () => {
    setRem();
  };
};
