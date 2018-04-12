// Set up fields
function setupFields(data) {
  const {
    customerName,
    phoneNumber,
    dateReceived,
    assignee,
    shortDescription,
    computerMakeNModel,
    estComplDate,
    description,
    initDiagnosis,
    repairNotes
  } = data;

  document.getElementById("#customer_name").value = customerName;
  document.getElementById("#phone_number").value = phoneNumber;
  document.getElementById("#date_received").value = dateReceived;
  document.getElementById("#assigned_to").value = assignee;
  document.getElementById("#short_desc").value = shortDescription;
  document.getElementById("#computer_make").value = computerMakeNModel;
  document.getElementById("#est_completion").value = estComplDate;
}

// SET TOOLTIPSTER DEFAULTS
$.tooltipster.setDefaults({
  side: ['left', 'right', 'top'],
  theme: 'tooltipster-shadow',
  animation: 'grow',
});

// DOCUMENT INFORMATION HAS BEEN RECEIVED
jQuery(document).ready(function ($) {
  changeStatusIcon("status_field", "status_img");
  formSetup();

  const ticketNum = getAllUrlParams().t;
  if (ticketNum !== 'new') {
    $.ajax({
      url: 'http://localhost:3000/tickets/' + ticketNum,
      headers: {'Authorization': localStorage.getItem('jwtToken')},
      type: 'GET'
    })
    .done((response) => {
      console.log(response);
      setupFields(this.response);
    })
    .fail((error) => {
      const loginErrMsg = JSON.parse(JSON.stringify(error)).responseJSON.error.message;
      console.log(loginErrMsg);
    });
  }

  // LOAD TOOLTIPSTER PLUGIN
  $('.tipster').tooltipster();

  // CHECK IF NEW TICKET
  if (getAllUrlParams().t == 'new') {
    isNewTicket();
  };
});

function changeStatusIcon(listener, icon) {
  var status = document.getElementById(listener);
  var icon = document.getElementById(icon);
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

  $('#imgright > a').attr('href', 'javascript:disableEdit();');
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

function save() {
  disableEdit();
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

// TICKET IT NEW LETS UPDATE THE SAVE BUTTON
function isNewTicket() {
  enableEdit();
  $('#imgleft > a').attr('href', 'dashboard.html');
  $('#imgright > a').attr('href', 'javascript:createTicket();');
  // RETRIEVE USERS LAST REPAIR ID
  var num = 920;

  num += 1;
  $('.ticket_header').prepend('New ');
  $('.ticket_num').text(num);
}

// CREATE NEW TICKET IN THE DATABASE
function createTicket() {
  alert('TICKET CREATED');
  // CREATE TICKET VIA AJAX CALL
}