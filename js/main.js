// LOTTIE FILES
var preloader = bodymovin.loadAnimation({
  container: document.getElementById('preloader'), // Required
  path: './resources/lottie/ripple_loading_animation.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "Preloader", // Name for future reference. Optional.
});

// ANIME.JS
// NEED TO GET WORKING
// var titleEase = anime({
//   targets: '#content h1, #content h3, #content hr, #content button',
//   opacity: 0,
//   delay: 500,
//   duration: 1000,
//   direction: 'reverse',
//   easing: 'linear'
// });

// SLIDE IN ANIMATION FOR FORMS
var inEase = anime({
  targets: '#loginModal , #signUpModal',
  translateY: -1000,
  delay: 0,
  duration: 1000,
  direction: 'reverse',
  easing: 'easeInCubic'
});

// SLIDE OUT ANIMATION FOR FORMS
var outEase = anime({
  targets: '#loginModal , #signUpModal',
  translateY: -1000,
  delay: 0,
  duration: 1000,
  direction: 'standard',
  easing: 'easeOutCubic'
});

// DOCUMENT INFORMATION HAS BEEN RECEIVED
$(document).ready(function () {

  $('body').removeClass('white');
  $('body').addClass('back');

  // LOGIN FORM VALIDATION
  $('#loginForm').validate({ // initialize the plugin
    rules: {
      email: {
        required: true,
        email: true
      },
      pass: {
        required: true,
        minlength: 8
      }
    }
  });

  // SIGNUP FORM VALIDATION
  $('#signUpForm').validate({ // initialize the plugin
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      email2: {
        required: true,
        email: true,
        equalTo: "#signUpForm #email"
      },
      pass: {
        required: true,
        minlength: 8
      },
      pass2: {
        required: true,
        minlength: 8,
        equalTo: "#signUpForm #pass"
      }
    },
    messages: {
      email2: {
        equalTo: "Email does not match"
      },
      pass2: {
        equalTo: "Passwords do not match"
      }
    }
  });
  // CONTACT FORM VALIDATION
  $('#contactForm').validate({ // initialize the plugin
    rules: {
      name: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      message: {
        required: true,
      }
    },
    submitHandler: function (form) {
      e.preventDefault();
      alert("EMAIL SENT EVENT");
      form.submit();
    }
  });

  // SIGNUP FORM SUBMIT
  $("#signUpForm").on('submit', function (e) {
    e.preventDefault();
    const data = {
      name: $("#signUpForm #name").val(),
      email: $("#signUpForm #email").val(),
      password: $("#signUpForm #pass").val()
    }
    $.post('https://afternoon-waters-42339.herokuapp.com/signup', data)
      .done((response) => {
        const resData = JSON.parse(JSON.stringify(response));
        const signupMessage = resData.message;
        const token = resData.token;
        console.log(signupMessage);
        localStorage.setItem('jwtToken', token);
      })
      .fail((error) => {
        const signupErrorMsg = JSON.parse(JSON.stringify(error)).responseJSON.error.message;
        console.log(signupErrorMsg);
      });
  });

  // LOGIN FORM SUBMIT
  $("#loginForm").on('submit', function (e) {
    e.preventDefault();
    const data = {
      email: $("#loginForm #email").val(),
      password: $("#loginForm #pass").val()
    }
    $.post('https://afternoon-waters-42339.herokuapp.com/login', data)
      .done((response) => {
        const resData = JSON.parse(JSON.stringify(response));
        const loginMessage = resData.message;
        const token = resData.token;
        console.log(loginMessage);
        localStorage.setItem('jwtToken', token);
      })
      .fail((error) => {
        const loginErrMsg = JSON.parse(JSON.stringify(error)).responseJSON.error.message;
        console.log(loginErrMsg);
      });
  });

  // ADD A SCROLL TO ELEMENT FUNCTION ON CLICK
  jQuery.fn.extend({
    scrollTo: function (speed, easing) {
      return this.each(function () {
        var targetOffset = $(this).offset().top;
        $('html,body').animate({
          scrollTop: targetOffset
        }, speed, easing);
      });
    }
  });

  // SCROLL TO CERTAIN SECTION OF PAGE WHEN BUTTON IS CLICKED
  $(".scroll").click(function (event) {
    $('#section').scrollTo(900, 'easeInOutQuint');
  });

  $(".inBut").click(function (event) {
    // FORM IN ANIMATION
    inEase.restart();
  });
  $(".outBut").click(function (event) {
    var logForm = document.querySelector("#loginForm");
    var signForm = document.querySelector("#loginForm");
    var inputs = document.querySelectorAll("input.form-control")
    // FORM OUT ANIMATION
    outEase.restart();
    // HIDE FORM AFTER ANIMATION
    window.setTimeout(function () {
      $('#loginModal').modal('hide');
      $('#signUpModal').modal('hide');
    }, 500);
    // RESET FORM
    logForm.reset();
    // REMOVE ERRORS AND VALIDATION HIGHLIGHTING ON FIELDS
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("valid");
      inputs[i].classList.remove("error");
    }

  });


});

//ALL CONTENT ON PAGE HAS LOADED
$(window).on('load', function () {
  $('#loader').hide();
  $('#pagecontent').show();
  $('body').addClass('white');
  preloader.stop();
});