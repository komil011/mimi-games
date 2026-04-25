const compression = require("compression");
const express = require("express");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const root = __dirname;

app.use(compression());

function setCacheHeaders(res, filePath) {
  if (/\.(css|js|mjs|woff2?|ico|png|jpe?g|gif|webp|svg|mp3|mp4|webm|ogg)$/i.test(filePath)) {
    res.setHeader("Cache-Control", "public, max-age=604800");
  } else if (/\.html?$/i.test(filePath)) {
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  }
}

app.use(
  express.static(root, {
    extensions: ["html"],
    setHeaders: setCacheHeaders,
  })
);

app.get("/", (_req, res) => {
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  res.sendFile(path.join(root, "index.html"));
});

app.get("/health", (_req, res) => {
  res.status(200).type("text/plain").send("ok");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`IMI EduPlay listening on port ${PORT}`);
});
