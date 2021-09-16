import { Platform } from "react-native";

let baseUrl;

{
  Platform.OS == "android"
    ? (baseUrl = "https://10.0.0.2:3000/api/v1/")
    : (baseUrl = "localhost:3000/api/v1/");
}

export default baseUrl;
