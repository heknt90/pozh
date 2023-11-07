const state = {
  jobTitle: undefined,
  ticketNumber: undefined,
  withGDZS: false
}



let ticketsData, ticketDetails
const ticketsKeys = {
  "driver": data["driversData"],
  "commander": data["commandersData"],
  "fireman": data["firemanData"]
}

const headers = {
  driver: "Билеты для водителей",
  commander: "Билеты для командиров",
  fireman: "Билеты для пожарных",
  withGDZS: " с вопросами по ГДЗС",
  withoutGDZS: " без вопросов по ГДЗС",
}

// Обработка кнопок gdzsWithout и gdzsWith
// Выбор между commandersData/commandersDataGDZS и firemanData/firemanDataGDZS

for (let button of document.querySelectorAll('[data-job]')) {
  button.addEventListener('click', function (event) {
    const dataJob = event.target.dataset.job
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
    screenTicketChoice.innerHTML = updateTicketsList(ticketsData)
    screenTicketDetails.innerHTML = updateTicketsDetails()
  })
}

for (let button of document.querySelectorAll('[data-gdzs]')) {
  button.addEventListener("click", function(event) {
    const withGDZS = event.target.dataset.gdzs === "true"
    setState({withGDZS})
    const gdzsSuffix = withGDZS ? "WithGDZS" : ""
    const key = state["jobTitle"]+ "sData"+gdzsSuffix
    ticketsData = data[key]
    screenTicketChoice.innerHTML = updateTicketsList(ticketsData)
    screenTicketDetails.innerHTML = updateTicketsDetails()
  })
}

document.querySelector("#screenTicketChoice").addEventListener("click", function (event) {
  if (event.target.dataset.ticket) {
    ticketDetails = ticketsData[event.target.dataset.ticket]
    updateSubheader(event.target.dataset.ticket)
    screenTicketDetails.innerHTML = updateTicketsDetails(ticketDetails)
  }
})

function setState(newState) {
  for (let item in newState) {
    state[item] = newState[item]
  }
}

function updateTicketsList(dataJob) {
  updateHeader()
  let content = ""
  for (let item in dataJob) {
    content += `<button class="btn btn-secondary m-1" data-ticket="${item}">Билет ${item}</button>`
  }
  return content
}

function updateTicketsDetails(dataTicket) {
  if (!dataTicket) {
    updateSubheader()
    updateShortAnswers()
    return "<p class='text-center mt-5'>Выберите номер билета выше.</p>"
  }
  updateShortAnswers(dataTicket)
  let content = "<dl>"
  for (let i = 1; i <= Object.keys(dataTicket).length; i++) {
    content += `<dt>${i}. ${dataTicket[i].q}</dt><dd>${dataTicket[i].a}</dd>`
    if (i < Object.keys(dataTicket).length) {
      content += "<hr />"
    }
  }
  content += "</dl>"
  return content
}

function updateHeader() {
  let headerContent = headers[state["jobTitle"]]
  if (state["withGDZS"]) {
    headerContent += headers["withGDZS"]
  } else if (state["jobTitle"] !== "driver") {
    headerContent += headers["withoutGDZS"]
  }
  header.innerText = headerContent
}

function updateSubheader(ticketNumber) {
  if (ticketNumber) {
    subheader.innerText = "Билет №" + ticketNumber
  } else {
    subheader.innerText = ""
  }
}

function updateShortAnswers(dataTicket) {
  let content = ""
  if (dataTicket) {
    for (let item in dataTicket) {
      const answer = dataTicket[item]["a"].split(".")[0]
      content+=  `<b>${item}:</b> ${answer}; `
    }
  }
  shortAnswers.innerHTML = content
}
