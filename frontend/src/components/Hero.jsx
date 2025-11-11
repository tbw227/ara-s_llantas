import React from 'react';

export const Hero = React.memo(() => {
  return (
    <section id="home" className="relative min-h-screen">
      {/* Background Image - slightly bigger */}
      <div 
        className="absolute bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/b7b1ad6a-37e5-493e-af46-136af60250c0.png)',
          backgroundSize: '80%',
          top: '80px',
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
    </section>
  );
});