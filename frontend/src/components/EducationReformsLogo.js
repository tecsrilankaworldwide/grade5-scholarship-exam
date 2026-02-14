import React from 'react';

const EducationReformsLogo = ({ size = 'large' }) => {
  const dimensions = {
    small: { titleSize: 'text-2xl', dotSize: 8, groupGap: 12, colGap: 8, cols: 5, groupsPerCol: 5 },
    medium: { titleSize: 'text-4xl', dotSize: 12, groupGap: 16, colGap: 12, cols: 5, groupsPerCol: 5 },
    large: { titleSize: 'text-6xl md:text-7xl', dotSize: 16, groupGap: 20, colGap: 14, cols: 5, groupsPerCol: 5 },
  };

  const { titleSize, dotSize, groupGap, colGap, cols, groupsPerCol } = dimensions[size] || dimensions.large;

  // Generate dot pattern - vertical groups of 3 dots
  const renderDots = () => {
    const columns = [];
    for (let col = 0; col < cols; col++) {
      const dotGroups = [];
      for (let group = 0; group < groupsPerCol; group++) {
        // Each group has 3 dots vertically
        const dotsInGroup = [];
        for (let dot = 0; dot < 3; dot++) {
          dotsInGroup.push(
            <div
              key={`${col}-${group}-${dot}`}
              className="rounded-full"
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                backgroundColor: '#1F2937',
                marginBottom: dot < 2 ? '6px' : '0',
              }}
            />
          );
        }
        dotGroups.push(
          <div key={`${col}-${group}`} style={{ marginBottom: group < groupsPerCol - 1 ? `${groupGap}px` : '0' }}>
            {dotsInGroup}
          </div>
        );
      }
      columns.push(
        <div key={col} className="flex flex-col" style={{ marginRight: col < cols - 1 ? `${colGap}px` : '0' }}>
          {dotGroups}
        </div>
      );
    }
    return columns;
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

        {/* Dot Pattern - Vertical groups */}
        <div className="flex items-center">
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
