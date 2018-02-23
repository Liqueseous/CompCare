$(document).ready(function () {

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
      alert("loginEvent");
      form.submit();
    }
  });
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
      alert("loginEvent");
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
      alert("loginEvent");
      form.submit();
    }
  });

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

