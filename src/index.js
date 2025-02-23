import express from "express";
import monthRouter from "./routes/months.routes.js";
import registrosRouter from "./routes/registros.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import cors from "cors";

const app = express();
const port = 3000;
var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.set("port", port);

app.use(express.json());
app.use(cors(corsOptions));
app.use(monthRouter);
app.use(registrosRouter);
app.use(usuariosRouter);

app.listen(app.get("port"), () => {
  console.log("app listening on port:", app.get("port"));
});
