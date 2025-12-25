export function AboutSection() {
    return (
        <section className="py-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-2xl font-bold">About Temp Mail OneTap</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Temp Mail OneTap is a free service that provides you with a temporary, disposable email address.
                    Our mission is to help you protect your online privacy and keep your primary inbox free from spam,
                    unwanted newsletters, and potential security threats.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left pt-6">
                    <div className="p-6 rounded-2xl bg-card/50 border space-y-2">
                        <h3 className="font-semibold text-primary">Why Use Temp Mail?</h3>
                        <p className="text-sm text-muted-foreground">
                            Many websites require an email address to view content or sign up for a trial.
                            Using your real email often leads to endless marketing spam. A temporary email solves this perfectly.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-card/50 border space-y-2">
                        <h3 className="font-semibold text-primary">Privacy First</h3>
                        <p className="text-sm text-muted-foreground">
                            We don't track you. We don't store your data. Once your temporary session is over,
                            everything is wiped clean. Your privacy is our top priority.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
