import React from 'react';

export const PixelCard = ({ children, title, className = "" }) => (
  <div className={`pixel-card ${className}`}>
    {title && (
      <div className="absolute -top-4 left-4 bg-pixelBg border-2 border-pixelGold px-2 py-1">
        <h3 className="text-[10px] text-pixelGold m-0">{title}</h3>
      </div>
    )}
    {children}
  </div>
);

export const PixelButton = ({ children, onClick, type = "button", className = "", variant = "primary" }) => {
  const variantClasses = {
    primary: "bg-pixelGold text-black hover:bg-yellow-500",
    success: "bg-pixelGreen text-black hover:bg-green-500",
    info: "bg-pixelBlue text-white hover:bg-blue-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`pixel-button ${variantClasses[variant] || variantClasses.primary} ${className}`}
    >
      {children}
    </button>
  );
};

export const PixelInput = ({ label, ...props }) => (
  <div className="flex flex-col gap-2 mb-4">
    {label && <label className="text-pixelGold text-[10px] font-pixel">{label}</label>}
    <input
      className="pixel-input"
      {...props}
    />
  </div>
);

export const HUDPanel = ({ label, value, color = "gold" }) => {
  const colorMap = {
    gold: "text-pixelGold border-pixelGold",
    green: "text-pixelGreen border-pixelGreen",
    blue: "text-pixelBlue border-pixelBlue",
  };

  return (
    <div className={`border-2 p-2 bg-black/80 ${colorMap[color] || colorMap.gold} min-w-[120px]`}>
      <div className="text-[8px] font-pixel uppercase opacity-70 mb-1">{label}</div>
      <div className="text-xl font-terminal font-bold tracking-wider">{value}</div>
    </div>
  );
};
