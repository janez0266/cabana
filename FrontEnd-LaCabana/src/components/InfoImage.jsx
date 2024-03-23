export default function InfoImage(props) {
  return (
    <img
      src={props.image}
      alt={props.alt}
      style={{
        height: "auto",
        width: "40%",

        borderRadius: "10px",
      }}
    />
  );
}
