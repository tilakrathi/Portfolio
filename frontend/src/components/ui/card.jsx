import React from 'react';

const Card = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-white text-gray-950 shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
));
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`p-6 ${className}`} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardContent };
