const express = require("express");
const db = require("./db");
const readPixelHandler = require("./handlers/readPixels");
const writePixelHandler = require("./handlers/writePixels");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use("/", express.static(__dirname + "/public"));

app.post("/api", async (req, res) => {
  switch (`${req.body.command}`) {
    case "read": res.json(await readPixelHandler(db, req.body)); break;
    case "write": res.json(await writePixelHandler(db, req.body)); break;
    default:
      res.json({ ok: false, msg: "Unknown command: " + command});
      break;
  }
});

app.listen(PORT, () => {
  console.log(`Is your server running? Well, you better go catch it, then! http://localhost:${PORT}`);
});
