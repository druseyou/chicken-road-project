import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Button, GradientButton } from '@/ui';
import { cn } from '@/ui/utils/cn';

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations('Footer');

  const quickLinks = [
    { href: '/casino-reviews', label: t('casinos'), icon: '🎰' },
    { href: '/slots', label: t('slots'), icon: '🎲' },
    { href: '/bonuses', label: t('bonuses'), icon: '💰' },
    { href: '/news', label: t('news'), icon: '📰' },
  ];

  const legalLinks = [
    { href: '/contacts', label: t('contacts'), icon: '📧' },
    { href: '/privacy-policy', label: t('privacyPolicy'), icon: '🔒' },
    { href: '/terms-of-use', label: t('termsOfUse'), icon: '📋' },
    { href: '/sitemap', label: t('sitemap'), icon: '🗺️' },
  ];

  const socialLinks = [
    { href: '#', label: 'Telegram', icon: '📱', color: 'text-blue-500' },
    { href: '#', label: 'Twitter', icon: '🐦', color: 'text-blue-400' },
    { href: '#', label: 'Facebook', icon: '📘', color: 'text-blue-600' },
    { href: '#', label: 'Instagram', icon: '📷', color: 'text-pink-500' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>
      
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">🐔</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Chicken Road
                </h3>
                <p className="text-gray-400 text-sm">{t('tagline')}</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
              {t('description')}
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/50">
                <span className="text-green-400">✅</span>
                <span className="text-xs text-gray-300">{t('licensed')}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/50">
                <span className="text-blue-400">🔒</span>
                <span className="text-xs text-gray-300">{t('secure')}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/50">
                <span className="text-purple-400">⚡</span>
                <span className="text-xs text-gray-300">{t('fastPayouts')}</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/30">
              <h4 className="font-semibold mb-2 text-white">{t('newsletter')}</h4>
              <p className="text-gray-400 text-sm mb-3">{t('newsletterDesc')}</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder={t('emailPlaceholder')}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <Button variant="casino" size="sm" className="px-4">
                  {t('subscribe')}
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
              <span className="mr-2">⚡</span>
              {t('quickLinks')}
            </h4>
            <nav>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="group flex items-center space-x-2 text-gray-300 hover:text-red-400 text-sm transition-all duration-200 hover:translate-x-1"
                    >
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
              <span className="mr-2">📋</span>
              {t('legal')}
            </h4>
            <nav>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="group flex items-center space-x-2 text-gray-300 hover:text-red-400 text-sm transition-all duration-200 hover:translate-x-1"
                    >
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Links */}
            <div className="mt-8">
              <h5 className="font-medium mb-4 text-white">{t('followUs')}</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={cn(
                      "w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-700 hover:border-gray-600",
                      social.color
                    )}
                    aria-label={social.label}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 pt-8 mt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                &copy; {year} Chicken Road Project. {t('allRightsReserved')}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {t('responsibleGaming')}
              </p>
            </div>

            {/* Age Restriction & Certifications */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-red-600/20 px-3 py-2 rounded-lg border border-red-500/30">
                <span className="text-red-400 font-bold">18+</span>
                <span className="text-red-300 text-xs">{t('ageRestriction')}</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-green-600/20 px-3 py-2 rounded-lg border border-green-500/30">
                <span className="text-green-400">🛡️</span>
                <span className="text-green-300 text-xs">{t('verified')}</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
            <p className="text-gray-400 text-xs leading-relaxed text-center">
              {t('disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 