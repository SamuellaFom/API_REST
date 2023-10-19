import RouteText from "./routers/index_router";

const express = require('express')
const app = express()
const port = 3000


app.get('/', (req: any, res: any) => {
  res.send('Hello World');
});
app.use(express.text());
app.use('/', RouteText);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});