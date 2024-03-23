import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

export default function PageTextField(props) {
  return (
    <FormControl sx={{ margin: "2rem" }}>
      <FormLabel style={{ color: "#0D7377" }}>{props.label}</FormLabel>
      <Input
        placeholder={props.placeholder}
        variant="outlined"
        sx={{ borderRadius: "100px", width: "100%" }}
        type={props.type}
        error={props.error}
        onChange={props.onChange}
      />
    </FormControl>
  );
}
