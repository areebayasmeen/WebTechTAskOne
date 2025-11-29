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
    $("#checkoutForm").submit(function (e) {
        e.preventDefault();
        let isValid = true;

        // Reset previous errors
        $(".form-control").removeClass("is-invalid");
        $(".invalid-feedback").hide();

        // Regex patterns
        const nameRegex = /^[A-Za-z\s]{3,}$/; // letters only, min 3 chars
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,}$/; // digits only, min 10

        // First name
        if (!nameRegex.test($("#firstName").val().trim())) {
            $("#firstName").addClass("is-invalid");
            $("#firstName").next(".invalid-feedback").show();
            isValid = false;
        }

        // Last name
        if (!nameRegex.test($("#lastName").val().trim())) {
            $("#lastName").addClass("is-invalid");
            $("#lastName").next(".invalid-feedback").show();
            isValid = false;
        }

        // Email
        if (!emailRegex.test($("#email").val().trim())) {
            $("#email").addClass("is-invalid");
            $("#email").next(".invalid-feedback").show();
            isValid = false;
        }

        // Phone
        if (!phoneRegex.test($("#phone").val().trim())) {
            $("#phone").addClass("is-invalid");
            $("#phone").next(".invalid-feedback").show();
            isValid = false;
        }

        // Address
        if ($("#address").val().trim() === "") {
            $("#address").addClass("is-invalid");
            $("#address").next(".invalid-feedback").show();
            isValid = false;
        }

        // City
        if ($("#city").val().trim() === "") {
            $("#city").addClass("is-invalid");
            $("#city").next(".invalid-feedback").show();
            isValid = false;
        }

        // Postal code
        if (!/^\d{4,6}$/.test($("#postal").val().trim())) {
            $("#postal").addClass("is-invalid");
            $("#postal").next(".invalid-feedback").show();
            isValid = false;
        }

        // Country
        if ($("#country").val() === "") {
            $("#country").addClass("is-invalid");
            $("#country").next(".invalid-feedback").show();
            isValid = false;
        }

        // Payment method
        if (!$("input[name='payment']:checked").val()) {
            $("#paymentError").show();
            isValid = false;
        } else {
            $("#paymentError").hide();
        }

        // Card fields validation if card selected
        if ($("#card").prop("checked")) {
            $("#cardFields input").each(function () {
                if ($(this).val().trim() === "") {
                    $(this).addClass("is-invalid");
                    $(this).next(".invalid-feedback").show();
                    isValid = false;
                }
            });
        }

        // Terms checkbox
        if (!$("#terms").prop("checked")) {
            $("#termsError").show();
            isValid = false;
        } else {
            $("#termsError").hide();
        }

        // Scroll to first invalid field
        if (!isValid) {
            $('html, body').animate({
                scrollTop: $(".is-invalid").first().offset().top - 50
            }, 500);
            return false;
        }

        window.location.href = "./payment.html";

    });

});
