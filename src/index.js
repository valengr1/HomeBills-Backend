import express from "express";
import session from "express-session";
import monthRouter from "./routes/months.routes.js";
import registrosRouter from "./routes/registros.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import cors from "cors";

const app = express();
const port = 3000;

app.set("port", port);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // ⚠️ Debe ser false en desarrollo (HTTPS requiere true)
      httpOnly: true, // Previene acceso a la cookie desde JavaScript en el frontend
      sameSite: "lax", // Permite compartir cookies entre frontend y backend
      maxAge: 1000 * 60 * 60, // 1 hora
    },
  })
);
app.use(express.json());
app.use(monthRouter);
app.use(registrosRouter);
app.use(usuariosRouter);

app.listen(app.get("port"), () => {
  console.log("app listening on port:", app.get("port"));
});
