const express = require('express')
const client = require('prom-client')
require('dotenv').config();

const app = express()

const restResponseTimeHistogram = new client.Histogram({
    name: "rest_response_time_duration_seconds",
    help: "REST API response time in seconds",
    labelNames: ["method", "route", "status_code"]
});

const startMetricsServer = () => {

    const collectDefaultMetrics = client.collectDefaultMetrics

    collectDefaultMetrics();

    app.get('/metrics', async (req, res) =>{
        res.set("Content-Type", client.register.contentType)
        return res.send(await client.register.metrics())
    })

    app.listen( process.env.PROM_PORT, () => {
        console.log('Servidor de metricas en el puerto', process.env.PROM_PORT);
    });
}

module.exports = {
    startMetricsServer,
    restResponseTimeHistogram
}