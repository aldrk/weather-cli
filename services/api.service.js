// import https from "https";
import  {getKeyValue} from "./storage.service.js"
import axios from "axios";


const getWeather = async () => {
  const apiKey = await getKeyValue("apiKey")
  const city = await getKeyValue("city")

  if (!apiKey) {
    throw new Error("No API key")
  }

  if (!city) {
    throw new Error("No city")
  }

  const {data} = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city,
        appid: apiKey,
        lang: "ru",
        units: "metrics"
      }
    }
  )

  return data
  // const url = new URL("https://api.openweathermap.org/data/2.5/weather")
  // url.searchParams.append("q", city)
  // url.searchParams.append("appid", apiKey)
  // url.searchParams.append("lang", "ru")
  // url.searchParams.append("units", "metrics")
  //
  // await https.get(url, (response) => {
  //   let res = ""
  //
  //   response.on("data", chunk => res += chunk)
  //
  //   response.on("end", () => {
  //     console.log(res)
  //   })
  // })
}

export {getWeather}