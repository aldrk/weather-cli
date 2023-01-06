#!/usr/bin/env node
// for cli

import { getArgs } from "./helpers/args.js"
import { printError, printSuccess, printHelp, printWeather } from "./services/log.service.js"
import {getKeyValue, saveKeyValue} from "./services/storage.service.js"
import {getWeather} from "./services/api.service.js";

const saveApiKey = async (apiKey) => {
  if (!apiKey.length) {
    printError("no tokken")
    return
  }

  try {
    await saveKeyValue("apiKey", apiKey)
    printSuccess("API key saved")
  } catch (e) {
    printError(e.message)
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    printError("Incorrect city")
    return
  }

  try {
    await saveKeyValue("city", city)
    printSuccess("City saved")
  } catch (e) {
    printError(e.message)
  }
}

const getForecast = async () => {
  try {
    const weather = await getWeather("moscow")
    printWeather(weather)
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("Incorrect city")
    } else if (e?.response?.status == 401) {
      printError("Incorrect API key")
    } else {
      printError(e.message)
    }
  }
}

const initCli = () => {
  const args = getArgs(process.argv)

  if (args.h) {
    printHelp()
  }

  if (args.s) {
    return saveCity( args.s)
  }

  if (args.t) {
    return saveApiKey(args.t)
  }

  getForecast()
}

initCli()