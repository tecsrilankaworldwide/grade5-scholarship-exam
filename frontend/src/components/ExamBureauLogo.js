import React from 'react';
import { Star } from 'lucide-react';

const ExamBureauLogo = ({ size = 'large' }) => {
  const dimensions = {
    small: { width: 100, height: 100, titleSize: 'text-3xl', sloganSize: 'text-base' },
    medium: { width: 140, height: 140, titleSize: 'text-5xl', sloganSize: 'text-xl' },
    large: { width: 180, height: 180, titleSize: 'text-7xl', sloganSize: 'text-2xl' },
  };

  const { width, height, titleSize, sloganSize } = dimensions[size] || dimensions.large;

  return (
    <div className="flex flex-col items-center">
      {/* Arrow Starburst Logo with bouncing star */}
      <div className="relative mb-8">
        <svg
          width={width}
          height={height}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Outer circle glow */}
          <circle cx="100" cy="100" r="95" fill="url(#glowGradient)" opacity="0.3" />
          
          {/* Top arrow */}
          <path
            d="M100 20 L110 80 L100 70 L90 80 Z"
            fill="#F59E0B"
            opacity="0.95"
          />
          
          {/* Top-right arrow */}
          <path
            d="M155 45 L115 90 L120 80 L110 75 Z"
            fill="#FB923C"
            opacity="0.9"
          />
          
          {/* Right arrow */}
          <path
            d="M180 100 L120 110 L130 100 L120 90 Z"
            fill="#F59E0B"
            opacity="0.95"
          />
          
          {/* Bottom-right arrow */}
          <path
            d="M155 155 L115 110 L120 120 L110 125 Z"
            fill="#FCD34D"
            opacity="0.85"
          />
          
          {/* Bottom arrow */}
          <path
            d="M100 180 L110 120 L100 130 L90 120 Z"
            fill="#F59E0B"
            opacity="0.95"
          />
          
          {/* Bottom-left arrow */}
          <path
            d="M45 155 L85 110 L80 120 L90 125 Z"
            fill="#FB923C"
            opacity="0.9"
          />
          
          {/* Left arrow */}
          <path
            d="M20 100 L80 110 L70 100 L80 90 Z"
            fill="#F59E0B"
            opacity="0.95"
          />
          
          {/* Top-left arrow */}
          <path
            d="M45 45 L85 90 L80 80 L90 75 Z"
            fill="#FCD34D"
            opacity="0.85"
          />
          
          {/* Inner rays */}
          <path d="M100 60 L105 85 L100 80 L95 85 Z" fill="#FCD34D" opacity="0.7" />
          <path d="M140 100 L115 105 L120 100 L115 95 Z" fill="#FCD34D" opacity="0.7" />
          <path d="M100 140 L105 115 L100 120 L95 115 Z" fill="#FCD34D" opacity="0.7" />
          <path d="M60 100 L85 105 L80 100 L85 95 Z" fill="#FCD34D" opacity="0.7" />
          
          {/* Center white circle */}
          <circle cx="100" cy="100" r="25" fill="#FFFFFF" />
          
          {/* Center orange circle */}
          <circle cx="100" cy="100" r="18" fill="#F59E0B" />
          
          {/* Center white star */}
          <path
            d="M100 90 L102.5 97 L110 97 L104 102 L106.5 109 L100 104 L93.5 109 L96 102 L90 97 L97.5 97 Z"
            fill="#FFFFFF"
          />
          
          {/* Gradient definition */}
          <defs>
            <radialGradient id="glowGradient">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        
        {/* Bouncing star badge */}
        <div className="absolute -top-3 -right-3 w-14 h-14 bg-gradient-to-br from-[#FCD34D] to-[#F59E0B] rounded-full flex items-center justify-center shadow-xl animate-bounce border-4 border-white">
          <Star className="w-7 h-7 text-[#92400E]" fill="#92400E" strokeWidth={2} />
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center">
        <h1
          className={`${titleSize} font-black leading-none mb-4`}
          style={{
            fontFamily: 'Manrope, sans-serif',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #92400E 0%, #F59E0B 50%, #92400E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          Examination<br/>Bureau
        </h1>
        
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Star className="w-5 h-5 md:w-6 md:h-6 text-[#F59E0B]" fill="#F59E0B" />
          <div className="h-1.5 w-24 md:w-32 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent rounded-full"></div>
          <Star className="w-5 h-5 md:w-6 md:h-6 text-[#F59E0B]" fill="#F59E0B" />
        </div>
        
        <div
          className={`${sloganSize} font-bold text-[#78350F] flex items-center justify-center gap-2`}
          style={{ fontFamily: 'Figtree, sans-serif' }}
        >
          <span className="text-[#F59E0B]">✨</span>
          Building Future Scholars
          <span className="text-[#F59E0B]">✨</span>
        </div>
      </div>
    </div>
  );
};

export default ExamBureauLogo;
