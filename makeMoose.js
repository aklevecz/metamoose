const fs = require("fs");
const sharp = require("sharp");

const m = fs.readFileSync("./mooseline.svg");
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
for (let i = 0; i < 255; i++) {
  const svg = m
    .toString()
    .replace(
      "__COLOR__",
      `rgb(${randomIntFromInterval(0, 255)},${randomIntFromInterval(
        0,
        255
      )},${randomIntFromInterval(0, 255)})`
    );
  const svgBuffer = Buffer.from(svg);
  console.log(svgBuffer);
  sharp(svgBuffer)
    .png()
    .toFile("./meese/" + i + ".png")
    .then(function (info) {
      console.log(info);
    })
    .catch(function (err) {
      console.log(err);
    });
}
