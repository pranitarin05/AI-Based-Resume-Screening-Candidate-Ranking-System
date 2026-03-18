import React, { useCallback, useState } from 'react';
import { UploadCloud, File, X, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export function FileUpload({ onUpload, isProcessing }) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  }, []);

  const handleFiles = (newFiles) => {
    // Basic validation to only accept pdf and docx
    const validFiles = newFiles.filter(file => 
      file.type === 'application/pdf' || 
      file.name.endsWith('.pdf') || 
      file.name.endsWith('.docx')
    );
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length > 0) {
      onUpload(files);
      setFiles([]); // clear after sending
    }
  };

  return (
    <div className="w-full">
      <div 
        className={cn(
          "relative flex flex-col items-center justify-center w-full min-h-64 p-6 border-2 border-dashed rounded-xl transition-colors duration-200",
          dragActive ? "border-blue-500 bg-blue-500/10" : "border-gray-700 hover:border-gray-500 bg-gray-900/50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          multiple 
          accept=".pdf,.docx" 
          onChange={handleChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          disabled={isProcessing}
        />
        
        <div className="flex flex-col items-center justify-center text-center space-y-4 pointer-events-none">
          <div className="p-4 bg-gray-800 rounded-full">
            <UploadCloud className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-200">Drag & Drop Resumes Here</p>
            <p className="text-sm text-gray-400 mt-1">or click to browse from your computer</p>
            <p className="text-xs text-gray-500 mt-2">Supports multiple files (PDF, DOCX)</p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 flex flex-col space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Selected Files ({files.length})</h4>
          <div className="max-h-60 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-900 border border-gray-800 rounded-lg">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <File className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-200 truncate">{file.name}</span>
                </div>
                <button 
                  onClick={() => removeFile(idx)}
                  className="text-gray-500 hover:text-red-400 transition-colors"
                  disabled={isProcessing}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white" 
            onClick={handleSubmit}
            loading={isProcessing}
          >
            {isProcessing ? "Analyzing Resumes..." : `Analyze ${files.length} Resumes`}
          </Button>
        </div>
      )}
    </div>
  );
}
