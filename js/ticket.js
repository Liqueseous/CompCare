function changeStatusIcon(listener, icon) {
  var status = document.getElementById(listener);
  var icon = document.getElementById(icon);
  if (status.value == "Open") {
    icon.setAttribute("src", "/resources/dashboard/circle-open.svg");
  } else if (status.value == "In Progress") {
    icon.setAttribute("src", "/resources/dashboard/circle-inProgress.svg");
  } else if (status.value == "On Hold") {
    icon.setAttribute("src", "/resources/dashboard/circle-onHold.svg");
  } else {
    icon.setAttribute("src", "/resources/dashboard/circle-closed.svg");
  }
}

function checkIcon() {
  changeStatusIcon("status_field", "status_img");
}
jQuery(document).ready(function ($) {
  changeStatusIcon("status_field", "status_img");
});