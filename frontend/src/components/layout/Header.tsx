'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Button, GradientButton } from '@/ui';
import { cn } from '@/ui/utils/cn';
import LocaleSwitcher from './locale/LocaleSwitcher';

export default function Header() {
  const t = useTranslations('Header');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Відстежуємо скрол для зміни стилю хедера
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закриваємо мобільне меню при зміні розміру екрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { href: '/', label: t('home'), icon: '🏠' },
    { href: '/casino-reviews', label: t('casinos'), icon: '🎰' },
    { href: '/slots', label: t('slots'), icon: '🎲' },
    { href: '/bonuses', label: t('bonuses'), icon: '💰' },
    { href: '/news', label: t('news'), icon: '📰' },
  ];

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20' 
          : 'bg-white shadow-md'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg lg:text-xl">🐔</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent group-hover:from-red-700 group-hover:to-orange-700 transition-all duration-300">
                {t('siteName')}
              </h1>
              <p className="text-xs text-gray-500 hidden lg:block">{t('tagline')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-3 lg:px-4 py-2 rounded-lg text-gray-700 hover:text-red-600 font-medium transition-all duration-200 hover:bg-red-50"
              >
                <span className="flex items-center space-x-1 lg:space-x-2">
                  <span className="text-sm lg:text-base">{item.icon}</span>
                  <span className="text-sm lg:text-base">{item.label}</span>
                </span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <GradientButton 
                variant="casino" 
                size="md"
                className="text-sm font-semibold"
                glow
              >
                🎰 {t('playNow')}
              </GradientButton>
            </div>

            {/* Locale Switcher */}
            <LocaleSwitcher />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative p-2"
              onClick={toggleMobileMenu}
              aria-label={t('toggleMenu')}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={cn(
                    "block w-5 h-0.5 bg-gray-700 transition-all duration-300",
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  )}
                />
                <span
                  className={cn(
                    "block w-5 h-0.5 bg-gray-700 mt-1 transition-all duration-300",
                    isMobileMenuOpen ? "opacity-0" : ""
                  )}
                />
                <span
                  className={cn(
                    "block w-5 h-0.5 bg-gray-700 mt-1 transition-all duration-300",
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  )}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-4 border-t border-gray-200/50">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item, index) => (
                <div
                  key={item.href}
                  className="transform transition-all duration-300"
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isMobileMenuOpen ? 1 : 0
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 font-medium transition-all duration-200 group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </span>
                    <span className="text-base">{item.label}</span>
                  </Link>
                </div>
              ))}
              
              {/* Mobile CTA */}
              <div
                className="pt-4 px-4 transform transition-all duration-300"
                style={{
                  transitionDelay: isMobileMenuOpen ? `${navigationItems.length * 50}ms` : '0ms',
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: isMobileMenuOpen ? 1 : 0
                }}
              >
                <GradientButton 
                  variant="casino" 
                  size="lg"
                  fullWidth
                  glow
                  className="font-semibold"
                >
                  🎰 {t('playNow')}
                </GradientButton>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
} 