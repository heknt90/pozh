import { data } from "./data"


const state = {
  jobTitle: undefined,
  ticketNumber: undefined,
  withGDZS: false
}

window.getState = () => state
window.setState = setState

function setState(newState) {
  for (let item in newState) {
    state[item] = newState[item]
  }
}

const headers = {
  driver: "Билеты для водителей",
  commander: "Билеты для командиров",
  fireman: "Билеты для пожарных",
  withGDZS: " с вопросами по ГДЗС",
  withoutGDZS: " без вопросов по ГДЗС",
}

const emptyTicketTitle = "Выберите номер билета."
// const emptyTicketTitle = "Выберите номер билета выше."

// Global variable (refactoring requre)
let ticketsData

for (let button of document.querySelectorAll('[data-job]')) {
  button.addEventListener('click', jobChoiseButtonHandler)
}
for (let button of document.querySelectorAll('[data-gdzs]')) {
  button.addEventListener("click", gdzsChoiseButtonHandler)
}
document.querySelector("#screenTicketChoice").addEventListener("click", ticketChoiseButtonHandler)

function jobChoiseButtonHandler(event) {
  const dataJob = event.target.dataset.job
  if (state["jobTitle"] != dataJob) {
    setState({ jobTitle: dataJob })
    let key = state["jobTitle"] + "sData"
    if (dataJob !== "driver") {
      setState({ withGDZS: true })
      screenGdzs.classList.remove("visually-hidden")
      key += "WithGDZS"
      gdzsWith.focus()
    } else if (!screenGdzs.classList.contains("screenGdzs.classList")) {
      screenGdzs.classList.add("visually-hidden")
      setState({ withGDZS: false })
    }
    ticketsData = data[key]
    updateTicketsList(ticketsData)
    updateTicketsDetails()
  }
}

function gdzsChoiseButtonHandler(event) {
  const withGDZS = event.target.dataset.gdzs === "true"
  if (withGDZS !== state["withGDZS"]) {
    setState({ withGDZS })
    const gdzsSuffix = withGDZS ? "WithGDZS" : ""
    const key = state["jobTitle"] + "sData" + gdzsSuffix
    ticketsData = data[key]
    updateTicketsList(ticketsData)
    updateTicketsDetails()
  }
}

function ticketChoiseButtonHandler(event) {
  if (event.target.dataset.ticket) {
    const ticketNumber = event.target.dataset.ticket
    let ticketDetails = ticketsData[ticketNumber]
    updateSubheader(ticketNumber)
    updateTicketsDetails(ticketDetails)
  }
}

function updateTicketsList(dataJob) {
  updateHeader()
  screenTicketChoice.innerHTML = generateTicketsList()
  console.log(dataJob)
  function generateTicketsList() {
    let content = ""
    for (let item in dataJob) {
      content += templateTicketButton(item)
    }
    return content
  }

  function templateTicketButton(item) {
    return `<button class="btn btn-secondary m-1" data-ticket="${item}">Билет ${item}</button>`
  }
}

function updateTicketsDetails(dataTicket) {
  let content
  if (!dataTicket) {
    updateSubheader()
    updateShortAnswers()
    content = templateEmptyTicketTitle()
  } else {
    updateShortAnswers(dataTicket)
    content = generateTicketDetails(dataTicket)
  }
  screenTicketDetails.innerHTML = content

  function generateTicketDetails(dataTicket) {
    let content = "<dl>"
    for (let i = 1; i <= Object.keys(dataTicket).length; i++) {
      content += templateQuestionAndAnswer(i, dataTicket)
    }
    content += "</dl>"
    return content
  }

  function templateQuestionAndAnswer(index, dataTicket) {
    let result = `<dt>${index}. ${dataTicket[index].q}</dt><dd>${dataTicket[index].a}</dd>`
    if (index < Object.keys(dataTicket).length) {
      result += "<hr />"
    }
    return result
  }

  function templateEmptyTicketTitle() {
    return `<p class="text-center mt-5">${emptyTicketTitle}</p>`
  }
}

function updateHeader() {
  header.innerText = generateHeaderContent()

  function generateHeaderContent() {
    let content = headers[state["jobTitle"]]
    if (state["withGDZS"]) {
      content += headers["withGDZS"]
    } else if (state["jobTitle"] !== "driver") {
      content += headers["withoutGDZS"]
    }
    return content
  }
}

function updateSubheader(ticketNumber) {
  subheader.innerText = generateSubheaderContent(ticketNumber)

  function generateSubheaderContent(ticketNumber) {
    return ticketNumber ? templateSubheader(ticketNumber) : ""
  }

  function templateSubheader(ticketNumber) {
    return "Билет №" + ticketNumber
  }
}

function updateShortAnswers(dataTicket) {
  shortAnswers.innerHTML = generateShortAnswersContent(dataTicket)

  function generateShortAnswersContent(dataTicket) {
    let content = ""
    if (dataTicket) {
      for (let item in dataTicket) {
        const answer = dataTicket[item]["a"].split(".")[0]
        content += templateShortAnswer(item, answer)
      }
    }
    return content
  }

  function templateShortAnswer(item, answer) {
    return `<b>${item}:</b> ${answer}; `
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop

let deferredPrompt;
let modalInstallOffer

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  if (getCookie("notinstall") !== "1") {
    deferredPrompt = e;
    modalInstallOffer = new bootstrap.Modal(modalInstall)
    modalInstallOffer.show()

    buttonInstall.addEventListener('click', () => installAppHandler(deferredPrompt, modalInstallOffer, rejectInstallAppHandler));
    buttonRejectInstall.addEventListener("click", () => rejectInstallAppHandler(60 * 60 * 24 * 30, modalInstallOffer))
    buttonModalClose.addEventListener("click", () => rejectInstallAppHandler(60 * 10, modalInstallOffer))
  }

  function installAppHandler(deferredPrompt, modal, cbDismissed) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the Firemans prompt');
      } else {
        console.log('User dismissed the Firemans prompt');
        cbDismissed(60 * 10, modal)
      }
      deferredPrompt = null;
      modal.hide()
    });
  }

  function rejectInstallAppHandler(maxAge, modal) {
    document.cookie = `notinstall=1; max-age=${maxAge}`
    modal.hide()
  }

  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
});