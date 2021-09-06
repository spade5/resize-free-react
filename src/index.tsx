import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';

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

const ResizeFree: React.FC<{
  width: number;
  height: number;
  ratioThreshold?: number;
  className?: string;
}> = props => {
  const { width, height, className, children } = props;
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
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  return (
    <div
      className={'fix-size-container ' + className}
      style={{
        perspective: PERSPECTIVE + 'px',
        overflow: 'hidden',
        position: 'relative',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div
        className="fix-size-content"
        style={{
          height,
          width,
          transform: ` translate(-50%, -50%) translateZ(${translateZ}px) scaleY(${scaleY})`,
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
