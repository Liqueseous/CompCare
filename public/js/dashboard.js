// Get USER Tickets from API
$(window).on('load', function () {
  // LOAD TOOLTIPSTER PLUGIN
  $('.tipster').tooltipster();

  $.ajax({
      url: 'https://afternoon-waters-42339.herokuapp.com/tickets',
      headers: {
        'Authorization': localStorage.getItem('jwtToken')
      },
      type: 'GET'
    })
    .done((response) => {
      if (Array.isArray(response)) {
        for (let i = 0; i < response.length; i++) {
          const {
            status,
            customerName,
            ticketNumber,
            dateReceived,
            estComplDate,
            assignee
          } = response[i];
          if (status !== 'Closed') {
            addActiveOrder(status, customerName, ticketNumber, dateReceived, estComplDate, assignee);
          } else {
            const {
              resolutionCode
            } = response[i];
            addClosedOrder(customerName, ticketNumber, dateReceived, estComplDate, resolutionCode);
          }
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
  trigger: 'hover',
  events: {
    def: "mouseover,mouseout",
    label: "mouseover,mouseout",
    input: "focus,blur",
    select: "focus,blur",
    widget: "focus mouseover,blur mouseout",
    tooltip: "mouseover,mouseout"
  }
});

// DOCUMENT INFORMATION HAS BEEN RECEIVED
jQuery(document).ready(function ($) {
  if (localStorage.getItem('jwtToken') === null) {
    window.location.href = "index";
  } else {
    $(".clickable-row").click(function () {
      window.location = $(this).data("href");
    });
  }
});

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

// FILTER TICKETS
function filter() {
  if ($('#filOpen.active').length) {
    //IF FILTER OPEN ONLY SHOW OPEN
    resetFilters();
    $('#closedPanel').hide();
    $('.Hold').hide();
    $('.Progress').hide();
    $('.resetCol').css("display", "inline");
  } else if ($('#filHold.active').length) {
    //IF FILTER HOLD ONLY SHOW ONHOLD
    resetFilters();
    $('#closedPanel').hide();
    $('.Open').hide();
    $('.Progress').hide();
    $('.resetCol').css("display", "inline");
  } else if ($('#filProgress.active').length) {
    //IF FILTER PROGRESS ONLY SHOW IN PROGRESS
    resetFilters();
    $('#closedPanel').hide();
    $('.Hold').hide();
    $('.Open').hide();
    $('.resetCol').css("display", "inline");
  } else if ($('#filClosed.active').length) {
    //IF FILTER CLOSED ONLY SHOW CLOSED
    resetFilters();
    $('#activePanel').hide();
    $('.resetCol').css("display", "inline");
  }
}

//FILTER BUTTON CLICKED
$('.radio').click(function () {
  //IF ALREADY ACTIVE
  if($(this).hasClass('active')) {
    $(this).removeClass('active')
    resetFilters();
  } else {
    $('.radio').removeClass('active');
    $(this).addClass('active');
    filter();
  }
});

$('.act-header').click(function () {
  //IF ALREADY ACTIVE
  //DO SORTING
});

function resetFilters() {
  $('#closedPanel').show();
  $('#activePanel').show();
  $('.Open').show();
  $('.Progress').show();
  $('.Hold').show();
}

function resetDashboard() {
  location.reload();
}


//                     str     str            str        str           str              str
function addActiveOrder(circle, customer_name, repair_id, date_entered, completion_time, tech) {
  var table = document.getElementById("activeOrders")
  var link = "./ticket.html?t=" + repair_id; // setup anchor link
  var anchor = document.createElement("a"); // create anchor
  anchor.setAttribute('href', link); // set anchor href
  var row = document.createElement("div"); // create row
  row.setAttribute('class', 'row' + ' ' + circle); // make it a row class with its status as a class

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

// CREATE NEW TICKET
function newTicket() {
  //retrieve users previous ticket number

  //increment ticket number
  var new_id = 'NEW';
  //set users new last ticket number

  //call ticket page with new ticket and its new ticket number
  window.location.href = "./ticket.html?t=" + new_id;
}