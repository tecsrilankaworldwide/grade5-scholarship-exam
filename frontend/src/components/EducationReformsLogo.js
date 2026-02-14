import React from 'react';

const EducationReformsLogo = ({ size = 'large' }) => {
  const dimensions = {
    small: { titleSize: 'text-2xl', dotSize: 6, gap: 6, cols: 3, rows: 6 },
    medium: { titleSize: 'text-4xl', dotSize: 10, gap: 8, cols: 3, rows: 6 },
    large: { titleSize: 'text-6xl md:text-7xl', dotSize: 14, gap: 10, cols: 3, rows: 6 },
  };

  const { titleSize, dotSize, gap, cols, rows } = dimensions[size] || dimensions.large;

  // Generate dot grid
  const renderDots = () => {
    const dots = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push(
          <div
            key={`${row}-${col}`}
            className="rounded-full"
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              backgroundColor: '#F59E0B',
            }}
          />
        );
      }
    }
    return dots;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Logo: Text + Dots */}
      <div className="flex items-center gap-6 md:gap-8 mb-6">
        {/* Text */}
        <div className="text-left">
          <h1
            className={`${titleSize} font-black leading-tight tracking-tight`}
            style={{
              fontFamily: 'Manrope, sans-serif',
              color: '#1F2937',
              letterSpacing: '-0.02em'
            }}
          >
            EDUCATION
          </h1>
          <h1
            className={`${titleSize} font-black leading-tight tracking-tight`}
            style={{
              fontFamily: 'Manrope, sans-serif',
              color: '#1F2937',
              letterSpacing: '-0.02em'
            }}
          >
            REFORMS
          </h1>
        </div>

        {/* Dot Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
            gap: `${gap}px`,
          }}
        >
          {renderDots()}
        </div>
      </div>

      {/* Slogan */}
      <div
        className="text-xl md:text-2xl font-bold text-[#78350F] flex items-center justify-center gap-2"
        style={{ fontFamily: 'Figtree, sans-serif' }}
      >
        <span className="text-[#F59E0B]">✨</span>
        Building Future Scholars
        <span className="text-[#F59E0B]">✨</span>
      </div>
    </div>
  );
};

export default EducationReformsLogo;
