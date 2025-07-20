import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getCanonicalUrl, getCurrentUrl, getAlternateUrls } from '@/utils/canonical';
import { Metadata } from 'next';

// Lazy load компонентів
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-16 bg-white shadow-md" />,
  ssr: true,
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-32 bg-gray-100" />,
  ssr: true,
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  
  // ✅ Видаляємо canonical - кожна сторінка встановлює свій власний
  return {
    // Можна залишити тільки базові дані, якщо потрібно
  };
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { children, params } = props;
  const { locale } = await params;
  
  // Завантажуємо тільки потрібні повідомлення для поточної локалі
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Suspense fallback={<div className="h-16 bg-white shadow-md animate-pulse" />}>
        <Header />
      </Suspense>
      <main className="flex-grow">{children}</main>
      <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse" />}>
        <Footer />
      </Suspense>
    </NextIntlClientProvider>
  );
} 