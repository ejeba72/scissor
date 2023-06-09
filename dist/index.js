"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const dev_route_1 = require("./routes/dev.route");
const url_route_1 = require("./routes/url.route");
const redirect_route_1 = require("./routes/redirect.route");
const connect_db_1 = require("./db/connect.db");
const users_route_1 = require("./routes/users.route");
(0, dotenv_1.config)();
(0, connect_db_1.mongodb)();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const apiV1 = '/api/v1';
app.use(express_1.default.json());
app.use(`${apiV1}/dev`, dev_route_1.devRoute); // for dev purpose only
app.use(`${apiV1}`, url_route_1.urlRoute);
app.use(`/`, redirect_route_1.redirectRoute);
app.use(`${apiV1}/user`, users_route_1.userRoute);
app.listen(PORT, () => {
    console.log(`App is attentively listening for incoming requests @ http://127.0.0.1:${PORT}`);
});
