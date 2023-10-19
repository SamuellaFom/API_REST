import express from 'express'
import { getToken, justifyText} from '../controllers/index_controller'

const RouteText = express()

RouteText.post('/api/token', getToken);
RouteText.post('/api/justify', justifyText);

export default RouteText;