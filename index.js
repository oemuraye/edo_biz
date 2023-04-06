import express from "express";
import dotenv from "dotenv";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import cors from "cors";

import routes from "./routes/routes.js";

const app = express();
dotenv.config();
app.use(cors());

// Enable body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static("public"));

app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Welcome...");
// });

app.use("/", routes);

app.listen(PORT, () => {
  console.log(` server started on port http://localhost:${PORT} `);
});
