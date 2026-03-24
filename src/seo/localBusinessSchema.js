import { getSiteUrl, getOgImageUrl } from './seoConfig'

/** JSON-LD Schema.org LocalBusiness — адрес и телефон как на сайте (футер / контакты) */
export function getLocalBusinessJsonLd() {
  const base = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Новая Техника',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Трилиссера, 87',
      addressLocality: 'Иркутск',
      addressRegion: 'Иркутская область',
      addressCountry: 'RU',
    },
    telephone: '+7-395-297-90-37',
    email: 'Office@ntechnics.ru',
    url: base,
    image: getOgImageUrl(),
  }
}
