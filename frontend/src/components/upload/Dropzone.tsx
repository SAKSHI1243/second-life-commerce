import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import Button from '../ui/Button';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onFileSelect(file);
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div 
      className={`relative border-2 border-dashed rounded-md p-10 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 min-h-[300px]
        ${dragActive ? 'border-amazon-orange bg-orange-50' : 'border-amazon-border bg-white hover:border-amazon-orange'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input 
        ref={inputRef}
        type="file" 
        className="hidden" 
        accept="image/*"
        onChange={handleChange}
      />

      {preview ? (
        <div className="relative w-full max-w-xs aspect-square">
          <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-md" />
          <button 
            onClick={clearFile}
            className="absolute -top-2 -right-2 bg-amazon-red text-white rounded-full p-1 hover:bg-red-700 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <div className="bg-gray-100 p-4 rounded-full text-amazon-muted">
            <Upload size={40} />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-amazon-text">Upload product photo for grading</p>
            <p className="text-sm text-amazon-muted mt-1">Drag and drop or click to browse</p>
          </div>
          <Button variant="secondary" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Select Image'}
          </Button>
          <p className="text-xs text-amazon-muted">Supports JPG, PNG, WEBP (Max 10MB)</p>
        </>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-4 rounded-md z-20">
          <div className="w-12 h-12 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-amazon-dark">AI is analyzing your Product.</p>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
