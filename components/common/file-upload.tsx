'use client';

import type React from 'react';

import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { VideoIcon, X, Upload, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FileUploadProps {
  onFileUpload: (files: { images?: File[]; video?: File }) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<{
    images?: File[];
    video?: File;
  }>({});
  const [dragActive, setDragActive] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles: File[] = [];
    let videoFile: File | undefined;

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        // Kiểm tra kích thước ảnh (tối đa 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert(`Ảnh ${file.name} vượt quá 10MB`);
          return;
        }
        imageFiles.push(file);
      } else if (file.type.startsWith('video/')) {
        // Kiểm tra kích thước video (tối đa 100MB)
        if (file.size > 100 * 1024 * 1024) {
          alert(`Video ${file.name} vượt quá 100MB`);
          return;
        }
        videoFile = file;
      } else {
        alert(`File ${file.name} không được hỗ trợ`);
      }
    });

    const newFiles = {
      ...uploadedFiles,
      ...(imageFiles.length > 0 && {
        images: [...(uploadedFiles.images || []), ...imageFiles],
      }),
      ...(videoFile && { video: videoFile }),
    };

    setUploadedFiles(newFiles);
    onFileUpload(newFiles);
  };

  const removeFile = (type: 'image' | 'video', index?: number) => {
    const newFiles = { ...uploadedFiles };

    if (type === 'image' && typeof index === 'number' && newFiles.images) {
      newFiles.images = newFiles.images.filter((_, i) => i !== index);
      if (newFiles.images.length === 0) {
        delete newFiles.images;
      }
    } else if (type === 'video') {
      delete newFiles.video;
      setPreviewVideo(null);
    }

    setUploadedFiles(newFiles);
    onFileUpload(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
  };

  const truncateFileName = (name: string, maxLength = 20) => {
    if (name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const nameWithoutExt = name.substring(0, name.lastIndexOf('.'));
    const truncated = nameWithoutExt.substring(
      0,
      maxLength - extension!.length - 4
    );
    return `${truncated}...${extension}`;
  };

  const getImageUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  const handleVideoPreview = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewVideo(url);
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-700">
        Thêm hình ảnh/video
      </Label>

      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-all duration-200 cursor-pointer ${
          dragActive
            ? 'border-blue-400 bg-gradient-to-r from-blue-50 to-purple-50'
            : 'border-gray-300 hover:border-gray-400 bg-white/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-4 text-center">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*,video/*"
            multiple
            onChange={handleChange}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Upload className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs text-gray-600 mb-1 font-medium">
              Tải file lên
            </p>
            <p className="text-xs text-gray-400">Ảnh: 10MB | Video: 100MB</p>
          </label>
        </CardContent>
      </Card>

      {/* Uploaded Images Grid */}
      {uploadedFiles.images && uploadedFiles.images.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">
            Hình ảnh đã tải ({uploadedFiles.images.length})
          </Label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {uploadedFiles.images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={getImageUrl(image) || '/placeholder.svg'}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFile('image', index)}
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Video */}
      {uploadedFiles.video && (
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">
            Video đã tải
          </Label>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <VideoIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {truncateFileName(uploadedFiles.video.name, 25)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(uploadedFiles.video.size)}
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-1 bg-purple-100 text-purple-800 border-purple-200"
                  >
                    Video
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVideoPreview(uploadedFiles.video!)}
                  className="bg-white/50 border-white/20 hover:bg-white"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Xem
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFile('video')}
                  className="bg-red-500 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {previewVideo && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreviewVideo(null)}
        >
          <div
            className="relative max-w-4xl max-h-[80vh] bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={previewVideo}
              controls
              className="w-full h-full"
              autoPlay
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setPreviewVideo(null)}
              className="absolute top-4 right-4"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
