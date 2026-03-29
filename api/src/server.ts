import express from "express"

import { routes } from "./routes"
import { errorHandling } from "./middlewares/error-handling"

const PORT = 3333
const app = express()

app.use(express.json())
app.use(routes)

app.use(errorHandling)

// No final do seu server.ts, apague o if e coloque assim:

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

export default app
