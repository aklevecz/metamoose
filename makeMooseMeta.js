const fs = require("fs");
const template = require("./metaTemplate");
for (let i = 1; i < 255; i++) {
  const newTemplate = (newjsonobj = Object.assign({}, template, {}));
  newTemplate.image = newTemplate.image.replace("__ID__", i);
  fs.writeFileSync("./meese_meta/" + i + ".json", JSON.stringify(newTemplate));
}
