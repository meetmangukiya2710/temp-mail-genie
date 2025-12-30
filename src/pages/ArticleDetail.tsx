import { Header } from '@/components/layout/Header';
import { Link, useParams, Navigate } from 'react-router-dom';
import { articles } from '@/data/articles';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { AppAd } from '@/components/ads/AppAd';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function ArticleDetail() {
    const { id } = useParams();
    const article = articles.find(a => a.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!article) {
        return <Navigate to="/articles" replace />;
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard');
        }
    };

    return (
        <div className="min-h-screen gradient-hero ios-content-wrapper">
            <Header />
            <main className="max-w-3xl mx-auto px-4 py-12">
                <Link to="/articles" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Articles
                </Link>

                <article className="animate-fade-in bg-card/30 border rounded-3xl p-6 sm:p-10 shadow-sm backdrop-blur-md">
                    <header className="mb-8 border-b pb-8">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {article.date}</span>
                            <span className="flex items-center gap-1"><User className="h-4 w-4" /> {article.author}</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight text-foreground">{article.title}</h1>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{article.excerpt}</p>

                        <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                            <Share2 className="h-4 w-4" /> Share Article
                        </Button>
                    </header>

                    <div
                        className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 article-content"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </article>

                {/* AdSense compliant ad placement - only on content-rich article pages */}
                <div className="mt-12">
                    <AppAd type="inline" />
                </div>
            </main>
        </div>
    );
}
