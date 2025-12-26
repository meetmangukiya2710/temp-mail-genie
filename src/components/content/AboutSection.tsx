import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function AboutSection() {
    const { t } = useTranslation();

    return (
        <section className="py-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">{t('about.title')}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        {t('about.p1')}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        {t('about.p2')}
                    </p>
                </div>

                <div className="bg-card/50 border rounded-3xl p-8 space-y-6">
                    <h3 className="text-xl font-semibold mb-4">{t('about.why_title')}</h3>
                    <ul className="space-y-4">
                        {[
                            t('about.why_item1'),
                            t('about.why_item2'),
                            t('about.why_item3'),
                            t('about.why_item4'),
                        ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
