import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { EmailDisplay } from '@/components/email/EmailDisplay';
import { InboxList } from '@/components/email/InboxList';
import { EmailDetail } from '@/components/email/EmailDetail';
import { useTempEmail } from '@/hooks/useTempEmail';
import { EmailMessage } from '@/types/email';
import { Shield, Zap, Clock, Trash2 } from 'lucide-react';
import { AppAd } from '@/components/ads/AppAd';

export default function Index() {
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
            Try Again
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
          <p className="text-muted-foreground">Creating your email...</p>
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
              Temporary Email for{' '}
              <span className="text-gradient">OTP & Spam</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Get instant disposable email addresses. No signup required.
              Protect your privacy from spam and unwanted emails.
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

          <AppAd type="inline" />

          {/* Features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {[
              { icon: Zap, label: 'Instant', desc: 'No signup' },
              { icon: Shield, label: 'Private', desc: 'No tracking' },
              { icon: Clock, label: '30 min', desc: 'Auto-expire' },
              { icon: Trash2, label: 'Disposable', desc: 'Self-destruct' },
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
        </main>

        {/* Right Sidebar Ad */}
        <AppAd type="sidebar-right" />
      </div>

      {/* Persistent Banner Ad (Web Only) */}
      <AppAd type="banner" />

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Temp Mail OneTap. No data is stored permanently.</p>
        </div>
      </footer>
    </div>
  );
}
