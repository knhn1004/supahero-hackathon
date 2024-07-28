"use client";

import { useFile } from "@/hooks/supabase";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone() {
  const { file, setFile, uploadFile } = useFile();
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div>
      <div className="h-60 w-60 border-2 border-black" {...getRootProps()}>
        <input {...getInputProps()} />
        {file?.name ? (
          <div>{file.name}</div>
        ) : isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <button className="border-2 border-black" onClick={uploadFile}>
        submit
      </button>
    </div>
  );
}
