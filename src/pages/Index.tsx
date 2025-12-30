import { useState, lazy, Suspense } from 'react';
import { Capacitor } from '@capacitor/core';
import { Header } from '@/components/layout/Header';
import { EmailDisplay } from '@/components/email/EmailDisplay';
import { InboxList } from '@/components/email/InboxList';
import { useTempEmail } from '@/hooks/useTempEmail';
import { EmailMessage } from '@/types/email';
import { Shield, Zap, Clock, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { HowItWorks } from '@/components/content/HowItWorks';
import { FAQ } from '@/components/content/FAQ';
import { AboutSection } from '@/components/content/AboutSection';
import { EmailDetail } from '@/components/email/EmailDetail';

export default function Index() {
  const { t } = useTranslation();
  const {
    email,
    messages,
    isLoading,
    error,
    formattedTimeLeft,
    isExpired,
    generateNewEmail,
    createCustomEmail,
    refreshInbox,
    copyEmail,
    availableDomains,
    selectedDomain,
    setSelectedDomain,
    authToken,
  } = useTempEmail();

  const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(null);

  const isIOS = Capacitor.getPlatform() === 'ios';
  const isAndroid = Capacitor.getPlatform() === 'android';

  // Show error state if email creation failed
  if (error && !email) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-destructive font-medium">{error}</p>
          <button
            onClick={generateNewEmail}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
          >
            {t('common.try_again')}
          </button>
        </div>
      </div>
    );
  }

  // Show loading skeleton but keep structure
  const isLoadingState = !email;

  return (
    <div className="min-h-screen gradient-hero" style={{
      WebkitOverflowScrolling: 'touch',
    }}>
      <Header />

      <div className={`flex justify-center items-start gap-6 px-4 py-6 sm:py-10 ${isIOS ? 'ios-content-wrapper' : isAndroid ? 'android-content-area' : ''}`}>
        <main className="flex-1 max-w-2xl min-w-0 px-2 sm:px-0">
          {/* Hero section */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight leading-tight px-4 sm:px-0">
              <span className="whitespace-nowrap">{t('hero.title_main')}</span>{' '}
              <span className="text-gradient android-text-fallback ios-text-safe whitespace-nowrap">{t('hero.title_accent')}</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto px-4 sm:px-0">
              {t('hero.subtitle')}
            </p>
          </div>


          {/* Email display */}
          <div className="mb-6">
            <EmailDisplay
              email={email?.address || ''}
              timeLeft={formattedTimeLeft}
              isExpired={isExpired}
              onCopy={copyEmail}
              onGenerate={generateNewEmail}
              onCreateCustom={createCustomEmail}
              isLoading={isLoading || isLoadingState}
              availableDomains={availableDomains}
              selectedDomain={selectedDomain}
              onDomainChange={setSelectedDomain}
            />
          </div>

          {/* Inbox or Email Detail */}
          <Suspense fallback={<div className="h-60 animate-pulse bg-muted/20 rounded-xl" />}>
            {selectedMessage ? (
              <EmailDetail
                message={selectedMessage}
                onBack={() => setSelectedMessage(null)}
                authToken={authToken}
              />
            ) : (
              <InboxList
                messages={messages}
                isLoading={isLoading || isLoadingState}
                onRefresh={refreshInbox}
                onSelectMessage={setSelectedMessage}
                selectedId={selectedMessage?.id}
              />
            )}
          </Suspense>

          {/* Features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {[
              { icon: Zap, label: t('features.instant'), desc: t('features.instant_desc') },
              { icon: Shield, label: t('features.private'), desc: t('features.private_desc') },
              { icon: Clock, label: t('features.time'), desc: t('features.time_desc') },
              { icon: Trash2, label: t('features.disposable'), desc: t('features.disposable_desc') },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex flex-col items-center p-4 rounded-xl bg-card/50 border text-center"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-sm">{label}</span>
                <span className="text-xs text-muted-foreground">{desc}</span>
              </div>
            ))}
          </div>



          {/* New Content Sections */}
          <div className="mt-16 space-y-16">
            <HowItWorks />
            <AboutSection />
            <FAQ />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t mt-20 bg-card/30">
        <div className="container py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h3 className="font-bold text-lg mb-2">Temp Mail OneTap</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Providing secure, fast, and disposable email addresses to keep your privacy safe online.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 md:justify-end text-sm">
              <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              <Link to="/articles" className="hover:text-primary transition-colors">Articles</Link>
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Temp Mail OneTap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
