function enterSite(){
  let modal = document.querySelector(".instructions-modal-container")
  modal.parentElement.removeChild(modal)
}

export default function activateEnterButton(){
  let enterButton = document.getElementById("enter-button")
  enterButton.addEventListener("click", enterSite)
}

