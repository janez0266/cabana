import React from "react";
import { Button, styled, Typography } from "@mui/joy";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function PageUploadButton(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      props.onFileChange(file);
    } else {
      setSelectedFile(null);
      props.selectedFile(null);
      console.log("Invalid file type. Please select a PDF file.");
    }
  };

  return (
    <React.Fragment>
      <Button
        sx={{
          color: "#fff",
          backgroundColor: "#0D7377",
          borderRadius: "0",
          margin: "1rem",
          padding: "0.5rem 3rem",
          "&:hover": { backgroundColor: "#199183" },
          "&:active": { backgroundColor: "#45AE85" },
        }}
        size="lg"
        component="label"
      >
        {props.text}
        <VisuallyHiddenInput
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </Button>
      {selectedFile && (
        <Typography variant="body2" fontStyle="italic" marginTop="0.5rem">
          {selectedFile.name}
        </Typography>
      )}
    </React.Fragment>
  );
}
