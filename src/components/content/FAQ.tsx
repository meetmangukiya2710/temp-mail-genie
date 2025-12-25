import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "What is a temporary email address?",
        answer: "A temporary email address is a disposable email that you can use for short-term purposes, like signing up for a service or receiving a one-time password (OTP). It protects your real email from spam and phishing."
    },
    {
        question: "How long does a temporary email last?",
        answer: "Our temporary email addresses typically last for 30 minutes, which is enough time to receive and read any verification emails or OTPs."
    },
    {
        question: "Is it safe to use Temp Mail OneTap?",
        answer: "Yes, it is safe. We do not store any personal information, and all emails are automatically deleted after they expire. It's a great way to keep your primary inbox clean and secure."
    },
    {
        question: "Can I send emails using this service?",
        answer: "Temp Mail OneTap is designed for receiving emails only. This helps prevent the service from being used for spamming purposes."
    },
    {
        question: "Do I need to sign up to use the service?",
        answer: "No signup or registration is required. You get an instant email address as soon as you visit the site."
    }
];

export function FAQ() {
    return (
        <section className="py-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="max-w-2xl mx-auto bg-card/30 border rounded-2xl p-6">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left font-medium">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
