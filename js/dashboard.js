// JUST TO TEST TO SHOW THE DASHBOARD
window.onload = function WindowLoad(event) {
    addActiveOrder("open","Michael Blue","015826","11/11/11","20 Hours","Ziltoild");
    addActiveOrder("inProgress","Donald J. Tump","000666","66/66/66","XXX Hours","Democracy");
    addActiveOrder("onHold","Actual President","012345","01/23/45","soon","doge");
    addActiveOrder("open","These are temporary","located","in the file","dashboard.js","with instruction");

    addClosedOrder("Michael Blue","015826","11/11/11","12/12/12","Completed Successfully");
    addClosedOrder("Donald J. Tump","000666","66/66/66","12/12/12","Completed Successfully");
    addClosedOrder("Actual President","012345","01/23/45","12/12/12","Completed Successfully");
}

function showOpen()
{
  resetActiveOrders();
  // re-fill in open orders using addActiveOrder()

}

function showOnHold()
{
  resetActiveOrders();
  // re-fill in on-hold orders using addActiveOrder()

}

function showInProgress()
{
  resetActiveOrders();
  // re-fill in in progress orders using addActiveOrder()

}

function showClosed()
{
  resetClosedOrders();
  // re-fill in closed orders using addClosedOrder()

}

//                     str     str            str        str           str              str
function addActiveOrder(circle, customer_name, repair_id, date_entered, completion_time, tech)
{
    var table = document.getElementById("activeOrders");
    var row = table.insertRow(2);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    if (circle == "open")
      cell1.innerHTML = "<img src=./Resources/dashboard/circle-open.png>";
    else if (circle == "onHold")
      cell1.innerHTML = "<img src=./Resources/dashboard/circle-onHold.png>";
    else if (circle == "inProgress")
      cell1.innerHTML ="<img src=./Resources/dashboard/circle-inProgress.png>";

    cell2.innerHTML = customer_name;
    cell3.innerHTML = repair_id;
    cell4.innerHTML = date_entered;
    cell5.innerHTML = completion_time;
    cell6.innerHTML = tech;
}

//                      str            str        str           str          str
function addClosedOrder(customer_name, repair_id, date_entered, date_closed, resolution_code)
{
    var table = document.getElementById("closedOrders");
    var row = table.insertRow(2);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    cell1.innerHTML = "<img src=./Resources/dashboard/circle-closed.png>";
    cell2.innerHTML = customer_name;
    cell3.innerHTML = repair_id;
    cell4.innerHTML = date_entered;
    cell5.innerHTML = date_closed
    cell6.innerHTML = resolution_code;
}

function resetActiveOrders()
{
  var table        = document.getElementById("activeOrders");
  var table_length = table.rows.length;

  for(i = table_length-1; i>1; i--)
  {
    table.deleteRow(i);
  }
}

function resetClosedOrders()
{
  var table        = document.getElementById("closedOrders");
  var table_length = table.rows.length;

  for(i = table_length-1; i>1; i--)
  {
    table.deleteRow(i);
  }
}
