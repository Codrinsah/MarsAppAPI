import express = require("express");
import axios = require("axios");

const app = express();
const port = 8000;
export const API_KEY = "gUd2reuXtHMoniTWhimRu03A25snbsiEOhnygXND"

app.use(express.json());
import { router } from "./router";

app.use("/", router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});