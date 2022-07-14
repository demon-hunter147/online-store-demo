//Show the remainder of the form based on which option is chosen (Collection or Shipping)
$('#DeliveryForm input[type=radio]').on('change', function(event) {
    event.preventDefault();
    if ($('#deliveryradio').is(':checked')) {
        $('#collectionSection').hide();
        $('#deliverySection').show();
        btnSection
        $('#btnSection').show();
        $('#acceptTsnCs').prop("checked", false);
        $('#btnSection > .btn[type=submit]').prop("disabled", true);
    } else {
        $('#deliverySection').hide();
        $('#collectionSection').show();
        $('#btnSection').show();
    }
});
//Check if the Terms and Conditions are accepted and enable the submit button
$('#acceptTsnCs').on('change', function(event) {
    if ($('#acceptTsnCs').is(':checked')) {
        $('#btnSection > .btn[type=submit]').prop("disabled", false);
    } else {
        $('#btnSection > .btn[type=submit]').prop("disabled", true);
    }
});
//Update the shipping value if collection is chosen
function updateCollectionOnly() {
    let shippingTotal = 0.00;
    if ($('#acceptTsnCs').is(':checked')) {
        sessionStorage.setItem("shippingTotal", shippingTotal.toFixed(2));
    } else {
        alert("Please accept the Terms and conditions!");
    };
    updateBasketView();
    $('#deliveryForm').modal('hide');
    $('#shippingSelection').hide();
};
//Show the Second form for shipping options (i.e. overnight delivery) once the base price is determmined
function launchShippingOptionsForm(baseShippingPrice) {
    baseShippingPrice = parseFloat(baseShippingPrice).toFixed(2);
    $('#standardShipping').text('R' + baseShippingPrice);
    let fastPrice = (parseFloat(baseShippingPrice) + 30.00).toFixed(2);
    $('#fastShipping').text('R' + fastPrice);
    let ovnPrice = (parseFloat(baseShippingPrice) + 100.00).toFixed(2);
    $('#overnShipping').text('R' + ovnPrice);
    $('#deliveryForm').modal('hide');
    $('#shippingForm').modal('show');
    $('#shippingSelection').hide();
};

//Add event listener to main window to listen for function call from the iFrame when calculate shipping is clicked
if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);
} else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}

function onMessage(event) {
    // Check sender origin to be trusted
    if (event.origin !== 'null') return;

    var data = event.data;

    if (typeof(window[data.func]) == "function") {
        window[data.func].call(null, data.baseShippingPrice);
    }
}