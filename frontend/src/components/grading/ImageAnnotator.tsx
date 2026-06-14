import React, { useRef, useEffect, useState } from 'react';
import type { DamageLocation } from '../../services/api';

interface ImageAnnotatorProps {
  imageSrc: string;
  locations: DamageLocation[];
}

const ImageAnnotator: React.FC<ImageAnnotatorProps> = ({ imageSrc, locations }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(new Image());

  useEffect(() => {
    const img = imageRef.current;
    img.src = imageSrc;
    img.onload = () => setImgLoaded(true);
  }, [imageSrc]);

  useEffect(() => {
    if (!imgLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    
    // Resize canvas to match display size
    const containerWidth = containerRef.current.offsetWidth;
    const scaleFactor = containerWidth / img.width;
    canvas.width = containerWidth;
    canvas.height = img.height * scaleFactor;

    // Draw image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Draw annotations
    locations.forEach((loc) => {
      const [ymin, xmin, ymax, xmax] = loc.box_2d;
      
      // Convert normalized (0-1000) coordinates to pixels
      const x = (xmin / 1000) * canvas.width;
      const y = (ymin / 1000) * canvas.height;
      const width = ((xmax - xmin) / 1000) * canvas.width;
      const height = ((ymax - ymin) / 1000) * canvas.height;

      // Box style
      ctx.strokeStyle = '#B12704'; // Amazon Red
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(x, y, width, height);

      // Label style
      ctx.fillStyle = '#B12704';
      ctx.font = 'bold 12px Arial';
      const labelText = loc.label.toUpperCase();
      const textWidth = ctx.measureText(labelText).width;
      
      ctx.fillRect(x, y - 20, textWidth + 10, 20);
      ctx.fillStyle = 'white';
      ctx.fillText(labelText, x + 5, y - 5);
    });

  }, [imgLoaded, locations, imageSrc]);

  return (
    <div ref={containerRef} className="w-full relative bg-gray-50 rounded-md overflow-hidden border border-amazon-border">
      <canvas 
        ref={canvasRef} 
        className="block mx-auto"
      />
      {!imgLoaded && (
        <div className="flex items-center justify-center p-20">
          <div className="w-8 h-8 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ImageAnnotator;
