import React from 'react';

export default function Background() {
  return (
    <div 
      className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-black/10 bg-blend-overlay"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80')`
      }}
    />
  );
}