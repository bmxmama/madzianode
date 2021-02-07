import app from "./createApp";

app.listen(process.env.PORT, () =>
  console.log(`API listening on port ${process.env.PORT}`)
);
