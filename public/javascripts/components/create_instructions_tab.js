import renderInstructions from './render_instructions'

export default function createInstructionsTab(){

  let tab = document.createElement("li")
  tab.classList.add("directions-tab")
  let instructionsText = document.createTextNode("Instructions")
  tab.appendChild(instructionsText)
  tab.addEventListener("click", renderInstructions)
  let chartTabs = document.getElementById("chart-tabs")
  chartTabs.appendChild(tab)

}