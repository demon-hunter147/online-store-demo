// Functions to run on load of document
$(document).ready(function() {
    //Trigger the sliding animation at the top of the page
    slideProgressBarAnimation();
    //Trigger the shuffle of items on the catalogue page only
    if (window.location.href.indexOf("Catalogue") > -1) {
        window.setTimeout(shufflePageItems, 5000);
    }
});

//Sliding bar at the top of the page to give "shiny chrome" effect
function slideProgressBarAnimation() {
    currentWidth = $("#flashingBar").css("left");
    switch (currentWidth) {
        case "auto":
            $("#flashingBar").animate({ left: "100%" }, {
                duration: 1500,
                easing: "linear"
            });
            window.setTimeout(slideProgressBarAnimation, 5000);
            break;
        case "-300px":
            $("#flashingBar").animate({ left: "100%" }, {
                duration: 1500,
                easing: "linear"
            });
            window.setTimeout(slideProgressBarAnimation, 5000);
            break;
        default:
            $("#flashingBar").animate({ left: "-300px" }, {
                duration: 1500,
                easing: "linear"
            });
            window.setTimeout(slideProgressBarAnimation, 5000);
    }

};

//Shuffle the order of the items on the catalogue page to give eahc one a "spotlight"
function shufflePageItems() {
    $("#mainContainer").children(".row:nth-child(2)").children().first().css("position", "relative").animate({ "left": "-1300px" }, 1500).slideUp("slow", function() {
        $("#mainContainer").children(".row:nth-child(2)").children().last().removeClass('col-md-4 offset-0 offset-md-4').addClass('col-md-3');
        $("#mainContainer").children(".row:nth-child(2)").children().first().detach().removeClass('col-md-3').addClass('col-md-4 offset-0 offset-md-4').insertAfter($("#mainContainer").children(".row:nth-child(2)").children().last()).hide().animate({ "left": "-1500px" }).show().animate({ "left": "0px" }, 1500);
    });
    window.setTimeout(shufflePageItems, 15000);
}