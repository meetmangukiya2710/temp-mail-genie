import { Header } from '@/components/layout/Header';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';

import { useEffect } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const faqs = [
        {
            question: "What is a temporary email address?",
            answer: "A temporary email address (also called disposable, throwaway, or burner email) is a fully functional email address that exists for a limited time period—typically 30 to 60 minutes. It receives emails just like a regular email address, but automatically self-destructs after the time limit expires, permanently deleting all messages and the address itself."
        },
        {
            question: "How does Temp Mail OneTap work?",
            answer: "When you visit our website, we automatically generate a unique, random email address for you instantly—no registration required. You can use this address to receive emails, verification codes, or any messages you need. The email inbox is accessible through our web interface in real-time. After a set period (usually 30-60 minutes), the email address and all its contents are permanently deleted from our servers."
        },
        {
            question: "Is Temp Mail OneTap free to use?",
            answer: "Yes, our service is completely free. You don't need to create an account, provide payment information, or subscribe to anything. We generate unlimited temporary email addresses at no cost. Our service is supported by non-intrusive advertising placed only on content pages, never on the functional tool interface."
        },
        {
            question: "How long do temporary email addresses last?",
            answer: "By default, temporary email addresses remain active for approximately 30-60 minutes. You can see the countdown timer on your screen showing how much time remains. If you need a new address before it expires, you can generate a fresh one instantly by clicking the 'New Email' button. Once expired, the address and all messages are permanently deleted and cannot be recovered."
        },
        {
            question: "Can I create a custom temporary email address?",
            answer: "Yes! Temp Mail OneTap allows you to create custom email addresses with your chosen username. Simply use the custom email feature, enter your preferred username, select from available domains, and your personalized temporary address will be created. This is useful when you want a more memorable or professional-looking temporary address, while still enjoying the same privacy and automatic deletion benefits."
        },
        {
            question: "Is Temp Mail OneTap safe and secure?",
            answer: "Absolutely. We prioritize your security and privacy. All connections to our site use HTTPS encryption to protect data in transit. We don't log your IP address, browser fingerprint, or any identifying information. We don't store emails beyond the temporary period—once deleted, they're gone forever with no backups or archives. However, remember that temporary emails should only be used for non-sensitive communications. Never use them for banking, healthcare, government services, or other critical accounts."
        },
        {
            question: "What happens to my data?",
            answer: "We don't collect or store any personal data about you. When you generate a temporary email, we create a temporary inbox that receives messages. After the expiration period (30-60 minutes), the email address and ALL its contents are permanently deleted from our servers using secure deletion methods. There are no backups, no archives, and no way to recover the data. We also don't track your visits, log your IP address, or build profiles of user behavior."
        },
        {
            question: "Can I use temporary email for social media sign-ups?",
            answer: "While technically possible, we generally don't recommend using temporary emails for social media accounts. Most social media platforms (Facebook, Twitter, Instagram, LinkedIn, etc.) require ongoing access to your email for account recovery, security notifications, and password resets. If your temporary email expires and you lose access to your account, you won't be able to recover it. For social media, consider using a secondary permanent email address or an email alias instead."
        },
        {
            question: "Does Temp Mail OneTap work on mobile devices?",
            answer: "Yes! Our web-based service works perfectly on all mobile devices—smartphones and tablets running iOS, Android, or any other operating system. Simply visit our website in your mobile browser, and you'll have full access to all features. The interface is fully responsive and optimized for touchscreens. We also have native mobile apps in development for an even better mobile experience."
        },
        {
            question: "Can I send emails from my temporary address?",
            answer: "Currently, Temp Mail OneTap is designed primarily for receiving emails, not sending them. This is intentional—it prevents our service from being abused for spam or illegal activities, and it aligns with the primary use case of temporary emails (receiving verification codes, confirmations, and one-time communications). If you need to send emails, consider using your primary email address or a dedicated email service."
        },
        {
            question: "What types of emails can I receive?",
            answer: "You can receive virtually any type of email: plain text messages, HTML formatted emails, emails with images, and even emails with attachments. Our system handles standard email protocols and formats, so verification codes, order confirmations, newsletters, account activations, and most other email types will work perfectly. However, we do filter out obvious spam and malicious emails to protect you from phishing and malware."
        },
        {
            question: "Can I download email attachments?",
            answer: "Yes, you can view and download attachments from emails received in your temporary inbox. Click on the email to view its full content, and any attachments will be displayed with download buttons. Common file types like PDFs, images, documents, and ZIP files are all supported. However, always exercise caution when downloading attachments, even from temporary emails—scan downloads with antivirus software if they're from unknown sources."
        },
        {
            question: "What's the difference between temporary email and email aliases?",
            answer: "Email aliases (like Gmail's '+' addressing feature) are permanent variations of your real email address. Messages still arrive in your primary inbox, and the alias can be traced back to your main account. Temporary emails, on the other hand, are completely separate, anonymous addresses that can't be traced back to you and self-destruct after use. Think of aliases as nicknames—they're connected to your real identity. Temporary emails are more like wearing a mask that you throw away after the party."
        },
        {
            question: "Why isn't my verification email arriving?",
            answer: "If a verification email isn't showing up in your temp inbox, try these steps: (1) Wait a few minutes—some  services take time to send emails. (2) Click the refresh button to manually check for new messages. (3) Check if the sending service might be blocking temporary email domains (some services detect and block disposable emails). (4) Try generating a new temporary address and attempting the verification again. (5) If persistent issues occur, the service may have measures in place specifically to prevent temporary email usage."
        },
        {
            question: "Can services detect that I'm using a temporary email?",
            answer: "Some services and websites actively detect and block temporary email addresses. They maintain lists of known temporary email domains and reject registrations from them. This is particularly common with financial services, subscription-based businesses, and platforms concerned about fraud or fake accounts. If you encounter this, you may need to use a permanent email address for that specific service. However, many services don't have such restrictions, and temporary emails work perfectly fine."
        },
        {
            question: "Is it legal to use temporary email services?",
            answer: "Yes, using temporary email services is completely legal in virtually all jurisdictions. It's a legitimate privacy tool, similar to using a VPN or private browsing mode. However, while the tool itself is legal, how you use it matters. Don't use temporary emails to violate terms of service, commit fraud, evade bans, or engage in illegal activities. Some websites explicitly prohibit temporary emails in their terms of service, and violating those terms (while not illegal) could result in account suspension."
        },
        {
            question: "What should I NOT use temporary email for?",
            answer: "Never use temporary emails for critical accounts or services: Banking or financial institutions, Government services (taxes, licenses, official documents), Healthcare providers or medical records, Employment applications or work accounts, Educational institutions, Long-term subscriptions or paid services you plan to keep using, Password recovery email addresses, or Any account where you need ongoing access and can't afford to lose it. Temporary emails are perfect for throwaway interactions, but use your permanent email for anything important."
        },
        {
            question: "How do you make money if the service is free?",
            answer: "We maintain a sustainable business model through carefully placed, non-intrusive advertising on our content pages—specifically on our blog articles, about page, and FAQ page. Critically, we do NOT place ads on the functional temporary email interface itself, ensuring your tool experience remains clean and distraction-free. We also never sell user data (we don't collect any in the first place), and we don't have hidden fees or premium tiers. Our goal is to provide a genuinely free, useful service while staying financially sustainable."
        },
        {
            question: "Can I use the same temporary email multiple times?",
            answer: "As long as the temporary email address hasn't expired (typically 30-60 minutes from creation), you can receive multiple emails to the same address. Simply keep the browser tab open or bookmark the URL to return to the same inbox. However, once the time limit expires, that specific address is gone forever and can't be reused. Each time you generate a 'new email,' it creates a completely different address."
        },
        {
            question: "Does Temp Mail OneTap support multiple domains?",
            answer: "Yes, we offer multiple email domains to choose from when creating your temporary email address. This gives you flexibility—if one domain is blocked by a service, you can try another. You can select your preferred domain from a dropdown menu when generating a temporary address. All domains function identically in terms of receiving emails and privacy protection."
        },
        {
            question: "What happens if I close my browser?",
            answer: "If you close your browser tab or window, you can still access your temporary email inbox as long as it hasn't expired. The inbox URL contains a unique identifier that gives you access. However, once you close the browser, it may be difficult to remember or retrieve that specific URL. For important verification codes or messages, we recommend completing your task before closing the browser. Alternatively, bookmark the inbox URL or copy any critical information before navigating away."
        },
        {
            question: "Can I extend the expiration time of my email?",
            answer: "Currently, temporary email addresses have a fixed expiration time of 30-60 minutes and cannot be extended. This is by design—the automatic deletion is a core privacy feature that ensures your data doesn't linger on our servers. If you need more time, we recommend copying any important information (like verification codes or confirmation numbers) to a safe place before the address expires. For longer-term needs, consider using a permanent secondary email address instead of a temporary one."
        },
        {
            question: "Is there a limit to how many temporary emails I can create?",
            answer: "No, there's no limit. You can generate as many temporary email addresses as you need, whether that's one per day, dozens per hour, or hundreds over time. Each address is completely independent, with its own inbox and expiration timer. We believe in providing unlimited access to privacy tools without arbitrary restrictions or quotas."
        },
        {
            question: "Do you offer an API for developers?",
            answer: "We're currently evaluating demand for an API that would allow developers to programmatically generate temporary emails, check inboxes, and integrate our service into their applications. This would be particularly useful for automated testing, QA workflows, and application development. If you're interested in an API or have specific use cases in mind, please let us know through our contact channels. Developer interest will help prioritize this feature in our roadmap."
        },
        {
            question: "How do you handle spam and malicious emails?",
            answer: "We actively filter incoming emails to protect users from spam, phishing attempts, and malware. Our system uses multiple layers of protection including reputation-based filtering, content analysis, and known malicious sender blocking. While we can't guarantee 100% protection (no system can), we significantly reduce the risk of harmful emails reaching your temporary inbox. Additionally, since temporary emails are disposable by nature, any spam that does get through will be automatically deleted along with the address after expiration."
        }
    ];

    return (
        <div className="min-h-screen gradient-hero ios-content-wrapper">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <HelpCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Everything you need to know about Temp Mail OneTap and temporary email addresses
                    </p>
                </div>

                <div className="bg-card/30 border rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-md mb-12">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left hover:no-underline">
                                    <span className="font-semibold pr-4">{faq.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="text-foreground/80 leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="bg-card/30 border rounded-3xl p-8 shadow-sm backdrop-blur-md text-center">
                    <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
                    <p className="text-foreground/80 mb-6">
                        Can't find what you're looking for? Check out our comprehensive guides and articles for more detailed information about online privacy, email security, and best practices.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/articles" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">
                            Read Our Blog
                        </Link>
                        <Link to="/about" className="px-6 py-3 border rounded-lg font-medium hover:bg-card transition">
                            About Us
                        </Link>
                    </div>
                </div>


            </main>
        </div>
    );
}
