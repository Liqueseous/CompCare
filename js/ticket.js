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
jQuery(document).ready(function ($) {
  changeStatusIcon("status_field", "status_img");
  formSetup();
});

function enableEdit() {
  document.querySelector("#imgleft").innerHTML = "<a href=\"javascript:disableEdit();\" alt=\"Cancel Changes\"><img src=./resources/ticket/cancel.svg></a>"
  document.querySelector("#imgright").innerHTML = "<a href=\"javascript:save();\" alt=\"Save Changes\"><img src=./resources/ticket/save.svg></a>"

  var inputs = document.querySelectorAll("input, select, textarea")
  var labels = document.querySelectorAll(".form-group label")

  inputs.forEach(function (e) {
    e.removeAttribute('disabled');
  });
  labels.forEach(function (e) {
    e.style.color = "#000"
  });
}

function save() {
  disableEdit();
}

function disableEdit() {
  document.querySelector("#imgleft").innerHTML = "<a href=\"dashboard.html\" alt=\"Go Back\"><img src=./resources/ticket/back.svg></a>"
  document.querySelector("#imgright").innerHTML = "<a href=\"javascript:enableEdit();\" alt=\"Edit\"><img src=./resources/ticket/edit.svg>"

  var inputs = document.querySelectorAll("input, select, textarea");
  var labels = document.querySelectorAll(".form-group label");

  inputs.forEach(function (e) {
    e.setAttribute('disabled', '');
  });
  labels.forEach(function (e) {
    e.style.color = "#777"
  });
}