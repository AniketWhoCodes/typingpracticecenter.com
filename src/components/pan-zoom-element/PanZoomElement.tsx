import React, { useRef, useState, useEffect } from 'react';
import './PanZoomElement.scss';

const DraggableZoomableComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const dx = event.clientX - initialX;
        const dy = event.clientY - initialY;
        setTranslateX((prev) => prev + dx);
        setTranslateY((prev) => prev + dy);
        setInitialX(event.clientX);
        setInitialY(event.clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, initialX, initialY]);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setInitialX(event.clientX);
    setInitialY(event.clientY);
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    const scaleAmount = -event.deltaY * 0.0001;
    setScale((prev) => Math.max(0.1, prev + scaleAmount));
  };

  return (
    <div
      ref={containerRef}
      className="draggable-zoomable-container "
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      style={{
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        transition: 'transform 0.3s linear',
      }}
    >
      {children}
    </div>
  );
};

export default DraggableZoomableComponent;
