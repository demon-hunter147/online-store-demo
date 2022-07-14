# Online-store-demo

## This is a demo online store that was created for my Full Stack Web Development Bootcamp for [HyperionDev](http://hyperiondev.com)

* The focus of this task was to initially show my abilities using HTML and CSS, following a set of instructions for the task. 
* Phase 2 was to then introduce JavaScript, JQuery and JSON to achieve the functionality required for the basket etc. to display my competency and capability in using these languages.

This uses JSON and sessionStorage to store data as we traverse pages. This is then handled on pageload and updated as any changes to the basket are made (i.e. adding to the basket or discounts being applied).

*Please note the use of the Google Maps API was not part of the original scope, but I like to ensure that I build something that is as close to complete as possible :-)*
*This has been temporarily turned off to prevent charges for the API calls, but they can be turned on in the Google Developer API dashboard, or you could even use your own credentials to make the calls.*

## Contents

1. Installation
1. Usage
1. Example Screenshots
1. Credits

### Installation
Clone the repo in the usual manner and you will be able to simply open the ptoject from there.
Start by navigating to the Main_pages folder and opening the index.html file in your browser to view the homepage.

### Usage
1. Once the homepage for the store is opened, you can use it like any other online store. 
1. Navigate to the products page to view 5 examples of products in the store - these are all added programmatically!
1. You can Quick add a product to your cart from the products page, which then shows the cart as a sidebar. You can view your totals, remove items or proceed to checkout from here
1. If you choose to, you can also go into the product details page for each product to add multiple products, or choose different variations of a product.
1. Once you proceed to checkout, you can choose between the colelction or delivery options.
1. Choosing delivery allows you to search & select your address (This uses the Google Maps API to find your address. *Please note this is commented out temporarily to prevent over-utilization due to the cost assosciated with the Google API calls*)
1. Once your address is selected, you can calculate shipping, which then calculates the distance to your address from each of the main cities in SA (**This uses the Google Maps API to determine the distance by road. There are then 3 pricing brackets, and based on the distance from the CLOSEST city to your address, determines the price bracket that your shipping cost falls under**)
1. This then updates the shipping price and displays your final order total.
1. There is also functionality to enter a discount voucher code. I have added one into the description on the pop-up that appears so it can be tested. This then applies the discount percentage to your order, showing the discount amount and then the new final total to pay.

#### Examples:

![index](https://user-images.githubusercontent.com/59868314/179018201-3bd21369-4847-4e8b-821a-92772aa04743.JPG)
![Product Catalogue](https://user-images.githubusercontent.com/59868314/179018204-62300978-ac2e-48ee-99f4-f7b6c2122f40.JPG)
![cart](https://user-images.githubusercontent.com/59868314/179018190-6891e70d-b7ea-4461-a876-d8b98952f4c2.JPG)
![product detail](https://user-images.githubusercontent.com/59868314/179018207-72bb928a-b576-4b86-8d62-50fd1064086c.JPG)
![cart update](https://user-images.githubusercontent.com/59868314/179018181-a45a5fdf-9edb-4c0c-99ad-5eeb7d5b4a24.JPG)
![delivery](https://user-images.githubusercontent.com/59868314/179018195-717119e4-4d4b-4fc0-8566-f6ea4a01d89f.JPG)

### Credits
This is all my own work! Each piece written from scratch using Sublime text editor, checked using the W3C Mark-up Validator tool.
Image credit goes to the awesome contributors of [Unsplash](https://unsplash.com/)
