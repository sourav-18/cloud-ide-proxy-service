import dotenv from "dotenv";
dotenv.config();
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

app.use("/api/v1/repel", createProxyMiddleware({
    target: process.env.SERVICE_REPEL + '/auth',
    changeOrigin: true,
    secure: false,
}));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Proxy service is running on port ${process.env.SERVER_PORT}`);
});


