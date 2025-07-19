'use client';

import { useParams, usePathname } from 'next/navigation';
import { getCanonicalUrl, getAlternateUrls } from '@/utils/canonical';

export default function CanonicalLinks() {
  const params = useParams();
  const pathname = usePathname();
  
  // Extract locale from params
  const locale = params?.locale as string || 'it';
  
  // Extract clean pathname without locale
  const cleanPathname = pathname.replace(/^\/[a-z]{2}/, '') || '/';
  
  const canonicalUrl = getCanonicalUrl(locale, cleanPathname);
  const alternates = getAlternateUrls(cleanPathname);

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      {Object.entries(alternates).map(([lang, url]) => (
        <link 
          key={lang}
          rel="alternate" 
          hrefLang={lang} 
          href={url} 
        />
      ))}
    </>
  );
} 