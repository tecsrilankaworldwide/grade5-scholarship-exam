import React from 'react';

const EducationReformsLogo = ({ size = 'large' }) => {
  const dimensions = {
    small: { titleSize: 'text-2xl', largeDot: 12, smallDot: 8 },
    medium: { titleSize: 'text-4xl', largeDot: 18, smallDot: 12 },
    large: { titleSize: 'text-6xl md:text-7xl', largeDot: 24, smallDot: 16 },
  };

  const { titleSize, largeDot, smallDot } = dimensions[size] || dimensions.large;

  // Dot pattern - 5x5 grid with varying sizes
  // Pattern: Large dots on corners and center, small dots create flowing pattern
  const dotPattern = [
    [largeDot, smallDot, largeDot, smallDot, largeDot],
    [smallDot, largeDot, smallDot, largeDot, smallDot],
    [largeDot, smallDot, largeDot, smallDot, largeDot],
    [smallDot, largeDot, smallDot, largeDot, smallDot],
    [largeDot, smallDot, largeDot, smallDot, largeDot],
  ];

  const renderDots = () => {
    return dotPattern.map((row, rowIndex) => (
      <div key={rowIndex} className="flex justify-center items-center gap-2 md:gap-3 mb-2 md:mb-3">
        {row.map((dotSize, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="rounded-full"
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              backgroundColor: '#1F2937',
            }}
          />
        ))}
      </div>
    ));
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

        {/* Dot Pattern - 5x5 grid with varying sizes */}
        <div className="flex flex-col">
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
