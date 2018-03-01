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
      alert("LOGIN EVENT");
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
        equalTo: "#email"
      },
      pass: {
        required: true,
        minlength: 8
      },
      pass2: {
        required: true,
        minlength: 8,
        equalTo: "#pass"
      }
    },
    submitHandler: function (form) {
      form.preventDefault();
      alert("SIGNUP EVENT");
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

