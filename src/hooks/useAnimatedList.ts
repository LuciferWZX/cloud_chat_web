import { useTrail } from 'react-spring';

/**
 * 封装的数组动画hooks
 * @param len
 */
export default function useAnimatedList(len: number) {
  return useTrail(len, {
    transform: 'translate3d(0px,0px,0px)',
    from: { transform: 'translate3d(-50px,0px,0px)' },
    config: {
      mass: 0.8,
      tension: 280,
      friction: 20,
    },
    delay: 200,
  });
}
