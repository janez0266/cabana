import { Typography, Skeleton } from "@mui/joy";

export default function InfoTitle(props) {
  return (
    <Typography
      level="h3"
      gutterBottom
      textColor="#0D7377"
      margin="2rem"
      align="center"
    >
      <Skeleton loading={props.loading}>{props.text}</Skeleton>
    </Typography>
  );
}
