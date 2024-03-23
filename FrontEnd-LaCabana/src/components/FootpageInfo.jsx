import "../App.css";
import Typography from "@mui/joy/Typography";
import Place from "@mui/icons-material/Place";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import Divider from "@mui/joy/Divider";

export default function FootpageInfo() {
  return (
    <div>
      <Divider
        sx={{
          backgroundColor: "#0D7377",
          margin: "1rem",
        }}
        variant="fullWidth"
      />
      <div className="footpage">
        <div>
          <Typography level="h4" gutterBottom textColor="#0D7377" margin="2rem">
            Planta y Oficinas Administrativas
          </Typography>
          <div className="footpageInfo">
            <Place sx={{ color: "#0D7377" }} fontSize="large" />
            <Typography level="h6" gutterBottom marginLeft="1rem">
              Zona Industrial La Florida - Calle Trébol No. 93 - A - 150,
              Valencia, Edo. Carabobo
            </Typography>
          </div>
          <div className="footpageInfo">
            <Phone sx={{ color: "#0D7377" }} fontSize="large" />
            <Typography level="h6" gutterBottom marginLeft="1rem">
              +58 241-8536610
            </Typography>
          </div>
          <div className="footpageInfo">
            <Email sx={{ color: "#0D7377" }} fontSize="large" />
            <Typography level="h6" gutterBottom marginLeft="1rem">
              contacto@lacteoslacabana.com
            </Typography>
          </div>
        </div>
        <div>
          <Typography level="h4" gutterBottom textColor="#0D7377" margin="2rem">
            Centro de Acopio de Leche
          </Typography>
          <div className="footpageInfo">
            <Place sx={{ color: "#0D7377" }} fontSize="large" />
            <Typography level="h6" gutterBottom marginLeft="1rem">
              Carretera Nacional Troncal 05, Sector Macagual, Miri, Municipio
              Antonio José de Sucre, Edo. Barinas
            </Typography>
          </div>
          <div className="footpageInfo">
            <Phone sx={{ color: "#0D7377" }} fontSize="large" />
            <Typography level="h6" gutterBottom marginLeft="1rem">
              +58 273-9270755
            </Typography>
          </div>
          <div className="footpageInfo">
            <Email sx={{ color: "#0D7377" }} fontSize="large" />
            <Typography level="h6" gutterBottom marginLeft="1rem">
              contacto@lacteoslacabana.com
            </Typography>
          </div>
        </div>
      </div>
      <Divider
        sx={{
          backgroundColor: "#0D7377",
          height: "0.15rem",
          margin: "1rem",
        }}
        variant="fullWidth"
      />
      <Typography level="h6" textAlign="center" margin="0.5rem">
        Lácteos La Cabaña C.A, R.I.F. J-301233808
      </Typography>
    </div>
  );
}
