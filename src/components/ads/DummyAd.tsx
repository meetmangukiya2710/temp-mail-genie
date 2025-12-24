import React from 'react';

interface DummyAdProps {
    width?: number | string;
    height?: number | string;
    className?: string;
    text?: string;
}

export function DummyAd({
    width = '100%',
    height = '100%',
    className = '',
    text = 'Advertisement Space'
}: DummyAdProps) {
    return (
        <div
            style={{ width, height, minHeight: height === '100%' ? '60px' : height }}
            className={`bg-primary/5 border-2 border-dashed border-primary/30 flex items-center justify-center rounded-xl p-6 text-xs font-bold text-primary/60 select-none ${className}`}
        >
            <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center">
                    {/* Simple placeholder icon */}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <span>{text}</span>
            </div>
        </div>
    );
}
