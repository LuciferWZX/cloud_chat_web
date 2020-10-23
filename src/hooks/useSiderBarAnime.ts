import anime from 'animejs';
interface AnimeConfig {
  targets: Array<any> | string;
  translateY?: Array<number> | number;
  translateX?: Array<number> | number;
  delay?: any;
}

/**
 * anime.js动画效果，左侧菜单栏专用
 * @param config
 */
export default function useSiderBarAnime(config: AnimeConfig) {
  anime({
    targets: config.targets,
    translateY: config.translateY,
    translateX: config.translateX,
    delay: (config.delay && config.delay) || anime.stagger(100), // 每个元素的延迟增加100毫秒。
    easing: 'easeOutExpo',
    duration: 250,
  });
}
