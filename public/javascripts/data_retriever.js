const axios = require('axios');

async function query(queryString, from, to){

  let token = "c23h2raad3ieeb1lcqf0"
  let query = queryString.concat(`&from=${from}&to=${to}&token=${token}`)
  debugger
  let response = await axios.get(`/search?${query}`)
  .then((response) => {
    return(response.data)
  })
  .catch(error => {
    return(error) 
  })
  return response
}

export default async function retrieveData(ticker, dataRange) {
    
    let symbol = ticker
    let resolution = "5"
    let to = Math.floor(Date.now() / 1000)
    let from = Math.floor(Date.now() / 1000) - 2505600
    let queryString = `symbol=${symbol}&resolution=${resolution}`

    if (dataRange === "3m"){
      let results = {}
      for(let i = 0; i < 3; i++){
        let queryResult = query(queryString, from, to)
        for (const key in queryResult){
          results[key] = results[key].concat(queryResult[key])
        }
        to -= 2505600
        from -= 2505600
      }
    } else if (dataRange === "6m"){




    } else if (dataRange === "1y"){




    } else if (dataRange === "5y"){
  



    }

    



}

