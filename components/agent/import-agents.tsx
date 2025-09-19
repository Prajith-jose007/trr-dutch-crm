
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Download, UserPlus, FileUp, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "../ui/badge";

interface Agent {
  [key: string]: string;
}

export function ImportAgents() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const { toast: showToast } = useToast();


  const resetState = () => {
    setFile(null);
    setAgents([]);
    setHeaders([]);
  };
  
  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target?.result as string;
        const rows = text.split('\n').filter(row => row.trim() !== '');
        if (rows.length > 0) {
            const headerRow = rows[0].split(',').map(h => h.trim());
            setHeaders(headerRow);

            const dataRows = rows.slice(1).map(row => {
                const values = row.split(',').map(v => v.trim());
                return headerRow.reduce((obj, header, index) => {
                    obj[header] = values[index] || "";
                    return obj;
                }, {} as Agent);
            }).filter(agent => agent.Email && agent.Email.trim() !== "" && agent.Email.includes('@')); // Filter out rows with no valid email
            
            setAgents(dataRows);
        }
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type === "text/csv") {
        setFile(selectedFile);
        parseCSV(selectedFile);
      } else {
        showToast({
          title: "Invalid file type",
          description: "Please upload a CSV file.",
          variant: "destructive",
        });
        resetState();
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
      parseCSV(droppedFile);
    } else {
      showToast({
        title: "Invalid file type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      resetState();
    }
  };


  const handleImport = async () => {
    if (!file || agents.length === 0) return;
    setIsUploading(true);

    try {
      const response = await fetch('/api/agents/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agents }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to import agents');
      }

      const result = await response.json();
      
      showToast({
        title: "Import Successful",
        description: `${result.importedCount} agents from ${file.name} have been added.`,
      });
      resetState();

    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      showToast({
        title: "Import Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const createSampleCSV = () => {
    const header = "Name,Address,Email,Phone,TRNNumber,CustomerTypeID,Discount\n";
    const row1 = "John Doe,123 Main St,john.doe@example.com,123-456-7890,123456789,1,10\n";
    const row2 = "Jane Smith,456 Oak Ave,jane.smith@example.com,987-654-3210,987654321,2,5\n";
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
                  <Button variant="ghost" size="sm" onClick={() => resetState()}>Remove</Button>
              </div>
            )}
            
          </CardContent>
        </Card>

        {agents.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Agents to be Imported
                    </CardTitle>
                    <CardDescription>Review the agents from the uploaded CSV file before importing.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {headers.map((header) => (
                                        <TableHead key={header}>{header}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agents.map((agent, index) => (
                                    <TableRow key={index}>
                                        {headers.map((header) => (
                                            <TableCell key={header}>{agent[header]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex justify-end mt-6">
                        <Button onClick={handleImport} disabled={!file || isUploading}>
                          {isUploading ? "Importing..." : `Import ${agents.length} Agents`}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )}
      </div>
    </>
  );
}
