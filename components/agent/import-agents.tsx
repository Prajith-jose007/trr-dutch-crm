"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Download, UserPlus, FileUp } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export function ImportAgents() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type === "text/csv") {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file.",
          variant: "destructive",
        });
        setFile(null);
      }
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/csv") {
      setFile(droppedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      setFile(null);
    }
  };


  const handleImport = () => {
    if (!file) return;
    setIsUploading(true);

    // Simulate API call for upload
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Import Successful",
        description: `${file.name} has been imported and agents have been added.`,
      });
      setFile(null);
    }, 2000);
  };
  
  const createSampleCSV = () => {
    const header = "FirstName,LastName,Email,PhoneNumber\n";
    const row1 = "John,Doe,john.doe@example.com,123-456-7890\n";
    const row2 = "Jane,Smith,jane.smith@example.com,987-654-3210\n";
    const csvContent = header + row1 + row2;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "sample-agents.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Toaster />
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <UserPlus className="h-6 w-6" />
                Import Agents
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Upload a CSV file to bulk-add new agents.</p>
            </div>
            <Button onClick={createSampleCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Sample CSV
            </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Upload Agent Data</CardTitle>
            <CardDescription>Select a CSV file to import. Ensure it matches the required format.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 'border-gray-300 dark:border-gray-600'}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <FileUp className="h-12 w-12 text-gray-400" />
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400">
                    <label htmlFor="file-upload" className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                      Click to upload
                    </label>
                    {" "}or drag and drop your CSV file here.
                  </p>
                  <Input id="file-upload" type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                  <p className="text-xs text-gray-500 dark:text-gray-500">Maximum file size: 5MB</p>
                </div>
              </div>
            </div>
            {file && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-gray-500" />
                      <div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{file.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setFile(null)}>Remove</Button>
              </div>
            )}
             <div className="flex justify-end">
                <Button onClick={handleImport} disabled={!file || isUploading}>
                  {isUploading ? "Importing..." : "Import Agents"}
                </Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
