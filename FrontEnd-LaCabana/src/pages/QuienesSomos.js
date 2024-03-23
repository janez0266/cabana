import React from "react";
import { Stack, Typography } from "@mui/joy";
import NavBar from "../components/NavBar";
import SectionTitle from "../components/SectionTitle";
import InfoTitle from "../components/InfoTitle";
import FootpageInfo from "../components/FootpageInfo";
import InfoImage from "../components/InfoImage";
import "../App.css";

export default function QuienesSomos() {
  console.log(process.env.PUBLIC_URL);
  return (
    <React.Fragment>
      <NavBar />
      <SectionTitle text="¿Quiénes Somos?" />
      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        sx={{ margin: "2rem" }}
      >
        <InfoImage image={process.env.PUBLIC_URL + "/info2.jpg"} />
        <div>
          <InfoTitle text="Historia" loading={false} />
          <Typography level="body-lg">
            <ol className="numbered-list">
              <li>
                Lácteos La Cabaña C.A. es una empresa dedicada al desarrollo,
                fabricación y comercialización de productos lácteos. Fundada en
                1993 e inicio operaciones en la planta de Valencia en 1996.
              </li>
              <li>
                Los socios fundadores tienen una amplia formación profesional en
                el área de productos lácteos desarrollando su carrera en
                compañías trasnacionales en las áreas de Manufactura,
                Investigación y Desarrollo y aseguramiento de Calidad.
              </li>
              <li>
                El foco del negocio siempre ha estado dirigido a productos
                industriales, institucionales y comerciales, siendo el producto
                mas comercializado el Queso Cheddar Industrial. Con los años la
                empresa ha crecido en otras categorias y nichos de Mercado y ha
                colocado productos para el mercado de food service y para la
                venta directa al consumidor con productos de conveniencia como
                queso fundido y mezclas de polvo para preparar bebidas.
              </li>
              <li>
                Una amplia plantilla de productores de leche comprometidos con
                suministrarnos su mayor producto nos convierte en la planta
                productora de queso cheddar industrial mas grande del pais.
              </li>
            </ol>
          </Typography>
        </div>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={3}
        sx={{ margin: "2rem" }}
      >
        <div>
          <InfoTitle text="Visión" loading={false} />
          <Typography level="body-lg">
            Ser una empresa de productos alimenticios líder en el mercado y en
            continuo crecimiento que se distinga por proporcionar una calidad de
            servicio de excelencia a sus clientes y una gama de desarrollo
            profesional y personal a sus empleados, comprometida con un aporte
            positivo a la sociedad.
          </Typography>
        </div>
        <InfoImage image={process.env.PUBLIC_URL + "/info4.jpg"} />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={3}
        sx={{ margin: "2rem" }}
      >
        <InfoImage image={process.env.PUBLIC_URL + "/info5.jpeg"} />
        <div>
          <InfoTitle text="Misión" loading={false} />
          <Typography level="body-lg">
            Ofrecer productos de la más alta calidad utilizando las mejores
            materias primas, la más avanzada tecnología y un personal altamente
            calificado y comprometido en la satisfacción total del consumidor.
          </Typography>
        </div>
      </Stack>
      <InfoTitle text="Políticas de Calidad" loading={false} />
      <Typography level="body-lg" margin="2rem">
        Lácteos La Cabaña C.A. consciente de los efectos que tiene la calidad
        tanto para el crecimiento del negocio como para el prestigio de sus
        marcas comerciales asumimos el compromiso con nuestros clientes,
        consumidores y colaboradores, medio ambiente y demás partes interesadas
        a través de las siguientes Políticas:
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        sx={{ margin: "2rem" }}
      >
        <InfoImage image={process.env.PUBLIC_URL + "/info3.jpg"} />
        <div>
          <Typography level="body-lg">
            <ol className="numbered-list">
              <li>Calidad e Inocuidad</li>
              <li>Cumplir con las leyes y Requisitos</li>
              <li>Respeto al medio ambiente</li>
              <li>Seguridad en el trabajo</li>
              <li>Promover una cultura de mejora continua</li>
            </ol>
          </Typography>
        </div>
      </Stack>
      <FootpageInfo />
    </React.Fragment>
  );
}
