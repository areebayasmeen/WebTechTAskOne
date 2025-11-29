$(document).ready(function () {
    // Show/hide card fields based on payment method
    $("input[name='payment']").change(function () {
        if ($("#card").prop("checked")) {
            $("#cardFields").removeClass("d-none");
        } else {
            $("#cardFields").addClass("d-none");
            $("#cardFields input").removeClass("is-invalid");
        }
    });

    // Restrict names: letters and space only
    $("#firstName, #lastName, #cardName").on("input", function () {
        this.value = this.value.replace(/[^A-Za-z\s]/g, '');
    });

    // Restrict phone: digits only
    $("#phone, #cardNumber, #cvv").on("input", function () {
        this.value = this.value.replace(/\D/g, '');
    });

    // Form submission validation
        const nameRegex = /^[A-Za-z\s]{3,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,}$/;
        const postalRegex = /^\d{4,6}$/;

        $("#checkoutBtn").click(function () {
            let isValid = true;

            // Reset errors
            $("input, select").removeClass("is-invalid");
            $(".invalid-feedback").hide();
            $("#termsError").hide();

            // Validate First Name
            if (!nameRegex.test($("#firstName").val().trim())) {
                $("#firstName").addClass("is-invalid").siblings(".invalid-feedback").show();
                isValid = false;
            }

            // Validate Last Name
            if (!nameRegex.test($("#lastName").val().trim())) {
                $("#lastName").addClass("is-invalid").siblings(".invalid-feedback").show();
                isValid = false;
            }

            // Validate Email
            if (!emailRegex.test($("#email").val().trim())) {
                $("#email").addClass("is-invalid").siblings(".invalid-feedback").show();
                isValid = false;
            }

            // Validate Phone
            if (!phoneRegex.test($("#phone").val().trim())) {
                $("#phone").addClass("is-invalid").siblings(".invalid-feedback").show();
                isValid = false;
            }

            // Validate Address
            if (!$("#address").val().trim()) {
                $("#address").addClass("is-invalid").siblings(".invalid-feedback").show();
                isValid = false;
            }

            // Validate City
            if (!$("#city").val().trim()) {
                $("#city").addClass("is-invalid").siblings(".invalid-feedback").show();
                isValid = false;
            }

            // Validate Postal
            if (!postalRegex.test($("#postal").val().trim())) {
                $("#postal").addClass("is-invalid").siblings(".invalid-feedback").show();
                isValid = false;
            }

            // Validate Country
            if (!$("#country").val()) {
                $("#country").addClass("is-invalid").siblings(".invalid-feedback").show();
                isValid = false;
            }

            // Validate Terms checkbox (show only if unchecked on click)
            if (!$("#terms").prop("checked")) {
                $("#termsError").removeClass("d-none").addClass("d-block");
                isValid = false;
            } else {
                $("#termsError").removeClass("d-block").addClass("d-none");
            }


            // If everything is valid → redirect 🚀
            if (isValid) {
                window.location.href = "./payment.html";
            } else {
                // Auto scroll to first error field ✨
                $('html, body').animate({
                    scrollTop: $(".is-invalid").first().offset()?.top - 40
                }, 500);
            }
        });

        // Input restrictions
        $("#firstName, #lastName").on("input", function () {
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
        });

        $("#phone, #postal").on("input", function () {
            this.value = this.value.replace(/\D/g, '');
        });

//payment 

      $(".payOption").on("change", function () {
        const value = $(this).val();
        if (value === "card") {
          $("#cardDetails").removeClass("d-none");
        } else {
          $("#cardDetails").addClass("d-none");
        }
      });


      $("#termsCheck").on("change", function () {
        $("#placeOrderBtn").prop("disabled", !this.checked);
      });

     $("#placeOrderBtn").click(function () {

    if (!$("input[name='paymentMethod']:checked").length) {
        alert(" Please select a payment method first!");
        return; // stop execution + DO NOT place order
    }

    alert("Your order has been placed successfully! ");
});

});
