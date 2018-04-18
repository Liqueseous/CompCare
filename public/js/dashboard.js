// Get USER Tickets from API
$(window).on('load', function () {
  $.ajax({
    url: 'https://afternoon-waters-42339.herokuapp.com/tickets',
    headers: {'Authorization': localStorage.getItem('jwtToken')},
    type: 'GET'
  })
  .done((response) => {
    if (Array.isArray(response)) {
      for (let i = 0; i < response.length; i++) {
        const { status, customerName, ticketNumber, dateReceived, estComplDate, assignee } = response[i];
        addActiveOrder(status, customerName, ticketNumber, dateReceived, estComplDate, assignee);
      }
    }
  })
  .fail((error) => {
    const loginErrMsg = JSON.parse(JSON.stringify(error)).responseJSON.error.message;
    console.log(loginErrMsg);
  });
});

// SET TOOLTIPSTER DEFAULTS
$.tooltipster.setDefaults({
  side: ['left', 'right', 'top'],
  theme: 'tooltipster-shadow',
  animation: 'grow',
  trigger: 'click',
  events: {
    def:     "mouseover,mouseout",
    label:     "mouseover,mouseout",
    input:   "focus,blur",
    select:   "focus,blur",
    widget:  "focus mouseover,blur mouseout",
    tooltip: "mouseover,mouseout"
  }
});

// DOCUMENT INFORMATION HAS BEEN RECEIVED
jQuery(document).ready(function ($) {
  $(".clickable-row").click(function () {
    window.location = $(this).data("href");
  });
  // LOAD TOOLTIPSTER PLUGIN
  $('.tipster').tooltipster();
});

function showOpen() {
  resetActiveOrders();
  // re-fill in open orders using addActiveOrder()

}

function showOnHold() {
  resetActiveOrders();
  // re-fill in on-hold orders using addActiveOrder()

}

function showInProgress() {
  resetActiveOrders();
  // re-fill in in progress orders using addActiveOrder()

}

function showClosed() {
  resetClosedOrders();
  // re-fill in closed orders using addClosedOrder()

}

//                     str     str            str        str           str              str
function addActiveOrder(circle, customer_name, repair_id, date_entered, completion_time, tech) {
  var table = document.getElementById("activeOrders")
  var link = "./ticket.html?t=" + repair_id; // setup anchor link
  var anchor = document.createElement("a"); // create anchor
  anchor.setAttribute('href', link); // set anchor href
  var row = document.createElement("div"); // create row
  row.setAttribute('class', 'row'); // make it a row class

  //Set status image depending on status
  //Put all elements into a row
  if (circle == "Open")
    row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-1\"><img src=./resources/dashboard/circle-open.svg></div>");
  else if (circle == "On Hold")
    row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-1\"><img src=./resources/dashboard/circle-onHold.svg></div>");
  else if (circle == "In Progress")
    row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-1\"><img src=./resources/dashboard/circle-inProgress.svg></div>");

  row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-2\">" + customer_name + "</div>"); //Customer Name
  row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-2\">" + repair_id + "</div>"); //Repair ID
  row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-2\">" + date_entered + "</div>"); //Date Entered
  row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-2\">" + completion_time + "</div>"); //Completion Time
  row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-3\">" + tech + "</div>"); //technician
  //Put the row into our anchor element
  anchor.insertAdjacentElement('beforeend', row);
  //Put our row and anchor into the table to display to user
  table.insertAdjacentElement('beforeend', anchor);
}

//                      str            str        str           str          str
function addClosedOrder(customer_name, repair_id, date_entered, date_closed, resolution_code) {
  var table = document.getElementById("closedOrders")
  var link = "./ticket.html?t=" + repair_id; // setup anchor link
  var anchor = document.createElement("a"); // create anchor
  anchor.setAttribute('href', link); // set anchor href
  var row = document.createElement("div"); // create row
  row.setAttribute('class', 'row'); // make it a row class

  row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-1\"><img src=./resources/dashboard/circle-closed.svg></div>"); //Insert Closed status icon
  row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-2\">" + customer_name + "</div>"); //Customer Name
  row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-2\">" + repair_id + "</div>"); //Repair ID
  row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-2\">" + date_entered + "</div>"); //Date Entered
  row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-2\">" + date_closed + "</div>"); //Date Closed
  row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-3\">" + resolution_code + "</div>"); //Resolution Code
  //Put the row into our anchor element
  anchor.insertAdjacentElement('beforeend', row);
  //Put our row and anchor into the table to display to user
  table.insertAdjacentElement('beforeend', anchor);

}

function resetActiveOrders() {
  var table = document.getElementById("activeOrders");
  var table_length = table.rows.length;

  for (i = table_length - 1; i > 1; i--) {
    table.deleteRow(i);
  }
}

function resetClosedOrders() {
  var table = document.getElementById("closedOrders");
  var table_length = table.rows.length;

  for (i = table_length - 1; i > 1; i--) {
    table.deleteRow(i);
  }
}

// CREATE NEW TICKET
function newTicket() {
  //retrieve users previous ticket number

  //increment ticket number
  var new_id = 'NEW';
  //set users new last ticket number
  
  //call ticket page with new ticket and its new ticket number
  window.location.href = "./ticket.html?t=" + new_id;
}