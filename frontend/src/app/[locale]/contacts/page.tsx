'use client';

import { useTranslations } from 'next-intl';
import ContactForm from '@/components/forms/ContactForm';
import { Heading } from '@/ui/components/atoms';

export default function ContactsPage() {
  const t = useTranslations('ContactForm');

  const handleFormSubmit = (data: any) => {
    console.log('Contact form submitted:', data);
    // Тут можна додати логіку відправки на сервер
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Heading as="h1" size="3xl" className="mb-4">
            {t('title')}
          </Heading>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <ContactForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
} 