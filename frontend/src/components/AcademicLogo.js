import React from 'react';
import { BookOpen, Award } from 'lucide-react';

const AcademicLogo = ({ size = 'large' }) => {
  const dimensions = {
    small: { logoSize: 70, titleSize: 'text-2xl', subtitleSize: 'text-sm' },
    medium: { logoSize: 100, titleSize: 'text-4xl', subtitleSize: 'text-base' },
    large: { logoSize: 130, titleSize: 'text-5xl md:text-6xl', subtitleSize: 'text-lg md:text-xl' },
  };

  const { logoSize, titleSize, subtitleSize } = dimensions[size] || dimensions.large;

  return (
    <div className="flex flex-col items-center">
      {/* Academic Badge/Seal Logo */}
      <div className="mb-6">
        <div 
          className="relative bg-white rounded-full flex items-center justify-center border-8 shadow-xl"
          style={{
            width: `${logoSize}px`,
            height: `${logoSize}px`,
            borderColor: '#F59E0B'
          }}
        >
          {/* Inner circle */}
          <div className="absolute inset-3 rounded-full border-4 border-[#92400E]"></div>
          
          {/* Center icon */}
          <div className="relative z-10">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-[#F59E0B]" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Institution Name */}
      <div className="text-center">
        <h1
          className={`${titleSize} font-bold leading-tight mb-2 text-[#1F2937] uppercase tracking-wide`}
          style={{
            fontFamily: 'Manrope, sans-serif',
            letterSpacing: '0.05em'
          }}
        >
          Examination Bureau
        </h1>
        
        {/* Divider line */}
        <div className="h-1 w-32 md:w-40 bg-[#F59E0B] mx-auto mb-3 rounded-full"></div>
        
        {/* Slogan */}
        <p
          className={`${subtitleSize} font-semibold text-[#78350F] mb-2`}
          style={{ fontFamily: 'Figtree, sans-serif' }}
        >
          Building Future Scholars
        </p>
        
        {/* Est. year */}
        <p className="text-sm md:text-base text-[#6B7280] font-medium">
          Excellence in Education Since 1982
        </p>
      </div>
    </div>
  );
};

export default AcademicLogo;
