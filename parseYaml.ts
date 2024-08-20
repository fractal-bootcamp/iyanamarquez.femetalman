import yaml from "js-yaml";
import fs from "fs";
import path from "path";

// Define custom types for handling specific YAML tags
const vector3Type = new yaml.Type("!geometry_msgs/Vector3", {
  kind: "mapping",
  construct: (data) => ({
    x: data.x,
    y: data.y,
    z: data.z,
  }),
});

const poseStampedType = new yaml.Type("!geometry_msgs/PoseStamped", {
  kind: "mapping",
  construct: (data) => ({
    header: data.header,
    pose: data.pose,
  }),
});

// Load YAML file with custom types
function loadYamlFile(filePath: string): any {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const customSchema = yaml.DEFAULT_SCHEMA.extend([
      vector3Type,
      poseStampedType,
    ]);
    const data = yaml.load(fileContents, { schema: customSchema });
    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

// Use the parsed data
const config = loadYamlFile("tool.yaml");

let data;
if (config) {
  // console.log("Config:", config);
  data = config;
}

console.log("data is", data);
export default data;
