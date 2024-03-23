import { Typography } from "@mui/joy";

export default function SectionTitle(props) {
  return (
    <Typography
      level="h1"
      gutterBottom
      textColor="#0D7377"
      margin="2rem"
      align="center"
    >
      {props.text}
    </Typography>
  );
}
