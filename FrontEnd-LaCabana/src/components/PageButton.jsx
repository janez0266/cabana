import Button from "@mui/joy/Button";

export default function PageButton(props) {
  return (
    <Button
      sx={{
        color: "#fff",
        backgroundColor: "#0D7377",
        borderRadius: "0",
        margin: "1rem",
        padding: "1.5rem 3rem",
        "&:hover": { backgroundColor: "#199183" },
        "&:active": { backgroundColor: "#45AE85" },
      }}
      size="lg"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
}
