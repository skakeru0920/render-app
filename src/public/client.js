window.addEventListener("load", () => {
  const pixelHost = document.getElementById("pixel-host");
  pixelHost.style.fontSize = "1pt";

  let syncTimestamp = 0;
  const grid = [];
  const gridWidth = 25;
  const gridHeight = 25;
  for (let i = 0; i < gridWidth; i++) {
    let col = [];
    for (let j = 0; j < gridHeight; j++) {
      col.push(null);
    }
    grid.push(col);
  }

  const sendApiRequest = async (req) => {
    let res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    let text = await res.text();
    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("Received this from server:", text);
      throw new Error("Server is down");
    }
  };

  const updatePixels = async () => {
    let syncResponse = await sendApiRequest({ command: "read", syncTimestamp });
    let delay = 3;
    if (syncResponse.ok) {
      syncResponse.updates.forEach(update => {
        let { x, y, filled } = update;
        let btn = grid[x][y].btn;
        setPixel(x, y, filled, false);
      });
      syncTimestamp = Math.max(syncResponse.syncTimestamp, syncTimestamp);
    } else {
      delay = 10;
    }
    setTimeout(updatePixels, delay * 1000);
  };

  const setPixel = (x, y, fill, sendUpdate) => {
    grid[x][y].btn.style.backgroundColor = fill ? "#000" : "#fff";
    grid[x][y].filled = fill;
    if (sendUpdate) {
      sendApiRequest({ command: "write", x, y, fill });
    }
  };

  for (let row = 0; row < 25; row++) {
    const rowDiv = document.createElement("div");

    for (let col = 0; col < 25; col++) {
      const btn = ((x, y) => {
        const btn = document.createElement("button");
        btn.style.width = "25px";
        btn.style.height = "25px";
        btn.style.borderWidth = "1px";
        btn.style.borderColor = "#ccc";
        btn.style.backgroundColor = "#fff";
        btn.addEventListener("click", () => {
          grid[x][y].filled = !grid[x][y].filled;
          setPixel(x, y, grid[x][y].filled, true);
        });
        return btn;
      })(col, row);
      grid[col][row] = {
        btn,
        filled: false,
      };
      rowDiv.append(btn);
    }
    pixelHost.append(rowDiv);
  }

  updatePixels();
});
