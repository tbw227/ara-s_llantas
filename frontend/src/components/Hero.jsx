import React from 'react';

export const Hero = React.memo(() => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background Image - optimized with img tag for better loading */}
      <div 
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{ 
          top: '80px',
          bottom: 0,
          maxHeight: 'calc(100vh - 80px)'
        }}
      >
        <img
          src="/images/b7b1ad6a-37e5-493e-af46-136af60250c0.png"
          alt="Ara's Llanta's Logo Background"
          className="w-full max-w-[80%] h-auto max-h-full object-contain pointer-events-none"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </div>
    </section>
  );
});