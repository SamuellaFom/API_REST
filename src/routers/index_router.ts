import express from 'express'
import getToken from '../controllers/index_controller'

const RouteText = express()

RouteText.post('/api/token', getToken);
RouteText.post('/api/justify');

export default RouteText;