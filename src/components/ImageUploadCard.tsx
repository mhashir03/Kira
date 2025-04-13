'use client';

import React, { useState, useRef } from 'react';
import { Upload, Camera, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ImageUploadCardProps {
  onImageSelect: (file: File | null) => void;
}

const ImageUploadCard: React.FC<ImageUploadCardProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    try {
      const file = e.target.files?.[0] || null;
      if (file) {
        onImageSelect(file);
        setPreview(URL.createObjectURL(file));
      }
      // Reset the input value to allow selecting the same file again
      e.target.value = '';
    } catch (error) {
      console.error("Error handling file selection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "captured-image.png", { type: "image/png" });
        setPreview(URL.createObjectURL(blob));
        onImageSelect(file);

        const stream = videoRef.current?.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        if (videoRef.current) videoRef.current.srcObject = null;

        setMode('upload');
      }
    }, "image/png");
  };

  const clearImage = () => {
    setPreview(null);
    onImageSelect(null);
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="rounded-xl bg-white/10 backdrop-blur-md p-5 border border-white/20 shadow-md relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-medium bg-clip-text text-transparent bg-gradient-to-r from-kira-gradient1 to-kira-purple">
          Have a visible symptom?
        </h3>
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(value: any) => {
            if (!value) return; // Prevent null value
            clearImage();
            if (value === 'camera') startCamera();
            setMode(value);
          }}
          className="bg-white/10 rounded-lg"
        >
          <ToggleGroupItem value="upload" aria-label="Upload" className="px-3 py-1">
            <Upload className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="camera" aria-label="Camera" className="px-3 py-1">
            <Camera className="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {mode === 'upload' ? (
        <div className="flex justify-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            onClick={(e) => (e.currentTarget.value = '')}
          />
          <Button
            variant="secondary"
            size="sm"
            className="rounded-md px-3 py-1 text-sm text-white bg-kira-gradient1 hover:bg-kira-purple"
            disabled={isLoading}
            onClick={handleButtonClick}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      ) : (
        <div className="mt-2">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg border border-gray-300"
          />
          <Button onClick={captureImage} className="mt-2 w-full">
            Capture 📸
          </Button>
        </div>
      )}

      {preview && (
        <div className="mt-4 relative">
          <img
            src={preview}
            alt="Preview"
            className="rounded-md w-full border border-gray-300"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100 transition"
            aria-label="Remove image"
          >
            <XCircle className="w-5 h-5 text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadCard;