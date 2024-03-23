import { Typography, Skeleton } from "@mui/joy";

export default function ProductTitle(props) {
  return (
    <Typography
      level="h4"
      gutterBottom
      textColor="#0D7377"
      margin="1rem"
      align="center"
      maxWidth="300px"
    >
      <Skeleton loading={props.loading}>{props.text}</Skeleton>
    </Typography>
  );
}
