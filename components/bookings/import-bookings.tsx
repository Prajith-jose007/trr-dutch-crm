
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Download, UserPlus, FileUp, Users, BookMarked } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Booking {
  [key: string]: string;
}

export function ImportBookings() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const { toast: showToast } = useToast();


  const resetState = () => {
    setFile(null);
    setBookings([]);
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
                }, {} as Booking);
            });
            setBookings(dataRows);
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
    if (!file || bookings.length === 0) return;
    setIsUploading(true);

    try {
      const response = await fetch('/api/bookings/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookings }),
      });

      if (!response.ok) {
        throw new Error('Failed to import bookings');
      }

      const result = await response.json();
      
      showToast({
        title: "Import Successful",
        description: `${result.importedCount} bookings from ${file.name} have been added.`,
      });
      resetState();

    } catch (error) {
      showToast({
        title: "Import Failed",
        description: "An error occurred while importing the bookings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const createSampleCSV = () => {
    const header = "BookingDate,ClientName,ClientPhone,AgentName,YachtPackageID,PaymentMode,TicketRef,TotalAmount,Discount,NetAmount,Commission,Notes,DinnerChildQty,DinnerAdultQty,DinnerAdultAlcQty,TopDeckChildQty,TopDeckAdultQty,VipChildQty,VipAdultQty,VipAdultAlcQty,RoyalChildQty,RoyalAdultQty,RoyalAdultAlcQty,Status,PaymentStatus\n";
    const row1 = "2024-09-18,Test Client,+971501234567,John Doe,PKG-001,Credit Card,TKT-123,598,0,598,0,Test booking,0,2,0,0,0,0,0,0,0,0,0,confirmed,paid\n";
    const csvContent = header + row1;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "sample-bookings.csv");
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
                <BookMarked className="h-6 w-6" />
                Import Bookings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Upload a CSV file to bulk-add new bookings.</p>
            </div>
            <Button onClick={createSampleCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Sample CSV
            </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Upload Booking Data</CardTitle>
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

        {bookings.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Bookings to be Imported
                    </CardTitle>
                    <CardDescription>Review the bookings from the uploaded CSV file before importing.</CardDescription>
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
                                {bookings.map((booking, index) => (
                                    <TableRow key={index}>
                                        {headers.map((header) => (
                                            <TableCell key={header}>{booking[header]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex justify-end mt-6">
                        <Button onClick={handleImport} disabled={!file || isUploading}>
                          {isUploading ? "Importing..." : `Import ${bookings.length} Bookings`}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )}
      </div>
    </>
  );
}
