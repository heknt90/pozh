const state = {
  jobTitle: undefined,
  ticketNumber: undefined
}

let ticketsData, ticketDetails
const ticketsKeys = {
  "driver": driversData,
  "commander": commandersDataGDZS,
  "fireman": firemanDataGDZS
}

// Обработка кнопок gdzsWithout и gdzsWith
// Выбор между commandersData/commandersDataGDZS и firemanData/firemanDataGDZS
// https://cloud.mail.ru/public/YbXT/kPT9sZimY/%D0%91%D0%B8%D0%BB%D0%B5%D1%82%D1%8B

for (let button of document.querySelectorAll('[data-job]')) {
  button.addEventListener('click', function (event) {
    const dataJob = event.target.dataset.job
    if (dataJob !== "driver") {
      screenGdzs.classList.remove("visually-hidden")
      gdzsWithout.focus()
    } else if (!screenGdzs.classList.contains("screenGdzs.classList")) {
      screenGdzs.classList.add("visually-hidden")
    }
    setState({ jobTitle: dataJob })
    ticketsData = ticketsKeys[dataJob]
    screenTicketChoice.innerHTML = updateTicketsList(ticketsData)
    screenTicketDetails.innerHTML = updateTicketsDetails()
  })
}

document.querySelector("#screenTicketChoice").addEventListener("click", function (event) {
  if (event.target.dataset.ticket) {
    ticketDetails = ticketsData[event.target.dataset.ticket]
    screenTicketDetails.innerHTML = updateTicketsDetails(ticketDetails)
  }
})

function setState(newState) {
  for (let item in newState) {
    state[item] = newState[item]
  }
}

function updateTicketsList(dataJob) {
  let content = ""
  for (let item in dataJob) {
    content += `<button class="btn btn-secondary m-1" data-ticket="${item}">Билет ${item}</button>`
  }
  return content
}

function updateTicketsDetails(dataTicket) {
  if (!dataTicket) {
    return "<p class='text-center mt-5'>Выберите номер билета выше.</p>"
  }
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