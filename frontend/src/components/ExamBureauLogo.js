import React from 'react';

const ExamBureauLogo = ({ size = 'large' }) => {
  const dimensions = {
    small: { width: 80, height: 80, textSize: 'text-xl', sloganSize: 'text-sm' },
    medium: { width: 120, height: 120, textSize: 'text-3xl', sloganSize: 'text-base' },
    large: { width: 160, height: 160, textSize: 'text-5xl', sloganSize: 'text-xl' },
  };

  const { width, height, textSize, sloganSize } = dimensions[size] || dimensions.large;

  return (
    <div className="flex flex-col items-center">
      {/* Arrow Starburst Logo */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
      >
        {/* Center circle */}
        <circle cx="100" cy="100" r="20" fill="#FFFFFF" />
        
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
        
        {/* Center star */}
        <circle cx="100" cy="100" r="15" fill="#F59E0B" />
        <path
          d="M100 92 L102 98 L108 98 L103 102 L105 108 L100 104 L95 108 L97 102 L92 98 L98 98 Z"
          fill="#FFFFFF"
        />
      </svg>

      {/* Text Content */}
      <div className="text-center">
        <h1
          className={`${textSize} font-black leading-tight mb-2`}
          style={{
            fontFamily: 'Manrope, sans-serif',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #92400E 0%, #F59E0B 50%, #92400E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Examination Bureau
        </h1>
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
