const allTickets = [];

// Get USER Tickets from API
$(window).on('load', function () {
  // LOAD TOOLTIPSTER PLUGIN
  $('.tipster').tooltipster();
  $('.tipster-top').tooltipster( {
    side: ['top'],
  });

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
            assignee,
            resolutionCode
          } = response[i];
          const ticket = { 
            status,
            customerName,
            ticketNumber,
            dateReceived,
            estComplDate,
            assignee,
            resolutionCode
          }
          allTickets.push(ticket);
          if (status !== 'Closed') {
            addActiveOrder(status, customerName, ticketNumber, dateReceived, estComplDate, assignee);
          } else {
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
  if($(this).hasClass('active')) {
    $(this).removeClass('active')
    resetActiveSort();
  } else {
    $('.act-header').removeClass('active');
    $(this).addClass('active');
    activeSort();
  }
});

$('.clos-header').click(function () {
  //IF ALREADY ACTIVE
  //DO SORTING
  if($(this).hasClass('active')) {
    $(this).removeClass('active')
    resetClosedSort();
  } else {
    $('.clos-header').removeClass('active');
    $(this).addClass('active');
    closedSort();
  }
});

function activeSort() {
  let sortedTickets = allTickets.filter(ticket => ticket.status !== 'Closed');
  $('#activeOrders').empty();  
  if($('.status.act-header.active').length) {
    sortedTickets.sort(function(a, b) {    
      if (a.status > b.status) return 1;
      if (a.status < b.status) return -1;
      return 0;
    });
  }
  else if($('.cx.act-header.active').length) {
    sortedTickets.sort(function(a, b) {
      if ((a.customerName.toLowerCase()) > (b.customerName.toLowerCase())) return 1;
      if ((a.customerName.toLowerCase()) < (b.customerName.toLowerCase())) return -1;
      return 0;
    });
  }
  else if($('.id.act-header.active').length) {
    sortedTickets.sort(function(a, b) {
      if (a.ticketNumber > b.ticketNumber) return 1;
      if (a.ticketNumber < b.ticketNumber) return -1;
      return 0;
    });
  }
  else if($('.dEntered.act-header.active').length) {
    sortedTickets.sort(function(a, b) {
      if (a.dateReceived.split('-').join('') > b.dateReceived.split('-').join('')) return 1;
      if (a.dateReceived.split('-').join('') < b.dateReceived.split('-').join('')) return -1;
      return 0;
    });
  }
  else if($('.ttc.act-header.active').length) {
    sortedTickets.sort(function(a, b) {
      if (a.estComplDate.split('-').join('') > b.estComplDate.split('-').join('')) return 1;
      if (a.estComplDate.split('-').join('') < b.estComplDate.split('-').join('')) return -1;
      return 0;
    });
  }
  else if($('.tech.act-header.active').length) {
    sortedTickets.sort(function(a, b) {
      if ((a.assignee.toLowerCase()) > (b.assignee.toLowerCase())) return 1;
      if ((a.assignee.toLowerCase()) < (b.assignee.toLowerCase())) return -1;
      return 0;
    });
  }
  for (let i = 0; i < sortedTickets.length; i++) {
    if (sortedTickets[i].status !== 'Closed') {
      addActiveOrder(sortedTickets[i].status, sortedTickets[i].customerName, sortedTickets[i].ticketNumber, sortedTickets[i].dateReceived, sortedTickets[i].estComplDate, sortedTickets[i].assignee);
    }
  }
}

function resetActiveSort() {
  $('#activeOrders').empty();
  for (let i = 0; i < allTickets.length; i++) {
    if (allTickets[i].status !== 'Closed') {
      addActiveOrder(allTickets[i].status, allTickets[i].customerName, allTickets[i].ticketNumber, allTickets[i].dateReceived, allTickets[i].estComplDate, allTickets[i].assignee);
    }
  }
}

function closedSort() {
  let sortedTickets = allTickets.filter(ticket => ticket.status === 'Closed');
  $('#closedOrders').empty();  
  if($('.status.clos-header.active').length) {
    sortedTickets.sort(function(a, b) {    
      if (a.status > b.status) return 1;
      if (a.status < b.status) return -1;
      return 0;
    });
  }
  else if($('.cx.clos-header.active').length) {
    sortedTickets.sort(function(a, b) {
      if ((a.customerName.toLowerCase()) > (b.customerName.toLowerCase())) return 1;
      if ((a.customerName.toLowerCase()) < (b.customerName.toLowerCase())) return -1;
      return 0;
    });
  }
  else if($('.id.clos-header.active').length) {
    sortedTickets.sort(function(a, b) {
      if (a.ticketNumber > b.ticketNumber) return 1;
      if (a.ticketNumber < b.ticketNumber) return -1;
      return 0;
    });
  }
  else if($('.dEntered.clos-header.active').length) {
    sortedTickets.sort(function(a, b) {
      if (a.dateReceived.split('-').join('') > b.dateReceived.split('-').join('')) return 1;
      if (a.dateReceived.split('-').join('') < b.dateReceived.split('-').join('')) return -1;
      return 0;
    });
  }
  else if($('.dClosed.clos-header.active').length) {
    sortedTickets.sort(function(a, b) {
      if (a.estComplDate.split('-').join('') > b.estComplDate.split('-').join('')) return 1;
      if (a.estComplDate.split('-').join('') < b.estComplDate.split('-').join('')) return -1;
      return 0;
    });
  }
  else if($('.res.clos-header.active').length) {
    sortedTickets.sort(function(a, b) {
      if ((a.resolutionCode.toLowerCase()) > (b.resolutionCode.toLowerCase())) return 1;
      if ((a.resolutionCode.toLowerCase()) < (b.resolutionCode.toLowerCase())) return -1;
      return 0;
    });
  }
  for (let i = 0; i < sortedTickets.length; i++) {
    if (sortedTickets[i].status === 'Closed') {
      addClosedOrder(sortedTickets[i].customerName, sortedTickets[i].ticketNumber, sortedTickets[i].dateReceived, sortedTickets[i].estComplDate, sortedTickets[i].resolutionCode);
    }
  }
}

function resetClosedSort() {
  $('#closedOrders').empty();  
  for (let i = 0; i < allTickets.length; i++) {
    if (allTickets[i].status === 'Closed') {
      addClosedOrder(allTickets[i].customerName, allTickets[i].ticketNumber, allTickets[i].dateReceived, allTickets[i].estComplDate, allTickets[i].resolutionCode);
    }
  }
}

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