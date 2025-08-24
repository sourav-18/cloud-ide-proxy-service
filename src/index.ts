import dotenv from "dotenv";
dotenv.config();
import serverEnv from "./config/serverEnv.config";
const { createProxyMiddleware } = require('http-proxy-middleware');
import express, { Request, Response, NextFunction } from "express";


const app = express();


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        res.json({
            status: "error",
            responseCode: 500,
            message: "Invalid Request. Please check the request and try again.",
            data: null
        });
        return;
    }
    next();

});

app.use("/api/v1/repl", createProxyMiddleware({
    target: serverEnv.SERVICE_REPL + '/api/v1/repl',
    changeOrigin: true,
    secure: false,
}));

app.listen(serverEnv.SERVER_PORT, () => {
    console.log(`Proxy service is running on port ${serverEnv.SERVER_PORT}`);
});



