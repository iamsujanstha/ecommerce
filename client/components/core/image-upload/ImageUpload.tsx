import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import React, { useRef } from 'react';

interface ImageUploadProps {
  uploadFile: File | null;
  setUploadFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ uploadFile, setUploadFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setUploadFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setUploadFile(droppedFile);
  }

  const handleRemove = () => {
    setUploadFile(null);
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <Label className='text-lg font-semibold my-2 block'>Upload Image</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed py-4 rounded-md'>
        <Input type='file' id='image-upload' className='hidden' ref={inputRef} onChange={handleFileChange} />
        {!uploadFile ?
          <Label htmlFor='image-upload' className='flex items-center flex-col'>
            <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-3' />
            <span>Drag & Drop or click to upload image</span>
          </Label>
          :
          <div className='flex justify-between items-center mx-2'>
            <div className='flex gap-2 flex-wrap'>
              <FileIcon />
              <p>{uploadFile.name}</p>
            </div>
            <Button className='text-muted-foreground hover:text-foreground' variant='ghost' size='icon' onClick={handleRemove}>
              <XIcon className='w-4 h-4' />
              <span className='sr-only'>Remove File</span>
            </Button>
          </div>
        }
      </div>
    </div>
  );
};

export default ImageUpload;
