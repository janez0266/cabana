import * as React from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";

export default function PageAlert(props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Alert color={props.color}>{props.text}</Alert>
    </Box>
  );
}
