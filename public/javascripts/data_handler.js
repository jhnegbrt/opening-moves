export function convertData(data){

  let candles = {};

  //put each candle together
  for(let i = 0; i < data["c"].length; i++){

    candles[data["t"][i]] = {
      c: data["c"][i],
      h: data["h"][i],
      l: data["l"][i],
      o: data["o"][i],
      t: data["t"][i],
      v: data["v"][i]
    }
  }

  return candles

}

export function filterData(candles){

  let openingCandles = selectOpeningCandles(candles)
  debugger
  let filteredCandles = selectVolatileCandles(openingCandles)
  return filteredCandles

}

function selectOpeningCandles(candles){

  let openingCandles = {}

  for(const candle in candles){
    var date = new Date(candle * 1000)
    var convertedTime = date.toLocaleTimeString("en-US", {timeZone: "America/New_York"})
    console.log(date)
    if (convertedTime === "9:30:00 AM"){
      
      openingCandles[candle] = candles[candle]
    }
  }
  return openingCandles
}

function selectVolatileCandles(openingCandles){

}
