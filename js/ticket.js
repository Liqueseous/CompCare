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
}

function save() {
  disableEdit();
}

function disableEdit() {

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
}