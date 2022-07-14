// Declare Variables
let cartTotal = 0;
let cartArray = [];
let currentCartValue = JSON.parse(sessionStorage.getItem("shoppingCart"));
if (currentCartValue != null) {
    cartArray = currentCartValue;
}
let shoppingCart = JSON.stringify(cartArray);
sessionStorage.setItem("shoppingCart", shoppingCart);

//Check if the user is on the basket page and update it on load, alternatively update the Offcanvas cart on page load
$(document).ready(function() {
    if ($(location).attr("href").indexOf('Basket') > -1) {
        updateBasketView();
    } else {
        updateCartView();
        $(window).load(function() {
            updateCartCountdisplay();
        });
    }
});

//Function to add item to cart from main item page, checking if all selections have been made
function addToCart(e) {
    e.preventDefault();
    if ($('#variantSelection option').filter(":selected").text() == 'Please select one...') {
        alert("Please ensure you choose a type!");
        return;
    } else {
        let nameToAdd = $('#itemHeading').text();
        let variantToAdd = $('#variantSelection option').filter(":selected").text();
        let quantityToAdd = $('#quantitySelection').val();
        let priceToAdd = $('#itemPrice').text();
        let imgsrcToAdd = $('.carousel-inner').children(".carousel-item").first().children('img').attr('src');
        if (Array.isArray(cartArray) && cartArray.length != 0) {
            if (checkIfItemIsInCart(nameToAdd, variantToAdd) == false) {
                let itemToAdd = new cartItem(nameToAdd, variantToAdd, quantityToAdd, priceToAdd, imgsrcToAdd);
            } else {
                handleUpdateItemInCart(nameToAdd, variantToAdd, quantityToAdd);
            }
        } else if (cartArray.length == 0) {
            let itemToAdd = new cartItem(nameToAdd, variantToAdd, quantityToAdd, priceToAdd, imgsrcToAdd);
        }
        updateCartInSessionStorage();
        updateCartCountdisplay();
        updateCartView();
        $('#offcanvasRight').offcanvas('show');
    }
}

//Quick Add to cart - with default colour / size provided for each item
function quickAddToCart(e, defaultOption) {
    e.preventDefault();
    let parentElement = $(event.target).parent()
    let nameToAdd = parentElement.find('h5').html();
    let variantToAdd = defaultOption;
    let quantityToAdd = 1;
    let priceToAdd = parentElement.find('.itemPrice').text();
    let imgsrcToAdd = parentElement.find('img').attr('src');
    if (Array.isArray(cartArray) && cartArray.length != 0) {
        if (checkIfItemIsInCart(nameToAdd, variantToAdd) == false) {
            let itemToAdd = new cartItem(nameToAdd, variantToAdd, quantityToAdd, priceToAdd, imgsrcToAdd);
        } else {
            handleUpdateItemInCart(nameToAdd, variantToAdd, quantityToAdd);
        }
    } else if (cartArray.length == 0) {
        let itemToAdd = new cartItem(nameToAdd, variantToAdd, quantityToAdd, priceToAdd, imgsrcToAdd);
    }
    updateCartInSessionStorage();
    updateCartCountdisplay();
    updateCartView();
    $('#offcanvasRight').offcanvas('show');
}

//Create each cart item and add it to the array
function cartItem(name, variant, quantity, price, imgsrc) {
    this.name = name;
    this.variant = variant;
    this.quantity = quantity;
    this.price = parseFloat(price);
    this.imgsrc = imgsrc;
    //Add current Object to drinks Array
    cartArray.push(this);
}

//Check if the item (based on the selected option for the product) is in the cart to warn the user before adding another
function checkIfItemIsInCart(name, variant) {
    let isInCart = false;
    cartArray.forEach(function(arrayItem) {
        if (arrayItem.name == name && arrayItem.variant == variant) {
            return isInCart = true;
        } else {
            return;
        }
    });
    if (isInCart == true) {
        return true;
    } else return false;
}
//Warn user and confirm if they would like more or not
function handleUpdateItemInCart(nameToAdd, variantToAdd, quantityToAdd) {
    if (confirm("You already have this item in your cart.\n\n Would you like to add more?") == true) {
        cartArray.forEach(function(arrayItem) {
            if (arrayItem.name == nameToAdd && arrayItem.variant == variantToAdd) {
                arrayItem.quantity = parseInt(arrayItem.quantity) + parseInt(quantityToAdd);
                return;
            }
        });
    }
}
//Remopve the selected item from the cart (and sessionStorage)
function removeItemfromCart(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to remove this item?") == true) {
        let parentElement = $(event.target).parents('.row');
        let nameofItem = parentElement.find('h6').text();
        cartArray.splice(cartArray.findIndex(v => v.name === nameofItem), 1);
        updateCartInSessionStorage();
        if ($(location).attr("href").indexOf('Basket') > -1) {
            updateBasketView();
        } else {
            updateCartCountdisplay();
            updateCartView();
        }
    }
}
//Update the array of items in sessionStorage
function updateCartInSessionStorage() {
    shoppingCart = JSON.stringify(cartArray);
    sessionStorage.setItem("shoppingCart", shoppingCart);
}

//Show the user how many items are in their cart 
function updateCartCountdisplay() {
    let cartIconParent = $('.bi-cart').parent();
    let cartItemCount = 0;
    cartArray.forEach(function(arrayItem) {
        cartItemCount = cartItemCount + parseInt(arrayItem.quantity);
    });
    if (cartItemCount == 0) {
        cartIconParent.children("span").remove();
    } else if (cartItemCount != 0) {
        const badge = document.createElement("span");
        badge.setAttribute("class", "position-absolute translate-middle badge rounded-pill bg-danger");
        badge.setAttribute("style", "margin-top: -2.25em;");
        cartIconParent[0].appendChild(badge);
        $('.badge').html(cartItemCount.toString());

    }
}

//Update the Offcanvas (sidebar) Cart view
function updateCartView() {
    let sideCartContainer = $('#sideCartContainer');
    sideCartContainer.html('');
    if (cartArray.length == 0) {
        $('#emptyCart').show();
        $('#checkoutLink').hide();
    } else {
        cartArray.forEach(function(arrayItem) {
            let sideCartElement = createRowDivElement();
            let imgContainer = createColDivElement(4);
            let itemImage = createImageElement(arrayItem.imgsrc);
            imgContainer.appendChild(itemImage);
            let textContainer = createColDivElement(5);
            let itemTitle = createHeadingElement(arrayItem.name);
            let itemVariant = createTextElement(arrayItem.variant);
            let itemQuantity = createTextElement("Quantity: " + arrayItem.quantity);
            textContainer.appendChild(itemTitle);
            textContainer.appendChild(itemVariant);
            textContainer.appendChild(itemQuantity);
            let itemTotalContainer = createColDivElement(2);
            let itemTotal = parseFloat(arrayItem.quantity * arrayItem.price).toFixed(2);
            let itemTotalText = createTextElement("R" + itemTotal);
            let removeItemButton = createLinkElement("Remove", "#", "removeItemfromCart(event)");
            itemTotalContainer.appendChild(itemTotalText);
            itemTotalContainer.appendChild(removeItemButton);
            sideCartElement.appendChild(imgContainer);
            sideCartElement.appendChild(textContainer);
            sideCartElement.appendChild(itemTotalContainer);
            sideCartContainer[0].appendChild(sideCartElement);
        });
        let finalTotalRow = createRowDivElement();
        let finalTextContainer = createColDivElement(3);
        let vatText = createHeadingElement("Vat Amount (incl):");
        vatText.setAttribute("class", "text-white text-end");
        let finalText = createHeadingElement("Cart Total:");
        finalText.setAttribute("class", "text-white text-end");
        finalTextContainer.appendChild(vatText);
        finalTextContainer.appendChild(finalText);
        finalTextContainer.setAttribute("class", "offset-3 col-6");
        let finalTotalContainer = createColDivElement(3);
        let finalTotal = createHeadingElement("R " + calculateFinalTotal());
        let vatTotal = createHeadingElement("R " + sessionStorage.getItem("vatTotal"));
        finalTotalContainer.appendChild(vatTotal);
        finalTotalContainer.appendChild(finalTotal);
        finalTotalRow.appendChild(finalTextContainer);
        finalTotalRow.appendChild(finalTotalContainer);
        let shippingDetailContainer = createColDivElement(10);
        shippingDetailContainer.setAttribute("class", "offset-1 col-10 text-center");
        let shippingText = createHeadingElement("<i class='text-secondary'>Shipping Calculated at checkout</i>");
        shippingDetailContainer.appendChild(shippingText);
        finalTotalRow.appendChild(shippingDetailContainer);
        sideCartContainer[0].appendChild(finalTotalRow);
        $('#emptyCart').hide();
        $('#checkoutLink').show();
    }
}

//Calculate final total of items in the cart, then check if shipping is calculated and show the final total
function calculateFinalTotal() {
    let finalTotal = "0.00"
    cartArray.forEach(function(arrayItem) {
        amountToUpdate = parseFloat(arrayItem.quantity * arrayItem.price);
        finalTotal = parseFloat(finalTotal) + parseFloat(amountToUpdate);
        finalTotal = finalTotal.toFixed(2);
        calculateVatTotal(finalTotal);
        sessionStorage.setItem("cartTotal", finalTotal);
        sessionStorage.setItem("finalTotal", finalTotal);
    });
    if (sessionStorage.getItem("shippingTotal") != null) {
        finalTotal = parseFloat(finalTotal) + parseFloat(sessionStorage.getItem("shippingTotal"));
        finalTotal = finalTotal.toFixed(2);
        calculateVatTotal(finalTotal);
        sessionStorage.setItem("finalTotal", finalTotal);
    }
    return finalTotal;
}

//Calculate Vat Amount (already included) based on the finaltotal
function calculateVatTotal(total) {
    let vatTotal = parseFloat(total * 0.15);
    vatTotal = vatTotal.toFixed(2);
    sessionStorage.setItem("vatTotal", vatTotal);
    return vatTotal;
}

//Update the basket on the checkout page
function updateBasketView() {
    let basketDetailsContainer = $('#basketDetails');
    basketDetailsContainer.html('');
    if (cartArray.length == 0) {
        let cartElement = createRowDivElement();
        let textContainer = createColDivElement(6);
        textContainer.setAttribute("class", "offset-3 col-6 text-center");
        let emptyCartHeading = createHeadingElement("You currently have no items in your basket.<br /> Keep shopping to add some now!");
        textContainer.appendChild(emptyCartHeading);
        cartElement.appendChild(textContainer);
        basketDetailsContainer[0].appendChild(cartElement);
    } else {
        cartArray.forEach(function(arrayItem) {
            let cartElement = createRowDivElement();
            let imgContainer = createColDivElement(1);
            let itemImage = createImageElement(arrayItem.imgsrc);
            imgContainer.appendChild(itemImage);
            let textContainer = createColDivElement(8);
            let itemTitle = createHeadingElement(arrayItem.name);
            let itemVariant = createTextElement(arrayItem.variant);
            let itemQuantity = createTextElement("Quantity: " + arrayItem.quantity);
            textContainer.appendChild(itemTitle);
            textContainer.appendChild(itemVariant);
            textContainer.appendChild(itemQuantity);
            let itemTotalContainer = createColDivElement(2);
            itemTotalContainer.setAttribute("class", "col-2 text-white text-end");
            let itemTotal = parseFloat(arrayItem.quantity * arrayItem.price).toFixed(2);
            let itemTotalText = createTextElement("R" + itemTotal);
            let removeButtonSection = createColDivElement(1);
            let removeItemButton = createLinkElement("Remove", "#", "removeItemfromCart(event)");
            itemTotalContainer.appendChild(itemTotalText);
            removeButtonSection.appendChild(removeItemButton);
            cartElement.appendChild(imgContainer);
            cartElement.appendChild(textContainer);
            cartElement.appendChild(itemTotalContainer);
            cartElement.appendChild(removeButtonSection);
            basketDetailsContainer[0].appendChild(cartElement);
        });
        let finalTotalRow = createRowDivElement();
        let finalTextContainer = createColDivElement(3);
        let cartText = createHeadingElement("Cart Total:");
        cartText.setAttribute("class", "text-white text-end");
        let shippingText = createHeadingElement("Shipping:");
        shippingText.setAttribute("class", "text-white text-end");
        let vatText = createHeadingElement("Vat Amount (incl):");
        vatText.setAttribute("class", "text-white text-end");
        let finalText = createHeadingElement("Final Total:");
        finalText.setAttribute("class", "text-white text-end");
        //Check if shipping has been selected and show text
        if (sessionStorage.getItem("shippingTotal") != null) {
            finalTextContainer.appendChild(cartText);
            finalTextContainer.appendChild(shippingText);
            $('#shippingSelection').hide();
            $('#paymentSection').show();
        };
        finalTextContainer.appendChild(vatText);
        finalTextContainer.appendChild(finalText);
        //Check if a discount voucher is applied and show text
        if (sessionStorage.getItem("ApplyDiscountCode") == "TenOff") {
            let discountText = createHeadingElement("Discount Applied:");
            discountText.setAttribute("class", "text-white text-end");
            let payAmountText = createHeadingElement("Amount to Pay:");
            payAmountText.setAttribute("class", "text-white text-end");
            finalTextContainer.appendChild(discountText);
            finalTextContainer.appendChild(payAmountText);

        };
        finalTextContainer.setAttribute("class", "offset-3 col-6");
        let finalTotalContainer = createColDivElement(2);
        let finalTotal = calculateFinalTotal();
        let finalTotalHeading = createHeadingElement("R " + finalTotal);
        let vatTotal = createHeadingElement("R " + sessionStorage.getItem("vatTotal"));
        vatTotal.setAttribute("style", "white-space: nowrap;");
        finalTotalContainer.setAttribute("class", "col-2 text-white text-end");
        //Check if shipping has been selected and show totals 
        if (sessionStorage.getItem("shippingTotal") != null) {
            let cartTotal = createHeadingElement("R " + sessionStorage.getItem("cartTotal"));
            finalTotalContainer.appendChild(cartTotal);
            let shipping = sessionStorage.getItem("shippingTotal");
            let shippingAmount = createHeadingElement("R " + (parseFloat(shipping).toFixed(2)));
            finalTotalContainer.appendChild(shippingAmount);
        };
        finalTotalContainer.appendChild(vatTotal);
        finalTotalContainer.appendChild(finalTotalHeading);
        //Check if a discount voucher is applied and show the value of discount applied
        if (sessionStorage.getItem("ApplyDiscountCode") == "TenOff") {
            let discountAmount = parseFloat(finalTotal * 0.10).toFixed(2);
            let discountHeading = createHeadingElement("R " + discountAmount);
            let amountToPay = parseFloat(finalTotal - discountAmount).toFixed(2);
            let amountToPayHeading = createHeadingElement("R " + amountToPay);
            finalTotalContainer.appendChild(discountHeading);
            finalTotalContainer.appendChild(amountToPayHeading);
        };
        //Hide the Link to the discount code if one is already applied
        if (sessionStorage.getItem("ApplyDiscountCode") != null) {
            $('#discountLink').hide();
        };
        finalTotalRow.appendChild(finalTextContainer);
        finalTotalRow.appendChild(finalTotalContainer);
        //Add edit link to change delivery once the shipping choice has been selected
        if (sessionStorage.getItem("shippingTotal") != null) {
            let editShippingContainer = createColDivElement(1);
            editShippingContainer.setAttribute("class", "col-1 text-white text-end");
            let shippingEdit = createLinkElement("Edit", "#", "$('#deliveryForm').modal('show');");
            shippingEdit.setAttribute("style", "position: relative; top: 1.5em;");
            editShippingContainer.appendChild(shippingEdit);
            finalTotalRow.appendChild(editShippingContainer);
        };
        //Add all the totals to their own row below the list of items
        basketDetailsContainer[0].appendChild(finalTotalRow);
    }
}

//Update the shipping Price based on which time choice is chosen
function updateShippingPrice() {
    let finalShippingAmount;
    let shippingChoice = $('#ShippingForm > .btn-group-vertical > .btn-check:checked').attr('id');
    switch (shippingChoice) {
        case "standardRadio":
            finalShippingAmount = parseFloat($('#standardShipping').html().replace('R', ''));
            break;
        case "fastRadio":
            finalShippingAmount = parseFloat($('#fastShipping').html().replace('R', ''));
            break;
        case "ovnRadio":
            finalShippingAmount = parseFloat($('#overnShipping').html().replace('R', ''));
            break;
    }
    sessionStorage.setItem("shippingTotal", finalShippingAmount);
    updateBasketView();
    $('#shippingForm').modal('hide');
    $('#shippingSelection').hide();
};

//Check the discount code and apply it if it is correct
function applyDiscount() {
    codeToCheck = $('#codeInput').val();
    if (codeToCheck == '') {
        alert("Please enter a code");
    } else if (codeToCheck == 'TenOff') {
        sessionStorage.setItem("ApplyDiscountCode", "TenOff");
        updateBasketView();
        alert("Discount Appplied!");
        $('#discountForm').modal('hide');
    } else {
        alert("The code entered is not valid!")
    }
}

//Generate random order number 
function generateOrderNumber() {
    $('#orderSubmittedForm').modal('show');
    if (sessionStorage.getItem("OrderNumber") != null) {
        $('#orderNumber').html(sessionStorage.getItem("OrderNumber"));
    } else {
        let ordernumberArray = [];
        randomizeAndShuffle();

        function randomizeAndShuffle() {
            ordernumberArray = [];
            for (i = 0; i < 6; i++) {
                var number = Math.floor((Math.random() % Math.random()) * 10);
                ordernumberArray.push(number);
            }

            for (let i = ordernumberArray.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * i)
                let k = ordernumberArray[i]
                ordernumberArray[i] = ordernumberArray[j]
                ordernumberArray[j] = k
            }

            if (ordernumberArray[0] == 0) {
                randomizeAndShuffle();
            } else {
                let orderNumber = 'ORD' + (ordernumberArray.toString()).replaceAll(",", "");
                sessionStorage.setItem("OrderNumber", orderNumber);
                $('#orderNumber').html(orderNumber);
            }
        }
    }
}

//Generic functions to create html elements which are used in the cart and basket views

function createRowDivElement() {
    const div = document.createElement("div");
    div.setAttribute("class", "row mb-1 pb-1 border-bottom");
    return div;
}

function createColDivElement(number) {
    const div = document.createElement("div");
    div.setAttribute("class", "col-" + number);
    return div;
}

function createHeadingElement(name) {
    const heading = document.createElement("h6");
    heading.setAttribute("class", "text-white");
    heading.innerHTML = name;
    return heading;
}

function createImageElement(source) {
    const img = document.createElement("img");
    img.setAttribute("src", source);
    img.setAttribute("class", "img-fluid");
    return img;
}

function createTextElement(text) {
    const textElement = document.createElement("p");
    textElement.setAttribute("class", "text-white my-0");
    textElement.innerHTML = text;
    return textElement;
}

function createLinkElement(text, href, action) {
    const linkElement = document.createElement("a");
    linkElement.setAttribute("class", "text-white my-0");
    linkElement.innerHTML = text;
    linkElement.setAttribute("href", href);
    linkElement.setAttribute("onclick", action);
    return linkElement;
}