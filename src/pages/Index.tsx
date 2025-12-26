import { useState, lazy, Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { EmailDisplay } from '@/components/email/EmailDisplay';
import { InboxList } from '@/components/email/InboxList';
import { useTempEmail } from '@/hooks/useTempEmail';
import { EmailMessage } from '@/types/email';
import { Shield, Zap, Clock, Trash2 } from 'lucide-react';
import { AppAd } from '@/components/ads/AppAd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Lazy load below-the-fold components
const HowItWorks = lazy(() => import('@/components/content/HowItWorks').then(m => ({ default: m.HowItWorks })));
const FAQ = lazy(() => import('@/components/content/FAQ').then(m => ({ default: m.FAQ })));
const AboutSection = lazy(() => import('@/components/content/AboutSection').then(m => ({ default: m.AboutSection })));
const EmailDetail = lazy(() => import('@/components/email/EmailDetail').then(m => ({ default: m.EmailDetail })));

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
    refreshInbox,
    copyEmail,
    availableDomains,
    selectedDomain,
    setSelectedDomain,
    authToken,
  } = useTempEmail();

  const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(null);

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

  // Show loading if email not ready yet
  if (!email) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground">{t('email.creating')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <div className="flex justify-center items-start gap-6 px-4 py-6 sm:py-10">
        {/* Left Sidebar Ad */}
        <AppAd type="sidebar-left" />

        <main className="flex-1 max-w-2xl min-w-0">
          {/* Hero section */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
              {t('hero.title_main')}{' '}
              <span className="text-gradient">{t('hero.title_accent')}</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Inline Ad 1 */}
          <AppAd type="inline" />

          {/* Email display */}
          <div className="mb-6">
            <EmailDisplay
              email={email.address}
              timeLeft={formattedTimeLeft}
              isExpired={isExpired}
              onCopy={copyEmail}
              onGenerate={generateNewEmail}
              isLoading={isLoading}
              availableDomains={availableDomains}
              selectedDomain={selectedDomain}
              onDomainChange={setSelectedDomain}
            />
          </div>

          {/* Inline Ad 2 */}
          <AppAd type="inline" />

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
                isLoading={isLoading}
                onRefresh={refreshInbox}
                onSelectMessage={setSelectedMessage}
                selectedId={selectedMessage?.id}
              />
            )}
          </Suspense>

          <AppAd type="inline" />

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

          {/* Inline Ad 3 */}
          <AppAd type="inline" />

          {/* New Content Sections */}
          <Suspense fallback={<div className="h-40 animate-pulse bg-muted/20 rounded-xl" />}>
            <div className="mt-16 space-y-16">
              <HowItWorks />
              <AboutSection />
              <FAQ />
            </div>
          </Suspense>
        </main>

        {/* Right Sidebar Ad */}
        <AppAd type="sidebar-right" />
      </div>

      {/* Persistent Banner Ad (Web Only) */}
      <AppAd type="banner" />

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
