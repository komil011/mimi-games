const compression = require("compression");
const express = require("express");
const path = require("path");

const app = express();

app.use(compression());

function setCacheHeaders(res, filePath) {
  if (/\.(css|js|mjs|woff2?|ico|png|jpe?g|gif|webp|svg|mp3|mp4|webm|ogg)$/i.test(filePath)) {
    res.setHeader("Cache-Control", "public, max-age=604800");
    res.setHeader("Content-Type", getMimeType(filePath));
  } else if (/\.html?$/i.test(filePath)) {
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
  }
}

function getMimeType(filePath) {
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (filePath.endsWith('.json')) return 'application/json; charset=utf-8';
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.svg')) return 'image/svg+xml';
  if (filePath.endsWith('.png')) return 'image/png';
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg';
  if (filePath.endsWith('.gif')) return 'image/gif';
  if (filePath.endsWith('.webp')) return 'image/webp';
  if (filePath.endsWith('.ico')) return 'image/x-icon';
  return 'application/octet-stream';
}

const root = path.join(__dirname, '..');

app.use(
  express.static(root, {
    extensions: ["html"],
    setHeaders: setCacheHeaders,
    maxAge: "7d"
  })
);

app.get("/", (_req, res) => {
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.sendFile(path.join(root, "index.html"));
});

app.get("/health", (_req, res) => {
  res.status(200).type("text/plain").send("ok");
});

// Catch-all for any page requests
app.get("*", (_req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.sendFile(path.join(root, "index.html"));
});

module.exports = app;
