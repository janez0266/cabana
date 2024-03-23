import Textarea from "@mui/joy/Textarea";

export default function PageTextArea(props) {
  return (
    <Textarea
      minRows={10}
      sx={{ width: "100%", margin: "2rem auto" }}
      onChange={props.onChange}
    />
  );
}
