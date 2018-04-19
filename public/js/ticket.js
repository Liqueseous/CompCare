// Set up fields
function setupFields(data) {
  const {
    ticketNumber,
    status,
    customerName,
    phoneNumber,
    dateReceived,
    assignee,
    shortDescription,
    computerMakeNModel,
    estComplDate,
    formFactor,
    description,
    location,
    initDiagnosis,
    repairNotes
  } = data;

  switch(status) {
    case 'Open':
      document.getElementById("ticket_number").innerText = ticketNumber;
      document.getElementById("status_field").value = status;
      document.getElementById("customer_name").value = customerName;
      document.getElementById("phone_number").value = phoneNumber;
      document.getElementById("date_received").value = dateReceived;
      document.getElementById("assigned_to").value = assignee;
      document.getElementById("short_disc").value = shortDescription;
      document.getElementById("computer_make").value = computerMakeNModel;
      document.getElementById("est_completion").value = estComplDate;
      document.getElementById("form_factor").value = formFactor;
      document.getElementById("item_desc").value = description;
      document.getElementById("location_field").value = location;
      document.getElementById("initial_diag").value = initDiagnosis;
      document.getElementById("repair_notes").value = repairNotes;
      break;
    case 'In Progress':
      document.getElementById("ticket_number").innerText = ticketNumber;
      document.getElementById("status_field").value = status;
      document.getElementById("customer_name").value = customerName;
      document.getElementById("phone_number").value = phoneNumber;
      document.getElementById("date_received").value = dateReceived;
      document.getElementById("assigned_to").value = assignee;
      document.getElementById("short_disc").value = shortDescription;
      document.getElementById("computer_make").value = computerMakeNModel;
      document.getElementById("est_completion").value = estComplDate;
      document.getElementById("form_factor").value = formFactor;
      document.getElementById("item_desc").value = description;
      document.getElementById("location_field").value = location;
      document.getElementById("initial_diag").value = initDiagnosis;
      document.getElementById("repair_notes").value = repairNotes;
      break;
    case 'On Hold':
      const { partsNeeded, holdReason } = data;
      document.getElementById("ticket_number").innerText = ticketNumber;
      document.getElementById("status_field").value = status;
      document.getElementById("customer_name").value = customerName;
      document.getElementById("phone_number").value = phoneNumber;
      document.getElementById("date_received").value = dateReceived;
      document.getElementById("assigned_to").value = assignee;
      document.getElementById("short_disc").value = shortDescription;
      document.getElementById("computer_make").value = computerMakeNModel;
      document.getElementById("est_completion").value = estComplDate;
      document.getElementById("form_factor").value = formFactor;
      document.getElementById("item_desc").value = description;
      document.getElementById("location_field").value = location;
      document.getElementById("parts_needed").value = partsNeeded;
      document.getElementById("reason_for_hold").value = holdReason;
      document.getElementById("initial_diag").value = initDiagnosis;
      document.getElementById("repair_notes").value = repairNotes;
      break;
    case 'Closed':
      const { resolutionCode } = data;
      document.getElementById("ticket_number").innerText = ticketNumber;
      document.getElementById("status_field").value = status;
      document.getElementById("customer_name").value = customerName;
      document.getElementById("phone_number").value = phoneNumber;
      document.getElementById("date_received").value = dateReceived;
      document.getElementById("assigned_to").value = assignee;
      document.getElementById("short_disc").value = shortDescription;
      document.getElementById("computer_make").value = computerMakeNModel;
      document.getElementById("est_completion").value = estComplDate;
      document.getElementById("form_factor").value = formFactor;
      document.getElementById("item_desc").value = description;
      document.getElementById("location_field").value = location;
      document.getElementById("initial_diag").value = initDiagnosis;
      document.getElementById("repair_notes").value = repairNotes;
      document.getElementById("res_code").value = resolutionCode;
      break;
    default:
      console.log('Order Status Error...');
  }

  changeStatusIcon("status_field", "status_img");

}

// SET TOOLTIPSTER DEFAULTS
$.tooltipster.setDefaults({
  side: ['left', 'right', 'top'],
  theme: 'tooltipster-shadow',
  animation: 'grow',
});

// DOCUMENT INFORMATION HAS BEEN RECEIVED
jQuery(document).ready(function ($) {
  formSetup();

  const ticketNum = getAllUrlParams().t;
  if (ticketNum !== 'new') {
    $.ajax({
      url: 'https://afternoon-waters-42339.herokuapp.com/tickets/' + ticketNum,
      headers: {'Authorization': localStorage.getItem('jwtToken')},
      type: 'GET'
    })
    .done((response) => {
      setupFields(response);
    })
    .fail((error) => {
      console.log(error);
    });
  }

  // LOAD TOOLTIPSTER PLUGIN
  $('.tipster').tooltipster();

  // CHECK IF NEW TICKET
  if (ticketNum == 'new') {
    isNewTicket();
  };
});

function changeStatusIcon(listener, icon) {
  var status = document.getElementById(listener);
  var icon = document.getElementById(icon);
  console.log(status.value);
  if (status.value == "Open") {
    icon.setAttribute("src", "./resources/dashboard/circle-open.svg");
  } else if (status.value == "In Progress") {
    icon.setAttribute("src", "./resources/dashboard/circle-inProgress.svg");
  } else if (status.value == "On Hold") {
    icon.setAttribute("src", "./resources/dashboard/circle-onHold.svg");
  } else {
    icon.setAttribute("src", "./resources/dashboard/circle-closed.svg");
  }
};

function formSetup() {
  var status = document.getElementById("status_field");
  var onHold = document.querySelectorAll(".onHold");
  var closed = document.querySelectorAll(".closed");


  console.log("formsetup");
  if (status.value == "Open") {
    onHold.forEach(function (e) {
      e.style.display = 'none'
    });
    closed.forEach(function (e) {
      e.style.display = 'none'
    });
  } else if (status.value == "In Progress") {
    onHold.forEach(function (e) {
      e.style.display = 'none'
    });
    closed.forEach(function (e) {
      e.style.display = 'none'
    });
  } else if (status.value == "On Hold") {
    onHold.forEach(function (e) {
      e.style.display = 'block'
    });
    closed.forEach(function (e) {
      e.style.display = 'none'
    });
  } else {
    onHold.forEach(function (e) {
      e.style.display = 'none'
    });
    closed.forEach(function (e) {
      e.style.display = 'block'
    });
  }
};

function checkForm() {
  changeStatusIcon("status_field", "status_img");
  formSetup();
};

function enableEdit() {
  $('.tipster').tooltipster('destroy');
  $('#imgleft > a').attr('href', 'javascript:disableEdit();');
  $('#imgleft > a').attr('alt', 'Cancel Changes');
  $('#imgleft > a').attr('class', 'tipster');
  $('#imgleft > a').attr('title', 'Cancel Changes');
  $('#imgleft > a > img').attr('src', './resources/ticket/cancel.svg');

  $('#imgright > a').attr('href', 'javascript:save();');
  $('#imgright > a').attr('alt', 'Save Changes');
  $('#imgright > a').attr('class', 'tipster');
  $('#imgright > a').attr('title', 'Save Changes');
  $('#imgright > a > img').attr('src', './resources/ticket/save.svg');

  var inputs = document.querySelectorAll("input, select, textarea")
  var labels = document.querySelectorAll(".form-group label")

  inputs.forEach(function (e) {
    e.removeAttribute('disabled');
  });
  labels.forEach(function (e) {
    e.style.color = "#000"
  });
  $('.tipster').tooltipster();
}

function disableEdit() {
  $('.tipster').tooltipster('destroy');
  $('#imgleft > a').removeAttr('title');
  $('#imgleft > a').removeAttr('class');
  $('#imgleft > a').removeAttr('alt');
  $('#imgleft > a').attr('href', 'dashboard.html');
  $('#imgleft > a').attr('alt', 'Go Back');
  $('#imgleft > a').attr('class', 'tipster');
  $('#imgleft > a').attr('title', 'Back to Dashboard');
  $('#imgleft > a > img').attr('src', './resources/ticket/back.svg');

  $('#imgright > a').removeAttr('title');
  $('#imgright > a').removeAttr('class');
  $('#imgright > a').removeAttr('alt');
  $('#imgright > a').attr('href', 'javascript:enableEdit();');
  $('#imgright > a').attr('alt', 'Edit Ticket');
  $('#imgright > a').attr('class', 'tipster');
  $('#imgright > a').attr('title', 'Edit Ticket');
  $('#imgright > a > img').attr('src', './resources/ticket/edit.svg');

  var inputs = document.querySelectorAll("input, select, textarea");
  var labels = document.querySelectorAll(".form-group label");

  inputs.forEach(function (e) {
    e.setAttribute('disabled', '');
  });
  labels.forEach(function (e) {
    e.style.color = "#777"
  });
  $('.tipster').tooltipster();
}

// TICKET IS NEW LETS UPDATE THE SAVE BUTTON
function isNewTicket() {
  enableEdit();
  $('#imgleft > a').attr('href', 'dashboard.html');
  $('#imgright > a').attr('href', 'javascript:createTicket();');
  // RETRIEVE USERS LAST REPAIR ID
  let ticketNum = undefined;
  $.ajax({
    url: 'https://afternoon-waters-42339.herokuapp.com/tickets/',
    headers: {'Authorization': localStorage.getItem('jwtToken')},
    type: 'GET'
  })
  .done((response) => {
    if (Array.isArray(response)) {
      ticketNum = response.length;
      // For visual purposes
      ticketNum = ticketNum + 1;
      $('.ticket_header').prepend('New ');
      $('.ticket_num').text(ticketNum);
    }
  })
  .fail((error) => {
    console.log(error);
  });
}

// CREATE NEW TICKET IN THE DATABASE
function createTicket() {
  disableEdit();
  // CREATE TICKET VIA AJAX CALL
  // include ticketNumber
  const ticketNumber = document.getElementById("ticket_number").innerText.toString();
  const status = document.getElementById("status_field").value;
  const customerName = document.getElementById("customer_name").value;
  const phoneNumber = document.getElementById("phone_number").value;
  const dateReceived = document.getElementById("date_received").value;
  const assignee = document.getElementById("assigned_to").value;
  const shortDescription = document.getElementById("short_disc").value;
  const computerMakeNModel = document.getElementById("computer_make").value;
  const estComplDate = document.getElementById("est_completion").value;
  const formFactor = document.getElementById("form_factor").value;
  const description = document.getElementById("item_desc").value;
  const location = document.getElementById("location_field").value;
  const initDiagnosis = document.getElementById("initial_diag").value;
  const repairNotes = document.getElementById("repair_notes").value;

  console.log(ticketNumber);

  const ticketData = {
    status,
    customerName,
    phoneNumber,
    dateReceived,
    assignee,
    shortDescription,
    computerMakeNModel,
    estComplDate,
    formFactor,
    description,
    location,
    initDiagnosis,
    repairNotes
  }

  $.ajax({
    url: `https://afternoon-waters-42339.herokuapp.com/tickets/${ticketNumber}`,
    headers: {'Authorization': localStorage.getItem('jwtToken')},
    data: ticketData,
    type: 'POST'
  })
  .done((response) => {
    console.log(response);
  })
  .fail((error) => {
    console.log(error.responseText);
  });
}

// SAVE EDITS TO TICKET
function save() {
  disableEdit();
  // UPDATE TICKET VIA AJAX CALL
  const ticketNumber = document.getElementById("ticket_number").innerText;
  const status = document.getElementById("status_field").value;
  const customerName = document.getElementById("customer_name").value;
  const phoneNumber = document.getElementById("phone_number").value;
  const dateReceived = document.getElementById("date_received").value;
  const assignee = document.getElementById("assigned_to").value;
  const shortDescription = document.getElementById("short_disc").value;
  const computerMakeNModel = document.getElementById("computer_make").value;
  const estComplDate = document.getElementById("est_completion").value;
  const formFactor = document.getElementById("form_factor").value;
  const description = document.getElementById("item_desc").value;
  const location = document.getElementById("location_field").value;
  const initDiagnosis = document.getElementById("initial_diag").value;
  const repairNotes = document.getElementById("repair_notes").value;
  
  const ticketData = {
    status,
    customerName,
    phoneNumber,
    dateReceived,
    assignee,
    shortDescription,
    computerMakeNModel,
    estComplDate,
    formFactor,
    description,
    location,
    initDiagnosis,
    repairNotes
  }

  $.ajax({
    url: `https://afternoon-waters-42339.herokuapp.com/tickets/${ticketNumber}`,
    headers: {'Authorization': localStorage.getItem('jwtToken')},
    data: ticketData,
    type: 'PUT'
  })
  .done((response) => {
    console.log('done with PUT');
  })
  .fail((error) => {
    console.log('error with PUT');
  });
}