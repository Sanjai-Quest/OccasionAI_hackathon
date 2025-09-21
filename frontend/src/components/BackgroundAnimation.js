import React from 'react';

const BackgroundAnimation = () => {
    return (
        <div className="fixed inset-0 z-0">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-artisan-gradient"></div>

            {/* Animated floating shapes */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large floating circle */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>

                {/* Medium floating circle */}
                <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-400/25 rounded-full blur-2xl animate-float-delayed"></div>

                {/* Small floating circles */}
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-300/30 rounded-full blur-xl animate-float-slow"></div>

                <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-indigo-300/20 rounded-full blur-2xl animate-pulse-slow"></div>

                {/* Abstract shapes */}
                <div className="absolute bottom-1/4 left-1/3 w-80 h-40 bg-purple-400/15 rounded-full blur-3xl animate-float transform rotate-45"></div>

                <div className="absolute top-1/5 right-1/5 w-56 h-56 bg-indigo-500/20 rounded-full blur-2xl animate-float-delayed"></div>

                {/* Additional ambient shapes */}
                <div className="absolute bottom-1/3 right-2/3 w-40 h-40 bg-purple-200/25 rounded-full blur-xl animate-float-slow"></div>

                <div className="absolute top-2/3 left-1/5 w-72 h-36 bg-indigo-600/15 rounded-full blur-3xl animate-pulse-slow transform -rotate-12"></div>
            </div>

            {/* Subtle overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10"></div>
        </div>
    );
};

export default BackgroundAnimation;