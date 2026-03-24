/** Атрибуты для LCP / hero (главный баннер) */
export const heroImageProps = {
  loading: 'eager',
  fetchpriority: 'high',
  decoding: 'async',
}

/** Ниже сгиба: отложенная загрузка + резерв места под CLS */
export function lazyImageProps(width, height) {
  return {
    loading: 'lazy',
    fetchpriority: 'low',
    decoding: 'async',
    width,
    height,
  }
}
