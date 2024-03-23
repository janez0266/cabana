import express from "express";
import multer from "multer";
import { UserServices } from "./classes/services/userServices.js";
import { ProductServices } from "./classes/services/productServices.js";
import { ExtraServices } from "./classes/services/extraServices.js";
import { Token } from "./classes/token.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const allowedOrigins = ["http://localhost:3001"];
let server;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      // if (allowedOrigins.indexOf(origin) === -1) {
      //   const msg =
      //     "The CORS policy for this site does not allow access from the specified origin.";
      //   return callback(new Error(msg), false);
      // }
      return callback(null, true);
    },
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

// GET endpoint to retrieve the open order of a user
app.get("/users/orders/open", Token.verifyToken, async (req, res) => {
  try {
    const { userId } = req;
    const openOrder = await UserServices.getUserOpenOrder(userId);
    res.status(200).json(openOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT endpoint to change the status of an order
app.put("/orders/:orderId/status", Token.verifyToken, async (req, res) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await UserServices.changeOrderStatus(orderId);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/orders/:orderId/update", Token.verifyToken, async (req, res) => {
  const { orderId } = req.params;
  const { presentations } = req.body;
  try {
    const updatedOrder = await UserServices.updateOrder(orderId, presentations);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete(
  "/orders/:orderId/removeProduct",
  Token.verifyToken,
  async (req, res) => {
    const { orderId } = req.params;
    const { presentationId } = req.body;
    try {
      const updatedOrder = await UserServices.removeProductFromOrder(
        orderId,
        presentationId
      );
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// POST endpoint to send a contact message
app.post("/contact", async (req, res) => {
  const { message, reason, email } = req.body;
  try {
    const newContact = await UserServices.sendContactMessage(
      message,
      reason,
      email
    );
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST endpoint to send an application
app.post("/applications", upload.single("cv"), async (req, res) => {
  const { nombre, apellido, correo_electronico, cedula, mensaje } = req.body;
  const cvPath = req.file ? req.file.path : null;
  try {
    await UserServices.sendApplication(
      nombre,
      apellido,
      correo_electronico,
      cedula,
      mensaje,
      cvPath
    );
    res.status(201).json({ message: "Application sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST endpoint for user sign-in
app.post("/users/sign-in", async (req, res) => {
  const { password, identificationNumber, name, email } = req.body;
  if (!email || !password || !identificationNumber || !name) {
    return res.status(400).json({ error: "Missing required field" });
  }
  try {
    const user = await UserServices.signIn(
      password,
      identificationNumber,
      name,
      email
    );
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST endpoint for user authentication (login)
app.post("/users/authenticate", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserServices.logIn(password, email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET endpoint to retrieve all products
app.get("/products", async (req, res) => {
  try {
    const products = await ProductServices.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET endpoint to retrieve products by category
app.get("/products/by-category", async (req, res) => {
  try {
    const productsByCategory = await ProductServices.getProductsByCategory();
    res.status(200).json(productsByCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/products/:productId/image", async (req, res) => {
  const { productId } = req.params;
  try {
    const productImage = await ProductServices.getProductImage(productId);
    res.status(200).json(productImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/products/presentations/:presentationId", async (req, res) => {
  const { presentationId } = req.params;
  try {
    const presentation = await ProductServices.getPresentationImage(
      presentationId
    );
    res.status(200).json(presentation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/products/presentations", async (req, res) => {
  try {
    const presentations =
      await ProductServices.getAllProductsAndPresentations();
    res.status(200).json(presentations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/products/:productId/presentations", async (req, res) => {
  const { productId } = req.params;
  try {
    const presentations = await ProductServices.getProductPresentations(
      productId
    );
    res.status(200).json(presentations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET endpoint to retrieve dollar rate
app.get("/dollar-rate", async (req, res) => {
  try {
    const dollarRate = await ExtraServices.getDollarRate();
    res.status(200).json(dollarRate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

function startServer() {
  const port = process.env.PORT || 3002;
  server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

if (process.env.NODE_ENV !== "test") {
  // Start the server immediately in non-test environments
  startServer();
} else {
  // Delay the start of the server in test environments
  server = app.listen(0, () => {
    // Set the PORT environment variable to the randomly assigned port number
    process.env.PORT = server.address().port;
    console.log(`Test server listening on port ${process.env.PORT}`);
    server.close(() => {
      // Start the server with the correct port number after the PORT environment variable has been set
      startServer();
    });
  });
}

process.on("SIGINT", () => {
  console.log("Stopping server...");
  server.close(() => {
    console.log("Server stopped.");
    process.exit(0);
  });
});

export { app, server };
