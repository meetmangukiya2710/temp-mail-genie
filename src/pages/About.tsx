import { Header } from '@/components/layout/Header';
import { Link } from 'react-router-dom';
import { Shield, Zap, Lock, Users, Target, Heart, ArrowLeft } from 'lucide-react';
import { AppAd } from '@/components/ads/AppAd';
import { useEffect } from 'react';

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen gradient-hero ios-content-wrapper">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl font-bold mb-4">About Temp Mail OneTap</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Your trusted partner for online privacy and disposable email services
                    </p>
                </div>

                <article className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                    <div className="bg-card/30 border rounded-3xl p-8 shadow-sm backdrop-blur-md">
                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                            <Target className="h-6 w-6 text-primary" />
                            Our Mission
                        </h2>
                        <p className="text-foreground/90 leading-relaxed">
                            At Temp Mail OneTap, our mission is simple yet powerful: to give everyone the tools they need to protect their online privacy without sacrificing convenience. In an era where your email address has become a digital commodity—bought, sold, and leaked in data breaches—we believe you deserve better control over your personal information.
                        </p>
                        <p className="text-foreground/90 leading-relaxed mt-4">
                            We founded this service because we saw a gap in the market. While permanent email services like Gmail and Outlook are excellent for professional and personal communication, they weren't designed for the countless throwaway interactions we have online every day: downloading a whitepaper, accessing free Wi-Fi, signing up for a one-time promotion, or testing a new service. Each of these interactions requires an email address, but none of them deserve access to your primary inbox or your long-term digital identity.
                        </p>
                        <p className="text-foreground/90 leading-relaxed mt-4">
                            Temp Mail OneTap fills that gap. We provide instant, disposable email addresses that work when you need them and disappear when you don't—leaving no trace, no spam, and no compromised privacy.
                        </p>
                    </div>

                    <div className="bg-card/30 border rounded-3xl p-8 shadow-sm backdrop-blur-md">
                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                            <Zap className="h-6 w-6 text-primary" />
                            How It Works
                        </h2>
                        <p className="text-foreground/90 leading-relaxed">
                            Our technology is designed around three core principles: speed, simplicity, and security.
                        </p>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-primary font-bold">1</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Instant Generation</h3>
                                    <p className="text-foreground/80">
                                        When you visit our site, we automatically generate a unique, random email address for you. No registration, no personal information required, no waiting. It takes less than a second, and you can start using it immediately.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-primary font-bold">2</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Real-Time Inbox</h3>
                                    <p className="text-foreground/80">
                                        Messages sent to your temporary address arrive in real-time. You can view them through our clean, simple web interface on any device—desktop, tablet, or mobile. We support HTML emails, plain text, and attachments, so you get the full email experience without limitations.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-primary font-bold">3</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Automatic Deletion</h3>
                                    <p className="text-foreground/80">
                                        After a set period (typically 30-60 minutes, though you can generate a new address sooner if needed), your temporary email address and all its contents are permanently deleted from our servers. This isn't just hiding the data—it's complete, irreversible deletion. Future emails sent to that address will bounce, and there's no way to recover the messages or trace them back to you.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card/30 border rounded-3xl p-8 shadow-sm backdrop-blur-md">
                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                            <Shield className="h-6 w-6 text-primary" />
                            Our Commitment to Privacy
                        </h2>
                        <p className="text-foreground/90 leading-relaxed">
                            Privacy isn't just a feature for us—it's our foundational principle. Here's what that means in practice:
                        </p>
                        <ul className="mt-4 space-y-3 text-foreground/90">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">✓</span>
                                <span><strong>No Registration Required:</strong> We never ask for your name, email address, phone number, or any personal information. Anonymous from the start.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">✓</span>
                                <span><strong>No Logging:</strong> We don't log your IP address, browser fingerprint, or browsing behavior. We can't build a profile of you because we don't collect the data.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">✓</span>
                                <span><strong>No Data Sales:</strong> We don't sell your data to advertisers, data brokers, or anyone else. We don't monetize your information—our business model is simple and transparent.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">✓</span>
                                <span><strong>Automatic Deletion:</strong> Once your email expires, it's gone forever. We don't keep backups, archives, or "deleted" folders. Deletion is permanent and complete.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">✓</span>
                                <span><strong>Secure Connections:</strong> All connections to our site use HTTPS encryption, ensuring that your data is protected in transit from your device to our servers.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-card/30 border rounded-3xl p-8 shadow-sm backdrop-blur-md">
                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                            <Lock className="h-6 w-6 text-primary" />
                            Security & Reliability
                        </h2>
                        <p className="text-foreground/90 leading-relaxed">
                            We take security seriously. Our infrastructure is designed with multiple layers of protection:
                        </p>
                        <ul className="mt-4 space-y-3 text-foreground/90">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">✓</span>
                                <span><strong>High Uptime:</strong> Our service runs on reliable cloud infrastructure with 99.9% uptime, ensuring you can access temporary emails whenever you need them.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">✓</span>
                                <span><strong>Spam Protection:</strong> We actively filter spam and malicious emails to protect you from phishing attempts and malware while using our service.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">✓</span>
                                <span><strong>Regular Updates:</strong> We continuously update our systems to address security vulnerabilities and improve performance.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-card/30 border rounded-3xl p-8 shadow-sm backdrop-blur-md">
                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                            <Users className="h-6 w-6 text-primary" />
                            Who We Serve
                        </h2>
                        <p className="text-foreground/90 leading-relaxed">
                            Temp Mail OneTap is used by millions of people worldwide across diverse needs:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                            <div className="p-4 bg-card/50 rounded-lg">
                                <h3 className="font-semibold mb-2">Privacy-Conscious Users</h3>
                                <p className="text-sm text-foreground/80">
                                    Individuals who value their digital privacy and want to minimize their online footprint.
                                </p>
                            </div>
                            <div className="p-4 bg-card/50 rounded-lg">
                                <h3 className="font-semibold mb-2">Online Shoppers</h3>
                                <p className="text-sm text-foreground/80">
                                    People making one-time purchases from unfamiliar websites without wanting long-term marketing emails.
                                </p>
                            </div>
                            <div className="p-4 bg-card /50 rounded-lg">
                                <h3 className="font-semibold mb-2">Developers & QA Engineers</h3>
                                <p className="text-sm text-foreground/80">
                                    Technical professionals testing email functionality, registration flows, and verification systems.
                                </p>
                            </div>
                            <div className="p-4 bg-card/50 rounded-lg">
                                <h3 className="font-semibold mb-2">Digital Nomads</h3>
                                <p className="text-sm text-foreground/80">
                                    Travelers accessing public Wi-Fi networks that require email registration without exposing their primary address.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card/30 border rounded-3xl p-8 shadow-sm backdrop-blur-md">
                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                            <Heart className="h-6 w-6 text-primary" />
                            Our Values
                        </h2>
                        <div className="space-y-4 text-foreground/90">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
                                <p>We believe privacy is a fundamental right, not a luxury. Our entire service is built around protecting yours.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Simplicity</h3>
                                <p>Technology should solve problems, not create them. We keep our interface clean, our process simple, and our service accessible to everyone.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Transparency</h3>
                                <p>We're honest about what we do, how we do it, and why. No hidden agendas, no fine print surprises.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Accessibility</h3>
                                <p>Privacy tools shouldn't be reserved for tech experts. Our service is free, requires no technical knowledge, and works on any device.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card/30 border rounded-3xl p-8 shadow-sm backdrop-blur-md">
                        <h2 className="text-2xl font-bold mb-4">Looking Forward</h2>
                        <p className="text-foreground/90 leading-relaxed">
                            The internet is evolving, and so are the threats to your privacy. Data breaches, spam, tracking, and surveillance are becoming more sophisticated every day. We're committed to staying ahead of these threats by continuously improving our service, adding new features, and maintaining the highest standards of privacy and security.
                        </p>
                        <p className="text-foreground/90 leading-relaxed mt-4">
                            Planned features include longer retention periods for users who need them, enhanced security options, mobile apps for iOS and Android, and integration with other privacy tools. But no matter how we evolve, our core commitment remains unchanged: your privacy comes first, always.
                        </p>
                    </div>

                    <div className="bg-card/30 border rounded-3xl p-8 shadow-sm backdrop-blur-md text-center">
                        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                        <p className="text-foreground/90 leading-relaxed mb-6">
                            Have questions, suggestions, or feedback? We'd love to hear from you. While we don't collect personal information through our service, we welcome communication for support, partnerships, or general inquiries.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/articles" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">
                                Read Our Blog
                            </Link>
                            <Link to="/privacy-policy" className="px-6 py-3 border rounded-lg font-medium hover:bg-card transition">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </article>

                <div className="mt-12">
                    <AppAd type="inline" />
                </div>
            </main>
        </div>
    );
}
