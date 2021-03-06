export function removeCharts(){
  d3.select("#second").selectAll('.body').remove()
  d3.select("#second").selectAll('.wick').remove()
  d3.select("#second").selectAll('g').remove()
  d3.select("#second").selectAll('text').remove()
}


export function removeOverview(){
  let overview = document.getElementsByClassName("charts-overview")
  if (overview.length > 0){
    overview[0].parentElement.removeChild(overview[0])  
  } 
}

export function removeInstructions(){
  let instructions = document.getElementsByClassName("charts-instructions")
  if (instructions.length > 0){
    instructions[0].parentElement.removeChild(instructions[0])  
  }
}

export function removeSelectedTab(){
  let tabs = Array.from(document.querySelectorAll(".chart-tab"))
  tabs.push(document.querySelector(".directions-tab"))
  tabs.forEach(tab=>{tab.classList.remove("selected")})
}