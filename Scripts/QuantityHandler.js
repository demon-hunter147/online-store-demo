var quantity=0;

 function goUp(){
var quantityfield =  document.getElementById("quantitySelection");
   quantity = parseInt(quantityfield.value);
   if (quantity < 20){
   quantityfield.value = (quantity + 1)
}
else return;
};

function goDown(){
    var quantityfield =  document.getElementById("quantitySelection");
   quantity = parseInt(quantityfield.value);
      if (quantity > 1){
   quantityfield.value = (quantity - 1)
}
else return;
};
