"use client";

import { useFile } from "@/hooks/supabase";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

export default function Dropzone() {
  const { file, setFile, uploadFile } = useFile();
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="flex flex-col">
      <div
        className="flex justify-center h-40 w-120 border-2 border-dotted border-black bg-blue-300 hover:bg-blue-400 rounded-3xl p-10 mb-3"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {file?.name ? (
          <div>{file.name}</div>
        ) : isDragActive ? (
          <p className="text-lg w-[300px] text-center">
            Drop the files here ...
          </p>
        ) : (
          <p className="text-lg w-[300px] text-center">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
      <Button variant="default" onClick={uploadFile}>
        Submit
      </Button>
    </div>
  );
}
