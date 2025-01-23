import React, { useRef } from 'react';

interface GpxUploaderProps {
  onUpload: (file: File) => Promise<void>;
  isUploading?: boolean;
}

export function GpxUploader({ onUpload, isUploading }: GpxUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      await onUpload(file);
    } catch (error) {
      console.error('Error uploading GPX:', error);
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".gpx"
        onChange={handleFileChange}
        className="hidden"
      />
      <button 
        onClick={handleClick}
        disabled={isUploading}
        className="bg-white/90 hover:bg-white px-4 py-2 rounded-lg shadow-lg text-gray-800 font-medium transition-colors disabled:opacity-50"
      >
        {isUploading ? 'Uploading...' : 'Upload GPX'}
      </button>
    </div>
  );
}