// Set up fields
function setupFields(data) {
  let {
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
      let { partsNeeded, holdReason } = data;
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
      let { resolutionCode } = data;
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
  if (localStorage.getItem('jwtToken') === null) {
    window.location.href = "index";
  } else {
    formSetup();
    let ticketNum = getAllUrlParams().t;
    if (ticketNum !== 'new') {
      $.ajax({
        url: 'https://afternoon-waters-42339.herokuapp.com/tickets/' + ticketNum,
        headers: {'Authorization': localStorage.getItem('jwtToken')},
        type: 'GET'
      })
      .done((response) => {
        setupFields(response);
        formSetup();
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
  }
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
  $('#backButt > a').attr('href', 'javascript:disableEdit();');
  $('#backButt > a').attr('alt', 'Cancel Changes');
  $('#backButt > a').attr('class', 'tipster');
  $('#backButt > a').attr('title', 'Cancel Changes');
  // $('#imgleft > a > img').attr('src', './resources/ticket/cancel.svg');
  $('#backButt > a > button').html("<i class='fas fa-times'></i> Cancel Changes")

  $('#editButt > a').attr('href', 'javascript:save();');
  $('#editButt > a').attr('alt', 'Save Changes');
  $('#editButt > a').attr('class', 'tipster');
  $('#editButt > a').attr('title', 'Save Changes');
  // $('#imgright > a > img').attr('src', './resources/ticket/save.svg');
  $('#editButt > a > button').html(" <i class='fas fa-save'></i> Save Changes")

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
  $('#backButt > a').removeAttr('title');
  $('#backButt > a').removeAttr('class');
  $('#backButt > a').removeAttr('alt');
  $('#backButt > a').attr('href', 'dashboard.html');
  $('#backButt > a').attr('alt', 'Go Back');
  $('#backButt > a').attr('class', 'tipster');
  $('#backButt > a').attr('title', 'Back to Dashboard');
  // $('#imgleft > a > img').attr('src', './resources/ticket/back.svg');
  $('#backButt > a > button').html(" <i class='fas fa-chevron-left'></i> Back")

  $('#editButt > a').removeAttr('title');
  $('#editButt > a').removeAttr('class');
  $('#editButt > a').removeAttr('alt');
  $('#editButt > a').attr('href', 'javascript:enableEdit();');
  $('#editButt > a').attr('alt', 'Edit Ticket');
  $('#editButt > a').attr('class', 'tipster');
  $('#editButt > a').attr('title', 'Edit Ticket');
  // $('#imgright > a > img').attr('src', './resources/ticket/edit.svg');
  $('#editButt > a > button').html("<i class='far fa-edit'></i> Edit Ticket")

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
  $('#backButt > a').attr('href', 'dashboard.html');
  $('#editButt > a').attr('href', 'javascript:createTicket();')
  $('#editButt > a > button').html("<i class='fas fa-plus'></i> Create Ticket")
  
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

function signOut() {
  console.log('got here');
  localStorage.removeItem('jwtToken');
  swal("Logout Successful", {
    icon: "info",
    buttons: false,
  });
  setTimeout(function () {
    window.location.href = "index"; //will redirect
  }, 2000);
}

// CREATE NEW TICKET IN THE DATABASE
function createTicket() {
  disableEdit();
  // CREATE TICKET VIA AJAX CALL
  // include ticketNumber

  const status = document.getElementById("status_field").value;

  const ticketNumber = document.getElementById("ticket_number").innerText.toString();
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

  switch (status) {
    case 'Open':
      $.ajax({
        url: `https://afternoon-waters-42339.herokuapp.com/tickets/${ticketNumber}`,
        headers: {'Authorization': localStorage.getItem('jwtToken')},
        data: ticketData,
        type: 'POST'
      })
      .done((response) => {
        console.log(response);
        window.location = '/dashboard.html';
      })
      .fail((error) => {
        console.log(error.responseText);
      });
      break;
    case 'In Progress':
      $.ajax({
        url: `https://afternoon-waters-42339.herokuapp.com/tickets/${ticketNumber}`,
        headers: {'Authorization': localStorage.getItem('jwtToken')},
        data: ticketData,
        type: 'POST'
      })
      .done((response) => {
        console.log(response);
        window.location = '/dashboard.html';
      })
      .fail((error) => {
        console.log(error.responseText);
      });
      break;
    case 'On Hold':
      ticketData.partsNeeded = document.getElementById("parts_needed").value;
      ticketData.holdReason = document.getElementById("reason_for_hold").value;
      $.ajax({
        url: `https://afternoon-waters-42339.herokuapp.com/tickets/${ticketNumber}`,
        headers: {'Authorization': localStorage.getItem('jwtToken')},
        data: ticketData,
        type: 'POST'
      })
      .done((response) => {
        console.log(response);
        window.location = '/dashboard.html';
      })
      .fail((error) => {
        console.log(error.responseText);
      });
      break;
      case 'Closed':
      let elt = document.getElementById("res_code");
      if (elt.selectedIndex == -1) console.log('gotta select an index');
      else {
        ticketData.resolutionCode = elt.options[elt.selectedIndex].text;  
        $.ajax({
          url: `https://afternoon-waters-42339.herokuapp.com/tickets/${ticketNumber}`,
          headers: {'Authorization': localStorage.getItem('jwtToken')},
          data: ticketData,
          type: 'POST'
        })
        .done((response) => {
          console.log(response);
          window.location = '/dashboard.html';
        })
        .fail((error) => {
          console.log(error.responseText);
        });
      }
      break;
    default:
      console.log('Error with grabbing form data in createTicket()');
  }
}

// SAVE EDITS TO TICKET
function save() {
  disableEdit();
  // UPDATE TICKET VIA AJAX CALL
  const status = document.getElementById("status_field").value;

  const ticketNumber = document.getElementById("ticket_number").innerText.toString();
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

  switch (status) {
    case 'Open':
      $.ajax({
        url: `https://afternoon-waters-42339.herokuapp.com/tickets/${ticketNumber}`,
        headers: {'Authorization': localStorage.getItem('jwtToken')},
        data: ticketData,
        type: 'PUT'
      })
      .done((response) => {
        console.log(response);
        window.location = '/dashboard.html';
      })
      .fail((error) => {
        console.log(error.responseText);
      });
      break;
    case 'In Progress':
      $.ajax({
        url: `https://afternoon-waters-42339.herokuapp.com/tickets/${ticketNumber}`,
        headers: {'Authorization': localStorage.getItem('jwtToken')},
        data: ticketData,
        type: 'PUT'
      })
      .done((response) => {
        console.log(response);
        window.location = '/dashboard.html';
      })
      .fail((error) => {
        console.log(error.responseText);
      });
      break;
    case 'On Hold':
      ticketData.partsNeeded = document.getElementById("parts_needed").value;
      ticketData.holdReason = document.getElementById("reason_for_hold").value;
      $.ajax({
        url: `https://afternoon-waters-42339.herokuapp.com/tickets/${ticketNumber}`,
        headers: {'Authorization': localStorage.getItem('jwtToken')},
        data: ticketData,
        type: 'PUT'
      })
      .done((response) => {
        console.log(response);
        window.location = '/dashboard.html';
      })
      .fail((error) => {
        console.log(error.responseText);
      });
      break;
    case 'Closed':
      let elt = document.getElementById("res_code");
      if (elt.selectedIndex == -1) console.log('gotta select an index');
      else {
        ticketData.resolutionCode = elt.options[elt.selectedIndex].text;  
        $.ajax({
          url: `https://afternoon-waters-42339.herokuapp.com/tickets/${ticketNumber}`,
          headers: {'Authorization': localStorage.getItem('jwtToken')},
          data: ticketData,
          type: 'PUT'
        })
        .done((response) => {
          console.log(response);
          window.location = '/dashboard.html';
        })
        .fail((error) => {
          console.log(error.responseText);
        });
      }
      break;
    default:
      console.log('Error with grabbing form data in createTicket()');
  }
}