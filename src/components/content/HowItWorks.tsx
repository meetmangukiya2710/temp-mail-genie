import { Mail, RefreshCw, Eye } from 'lucide-react';

const steps = [
    {
        icon: Mail,
        title: "Generate Email",
        description: "Instantly get a unique temporary email address with just one tap."
    },
    {
        icon: Eye,
        title: "Receive Emails",
        description: "Use your temp email for any service. Watch messages appear in real-time."
    },
    {
        icon: RefreshCw,
        title: "Read & Forget",
        description: "Read your verification codes or content. The email expires automatically."
    }
];

export function HowItWorks() {
    return (
        <section className="py-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-bold mb-10 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center space-y-4">
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <step.icon size={32} />
                        </div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
