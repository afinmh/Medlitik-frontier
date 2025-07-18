export function MedlitikLogo({ size = 40, className = "" }) {
  return (
    <div 
      className={`flex items-center justify-center bg-[#3570ff] text-white rounded-lg ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="font-bold text-white" style={{ fontSize: size * 0.4 }}>
        M
      </span>
    </div>
  );
}

export function GoogleIcon({ size = 18, className = "" }) {
  return (
    <div 
      className={`flex items-center justify-center bg-[#4285f4] text-white rounded ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="font-bold text-white" style={{ fontSize: size * 0.6 }}>
        G
      </span>
    </div>
  );
}

export function FacebookIcon({ size = 18, className = "" }) {
  return (
    <div 
      className={`flex items-center justify-center bg-[#1877f2] text-white rounded ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="font-bold text-white" style={{ fontSize: size * 0.6 }}>
        f
      </span>
    </div>
  );
}

export function MedicalIllustration({ width = 300, height = 200, className = "" }) {
  return (
    <div 
      className={`flex items-center justify-center bg-white text-[#3570ff] rounded-lg shadow-2xl ${className}`}
      style={{ width, height }}
    >
      <div className="text-center">
        <div className="text-6xl mb-4">🏥</div>
        <div className="text-sm font-semibold">Medical Platform</div>
      </div>
    </div>
  );
}
