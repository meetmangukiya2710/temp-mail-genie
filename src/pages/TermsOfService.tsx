import { Header } from '@/components/layout/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen gradient-hero">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none bg-card/30 border rounded-3xl p-8 sm:p-12">
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    <p className="text-muted-foreground italic mb-8">Last updated: December 25, 2025</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
                        <p>By accessing and using Temp Mail OneTap, you accept and agree to be bound by the terms and provision of this agreement.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
                        <p>Temp Mail OneTap provides temporary, disposable email addresses. The service is provided "as is" and we are not responsible for any loss of data or failure to receive emails.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Conduct</h2>
                        <p>You agree not to use the service for any illegal activities, including but not limited to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Spamming or sending unsolicited emails.</li>
                            <li>Engaging in fraudulent activities.</li>
                            <li>Distributing malware or viruses.</li>
                            <li>Harassment or stalking.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Limitation of Liability</h2>
                        <p>In no event shall Temp Mail OneTap be liable for any damages arising out of the use or inability to use the service. Use of the service is at your own risk.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Termination</h2>
                        <p>We reserve the right to terminate or restrict access to the service at any time, without notice, for any reason whatsoever.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Governing Law</h2>
                        <p>Any claim relating to Temp Mail OneTap shall be governed by the laws of the operating jurisdiction without regard to its conflict of law provisions.</p>
                    </section>
                </div>
            </main>
        </div>
    );
}
