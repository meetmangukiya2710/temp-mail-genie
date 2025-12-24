import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SplashScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

export function SplashScreen({ onComplete, minDuration = 2000 }: SplashScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'text' | 'exit'>('logo');

  useEffect(() => {
    // Phase 1: Logo animation
    const textTimer = setTimeout(() => setPhase('text'), 400);
    
    // Phase 2: Exit animation
    const exitTimer = setTimeout(() => setPhase('exit'), minDuration - 400);
    
    // Complete
    const completeTimer = setTimeout(onComplete, minDuration);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, minDuration]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-all duration-500",
        phase === 'exit' && "opacity-0 scale-105"
      )}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Logo container */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated logo */}
        <div
          className={cn(
            "relative transition-all duration-700 ease-out",
            phase === 'logo' ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        >
          {/* Glow ring */}
          <div className="absolute inset-0 -m-4 rounded-3xl bg-primary/20 blur-xl animate-pulse" />
          
          {/* Logo box */}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl gradient-primary shadow-glow">
            <Mail className="h-12 w-12 text-primary-foreground animate-bounce" style={{ animationDuration: '1s' }} />
          </div>
          
          {/* Decorative rings */}
          <div className="absolute inset-0 -m-2 rounded-3xl border-2 border-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
        </div>

        {/* App name */}
        <div
          className={cn(
            "flex flex-col items-center gap-2 transition-all duration-500 delay-200",
            phase === 'text' || phase === 'exit' 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          )}
        >
          <h1 className="text-3xl font-bold tracking-tight">
            Temp<span className="text-gradient">Mail</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Disposable emails for your privacy
          </p>
        </div>

        {/* Loading dots */}
        <div
          className={cn(
            "flex gap-1.5 transition-all duration-500 delay-300",
            phase === 'text' || phase === 'exit'
              ? "opacity-100"
              : "opacity-0"
          )}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.6s' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
