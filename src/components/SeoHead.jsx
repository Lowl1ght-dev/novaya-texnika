import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import {
  getSiteUrl,
  getSeoForPath,
  normalizePathname,
  getOgImageUrl,
} from '../seo/seoConfig'
import { getLocalBusinessJsonLd } from '../seo/localBusinessSchema'

export default function SeoHead() {
  const { pathname } = useLocation()
  const seo = getSeoForPath(pathname)
  const site = getSiteUrl()
  const norm = normalizePathname(pathname)
  const pathSegment = norm === '/' ? '' : norm
  const canonical = `${site}${pathSegment}`
  const ogImage = getOgImageUrl()
  const localBusinessLd = getLocalBusinessJsonLd()

  return (
    <Helmet prioritizeSeoTags>
      <html lang="ru" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords ? (
        <meta name="keywords" content={seo.keywords} />
      ) : null}
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={ogImage} />
      <script type="application/ld+json">
        {JSON.stringify(localBusinessLd)}
      </script>
    </Helmet>
  )
}
