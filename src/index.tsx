import React, { useState, useEffect, useCallback } from 'react';

const PERSPECTIVE = 1000;

/**
 *
 * @param width 实际宽度
 * @param height 实际高度
 * @param fixedWidth
 * @param fixedHeight
 */
const calcTranslateZ: (width: number, fixedWidth: number) => number = (
  width,
  fixedWidth
) => {
  // width = reCalcSize(fixedHeight / fixedWidth, width, height).width
  return PERSPECTIVE * (1 - fixedWidth / width);
};

/**
 * 按照固定比例调整宽高
 * @param ratio 固定的高/宽比例
 * @param width 待调整宽度
 * @param height 待调整高度
 * @returns 调整后的宽高
 */
// const reCalcSize: (ratio: number, width: number, height: number) => { width: number; height: number } = (
//   ratio,
//   width,
//   height,
// ) => {
//   if (height / width < ratio) {
//     width = height / ratio
//   } else {
//     height = ratio * width
//   }
//   return { width, height }
// }

const calcScaleY: (
  targetRatio: number,
  curRatio: number,
  threshold?: number
) => number = (targetRatio, curRatio) => {
  return targetRatio / curRatio;
};

// TODO LIST
// 1.type, `100% 100%`  `cover`  `contain` 类似于 background-size属性
// 2.container, 挂载点
// 3.比例范围放缩, 超过一定范围出现滚动条或留白
// 4.expmple中添加几个例子 screen, admin_system
// 5.完善readMe

enum LayoutType {
  extend = 'extend',
  contain = 'contain',
}
interface ResizeFreeProps {
  width: number; //容器的固定宽度
  height: number; //容器的固定高度
  layout: LayoutType;
  ratioThreshold?: number | number[]; // 20% []
  className?: string;
}
const ResizeFree: React.FC<ResizeFreeProps> = ({
  width,
  height,
  className,
  children,
}) => {
  const [translateZ, setTranslateZ] = useState(0);
  const [scaleY, setScaleY] = useState(1);

  const resize = useCallback(() => {
    const rect = document.body.getBoundingClientRect();
    setScaleY(calcScaleY(rect.height / rect.width, height / width));
    setTranslateZ(calcTranslateZ(rect.width, width));
  }, [width, height]);

  useEffect(() => {
    resize();
  }, [resize]);

  useEffect(() => {
    // TODO dom resize => MutationObserver(IE11)  ResizeObserver(不兼容IE11)
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  return (
    <div
      className={
        className ? 'fix-size-container ' + className : 'fix-size-container'
      }
      style={{
        perspective: PERSPECTIVE + 'px',
        overflow: 'hidden',
        position: 'relative',
        height: '100vh',
        width: '100vw', // TODO 有容器dom 需修改
      }}
    >
      <div
        className="fix-size-content"
        style={{
          height,
          width,
          transform: `translate(-50%, -50%) translateZ(${translateZ}px) scaleY(${scaleY})`,
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ResizeFree;
