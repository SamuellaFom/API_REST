import express from "express";
import authenticateJWT from "../middlewares/authenticateJWT";
import { getToken, justifyText } from "../controllers/index_controller";

const RouteText = express();

RouteText.post("/api/token", getToken);
RouteText.post("/api/justify", authenticateJWT, justifyText);

export default RouteText;
