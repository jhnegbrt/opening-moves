const axios = require('axios');

export async function getNews(ticker){


  let token = "c23h2raad3ieeb1lcqf0"
  let to = createDateString(Date.now())
  let from = createDateString(Date.now() - 604800000)
  let query = `&symbol=${ticker}&from=${from}&to=${to}&token=${token}`
  let news = await axios.get(`/news?${query}`)
  return news

}

export function renderNews(newsBits){
  let newsContainer = document.createElement("div")
  newsContainer.setAttribute("id", "news-container")
  // let newsImageContainer = document.createElement("div")
  // newsImageContainer.classList.add("news-image-container")
  // newsContainer.appendChild(newsImageContainer)
  let modal = document.getElementsByClassName("loading-modal")[0]
  modal.appendChild(newsContainer)
  let i = 0;
  switchNews(newsBits, i)
  let modalInterval = setInterval(function(){
    if (i > 3){
      i = 0
    } else if (i < 4){
      i++
    }
    switchNews(newsBits, i)
  },5500)
  return modalInterval
}




function switchNews(newsBits, i){
  let oldNews = document.getElementsByClassName("news-block")
  if (oldNews.length > 0){
    oldNews[0].parentElement.removeChild(oldNews[0])
  }
  let newsImg = document.createElement("img")
  if (newsBits[i].image === ""){
    newsImg.setAttribute("src", "../../images/image-unavailable.jpg")
    newsImg.classList.add("news-image-unavail")
  } else {
    newsImg.setAttribute("src", newsBits[i].image)
    newsImg.classList.add("news-image-avail")
  }
  newsImg.classList.add("news-image")
  let newsBlock = document.createElement("div")
  let news = document.createElement("div")
  news.classList.add("news-snippet")
  let newsHeadline = document.createElement("p")
  let processedText = processText(newsBits[i].headline)
  let newsHeadlineText = document.createTextNode(processedText)
  newsHeadline.appendChild(newsHeadlineText)
  let newsLink = document.createElement("a")
  let newsLinkText = document.createTextNode("Click for full story")
  newsLink.appendChild(newsLinkText)
  newsLink.setAttribute("href", newsBits[i].url)
  newsLink.setAttribute("target", "_blank")
  newsLink.setAttribute("SameSite", "Lax")
  let newsLinkAuthor = document.createElement("p")
  let newsLinkAuthorText = document.createTextNode("-" + newsBits[i].source)
  newsLinkAuthor.appendChild(newsLinkAuthorText)
  newsBlock.classList.add("news-block")
  news.appendChild(newsHeadline)
  news.appendChild(newsLinkAuthor)
  news.appendChild(newsLink)
  newsBlock.appendChild(newsImg)
  newsBlock.appendChild(news)
  let newsContainer = document.getElementById("news-container")
  newsContainer.appendChild(newsBlock)
}


function processText(text){
  text = text.replace(/;(?=[^\s])/g, ", ")
  return text
}

function createDateString(unix){

  let date = new Date(unix)
  let yyyy = date.getFullYear()
  let mm = ('0' + (date.getMonth() + 1)).slice(-2)
  let dd = ('0' + date.getDate()).slice(-2)
  return yyyy + "-" + mm + "-" + dd

}