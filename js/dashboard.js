// JUST TO TEST TO SHOW THE DASHBOARD
$(window).on('load', function () {
  addActiveOrder("open", "Michael Blue", "015826", "11/11/11", "20 Hours", "Ziltoild");
  addActiveOrder("inProgress", "Donald J. Tump", "000666", "66/66/66", "XXX Hours", "Democracy");
  addActiveOrder("onHold", "Actual President", "012345", "01/23/45", "soon", "doge");
  addActiveOrder("open", "These are temporary", "located", "in the file", "dashboard.js", "with instruction");

  addClosedOrder("Michael Blue", "015826", "11/11/11", "12/12/12", "Completed Successfully");
  addClosedOrder("Donald J. Tump", "000666", "66/66/66", "12/12/12", "Completed Successfully");
  addClosedOrder("Actual President", "012345", "01/23/45", "12/12/12", "Completed Successfully");
});

jQuery(document).ready(function ($) {
  $(".clickable-row").click(function () {
    window.location = $(this).data("href");
  });
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
  var link = "./ticket.html?" + repair_id; // setup anchor link
  var anchor = document.createElement("a"); // create anchor
  anchor.setAttribute('href', link); // set anchor href
  var row = document.createElement("div"); // create row
  row.setAttribute('class', 'row'); // make it a row class

  //Set status image depending on status
  //Put all elements into a row
  if (circle == "open")
    row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-1\"><img src=./resources/dashboard/circle-open.svg></div>");
  else if (circle == "onHold")
    row.insertAdjacentHTML('beforeend', "<div class=\"col-sm-1\"><img src=./resources/dashboard/circle-onHold.svg></div>");
  else if (circle == "inProgress")
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
  var link = "./ticket.html?" + repair_id; // setup anchor link
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