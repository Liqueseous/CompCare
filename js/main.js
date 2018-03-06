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
      preventDefault(e);
      alert("EMAIL SENT EVENT");
      form.submit();
    }
  });

// SIGNUP FORM SUBMIT
  $("#signUpForm").on('submit', function() {
    $.post('http://localhost:8000/user/signup',
    {
      email: $("#signUpForm #email").val(),
      password: $("#signUpForm #pass").val()
    });
  });

// LOGIN FORM SUBMIT
  $("#loginForm").on('submit', function() {
    $.post('http://localhost:8000/user/login',
    {
      email: $("#loginForm #email").val(),
      password: $("#loginForm #pass").val()
    });
  });

// ADD A SCROLL TO ELEMENT FUNCTION ON CLICK
  jQuery.fn.extend({
    scrollTo : function(speed, easing) {
      return this.each(function() {
        var targetOffset = $(this).offset().top;
        $('html,body').animate({scrollTop: targetOffset}, speed, easing);
      });
    }
  });

    $(".scroll").click(function (event){
        $('#section').scrollTo(900, 'easeInOutQuint');
    });
});

