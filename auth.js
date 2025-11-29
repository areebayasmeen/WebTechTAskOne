// ===== GLOBAL CART =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedItem = null;

// ===== LICENSE SELECTION =====
$(document).on("click", ".select-item", function () {
    selectedItem = {
        name: $(this).data("name"),
        price: Number($(this).data("price"))
    };
    $("#dropdownMenuButton1").text(selectedItem.name);
});

// ===== ADD TO CART AND REDIRECT =====
$("#addToCartBtn").on("click", function (e) {
    e.preventDefault(); // stop link from navigating immediately

    if (!selectedItem) {
        alert("Please select a license first!");
        return;
    }

    cart.push(selectedItem);  // save correctly
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(selectedItem.name + " added to cart!");

    // now we manually redirect to form.html
    window.location.href = "./form.html";
});

function updateOrderSummary() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    $("#orderList").html("");
    let subtotal = 0;

    cartItems.forEach(item => {
        subtotal += item.price;

        $("#orderList").append(`
            <li class="list-group-item d-flex justify-content-between">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            </li>
        `);
    });

    let tax = subtotal * 0.10;
    let grandTotal = subtotal + tax;

    $("#subtotal").text(`$${subtotal.toFixed(2)}`);
    $("#tax").text(`$${tax.toFixed(2)}`);
    $("#grandTotal").text(`$${grandTotal.toFixed(2)}`);
}

$(document).ready(function () {
    updateOrderSummary();
});


