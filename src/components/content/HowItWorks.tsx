import { Mail, RefreshCw, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function HowItWorks() {
    const { t } = useTranslation();

    const steps = [
        {
            icon: Mail,
            title: t('how_it_works.step1_title'),
            description: t('how_it_works.step1_desc')
        },
        {
            icon: Eye,
            title: t('how_it_works.step2_title'),
            description: t('how_it_works.step2_desc')
        },
        {
            icon: RefreshCw,
            title: t('how_it_works.step3_title'),
            description: t('how_it_works.step3_desc')
        }
    ];

    return (
        <section className="py-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-bold mb-10 text-center">{t('how_it_works.title')}</h2>
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
