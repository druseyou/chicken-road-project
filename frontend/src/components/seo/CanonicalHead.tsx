import { headers } from 'next/headers';
import { getCanonicalUrl, getAlternateUrls } from '@/utils/canonical';

interface CanonicalHeadProps {
  locale: string;
}

export default async function CanonicalHead({ locale }: CanonicalHeadProps) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  
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