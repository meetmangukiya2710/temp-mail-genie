import { Header } from '@/components/layout/Header';
import { Link } from 'react-router-dom';
import { articles } from '@/data/articles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function Articles() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen gradient-hero ios-content-wrapper">
            <Header />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl font-bold mb-4">Latest Articles</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Insights, guides, and news about online privacy, email security, and digital safety.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {articles.map((article) => (
                        <Card key={article.id} className="hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm border-muted/50">
                            <CardHeader>
                                <CardTitle className="leading-tight">
                                    <Link to={`/articles/${article.id}`} className="hover:text-primary transition-colors">
                                        {article.title}
                                    </Link>
                                </CardTitle>
                                <div className="flex items-center text-sm text-muted-foreground gap-4 mt-2">
                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.date}</span>
                                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {article.author}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    {article.excerpt}
                                </CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Link to={`/articles/${article.id}`} className="text-primary font-medium hover:underline text-sm">
                                    Read more &rarr;
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>


            </div>
        </div>
    );
}
