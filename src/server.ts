import express = require("express");
import { port } from "./config"

const app = express();

app.use(express.json());
import { router } from "./router";

app.use("/", router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});