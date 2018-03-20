// LOTTIE FILES
var preloader = bodymovin.loadAnimation({
  container: document.getElementById('preloader'), // Required
  path: '../resources/lottie/ripple_loading_animation.json', // Required
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

var inEase = anime({
  targets: '#loginModal , #signUpModal',
  translateY: -500,
  delay: 10000,
  duration: 1000,
  direction: 'reverse',
  easing: 'easeInCubic'
});

// WORK IN PROGRESS
var elInEase = anime({
  targets: '#loginModal small , #loginModal input , #loginModal label , #signUpModal , #signUpModal input , #signUpModal label',
  translateX: 200,
  delay: 1000000,
  duration: 500,
  direction: 'reverse',
  easing: 'easeInCubic'
})

var outEase = anime({
  targets: '#loginModal , #signUpModal',
  translateY: -500,
  delay: 10000,
  duration: 1000,
  direction: 'standard',
  easing: 'easeInCubic'
});

// DOCUMENT INFORMATION HAS BEEN RECEIVED
$(document).ready(function () {

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
    },
    submitHandler: function (form) {
      form.submit();
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
    submitHandler: function (form) {
      form.submit();
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
    $.post('https://afternoon-waters-42339.herokuapp.com/signup', {
      email: $("#signUpForm #email").val(),
      password: $("#signUpForm #pass").val()
    });
  });

  // LOGIN FORM SUBMIT
  $("#loginForm").on('submit', function (e) {
    e.preventDefault();
    $.post('https://afternoon-waters-42339.herokuapp.com/login', {
      email: $("#loginForm #email").val(),
      password: $("#loginForm #pass").val()
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

  $(".scroll").click(function (event) {
    $('#section').scrollTo(900, 'easeInOutQuint');
  });

  $(".inBut").click(function (event) {
    inEase.restart();
    // elInEase.restart();
  });
  $(".outBut").click(function (event) {
    outEase.restart();
    // elOutEase.restart();
  });

});

//ALL CONTENT CON PAGE HAS LOADED
$(window).on('load', function () {
  $('#loader').hide();
  $('#pagecontent').show();
  $('body').addClass('back');
  preloader.stop();
});