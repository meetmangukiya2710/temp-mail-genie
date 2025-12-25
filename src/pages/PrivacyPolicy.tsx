import { Header } from '@/components/layout/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen gradient-hero">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none bg-card/30 border rounded-3xl p-8 sm:p-12">
                    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                    <p className="text-muted-foreground italic mb-8">Last updated: December 25, 2025</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
                        <p>Welcome to Temp Mail OneTap. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we handle information when you use our service.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
                        <p><strong>We do not collect personal information.</strong> You can use Temp Mail OneTap without registering or providing any personal details like your name, phone number, or primary email address.</p>
                        <p>The temporary email addresses generated are for short-term use and are not linked to your identity.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Information</h2>
                        <p>Since we do not collect personal data, we do not use it for marketing or profiling. The incoming emails to your temporary address are stored temporarily in RAM and are deleted automatically after 30 minutes or when you manually delete the address.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Cookies and Tracking</h2>
                        <p>We use minimal essential cookies to maintain your session and ensure the service functions correctly. We do not use tracking cookies for advertising purposes ourselves, although our advertising partners (Google AdSense) may use cookies to serve personalized ads.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Third-Party Services</h2>
                        <p>We use Google AdSense to show advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Data Retention</h2>
                        <p>All emails received by your temporary mailbox are permanently deleted from our servers after the expiration period (30 minutes). No backups are kept.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us through our official channels.</p>
                    </section>
                </div>
            </main>
        </div>
    );
}
