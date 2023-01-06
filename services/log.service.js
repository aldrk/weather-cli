import chalk from "chalk"
import dedent from "dedent-js"

const printError = (error) => {
  console.log(chalk.bgRed("ERROR")  + " " + error)
}

const printSuccess = (msg) => {
  console.log(chalk.bgGreen("SUCCESS")  + " " + msg)
}

const printHelp = () => {
  console.log(
    dedent`${chalk.bgBlue("Help")}
     Without args - print
     -s [CITY] - choose the city
     -h for print help
     -t [API_KEY] for save api key
    `)
}

const printWeather = (data) => {
  console.log(dedent(`${chalk.bgGreenBright("WEATHER")} Weather in ${data.name}
    ${data.weather[0].description}
    Temp is ${data.main.temp}
    It feels like ${data.main.feels_like}
    Humidity is ${data.main.humidity}%
    Wind change is ${data.wind.speed}
  `
  ))
}

export {printError, printSuccess, printHelp, printWeather}