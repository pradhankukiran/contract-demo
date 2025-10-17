import { useCallback, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

export const FileUpload = ({ onFileSelect, selectedFile, onClear }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  if (selectedFile) {
    return (
      <div className="border-2 border-border p-6 bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-light flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <button
            onClick={onClear}
            className="p-2 hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      className={cn(
        "border-2 border-dashed p-12 text-center transition-all cursor-pointer",
        isDragOver 
          ? "border-primary bg-primary-light" 
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept=".pdf,.docx"
        onChange={handleFileInput}
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-primary-light flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground mb-1">
              Drop your contract here or click to upload
            </p>
            <p className="text-sm text-muted-foreground">
              Supports PDF and DOCX files
            </p>
          </div>
        </div>
      </label>
    </div>
  );
};
