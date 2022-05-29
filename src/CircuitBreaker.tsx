import React, { useRef } from 'react';

type Props = {
  children: React.ReactNode;
  delayTime?: number | undefined;
};
const CircuitBreaker: React.FC<Props> = ({ children, delayTime = 1000 }) => {
  /**
   * stateの代わりにrefを利用することで，無駄なrenderを減らす
   */
  const isProcessingRef = useRef(false);

  const handleClick: React.MouseEventHandler = (event) => {
    if (isProcessingRef.current) {
      event.stopPropagation();
      return;
    }

    isProcessingRef.current = true;
    setTimeout(
      () => {
        isProcessingRef.current = false;
      },
      delayTime > 0 ? delayTime : 0
    );
  };

  /**
   * capture phaseでhandleClickを呼び出して，一定時間間隔でeventが子供に伝搬しないようにする
   */
  return <div onClickCapture={handleClick}>{children}</div>;
};

export default React.memo(CircuitBreaker);
