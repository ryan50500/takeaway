

document.addEventListener("DOMContentLoaded", function(event) {
 
    const closeModalButtons = document.querySelectorAll(".close__modal");
    const modals = document.querySelectorAll(".flex__modal");
    const openModalImage = document.querySelectorAll(".open__modal");
    const optionButtons = document.querySelectorAll(".option__button");
    // update country name
    const countryName = document.querySelector('.mobile__jeans__title');

  
    // Modal change options on mobile
    for (i = 0; i < optionButtons.length; i++) {
        selectedModal();
    }
 
    function selectedModal() {
        optionButtons[i].addEventListener('click', function() {
            for (i = 0; i < modals.length; i++) {
                if (this.dataset.modaltype === modals[i].dataset.modaltype) {
                    // show the correct modal
                    modals[i].style.display = "block";
                    modals[i].scrollTop = 0;
                } else {
                    modals[i].style.display = "none";
                }
            }
        });
    }
 
    // Close Modal - any button clicked will close all modals on page
    for (i = 0; i < closeModalButtons.length; i++) {
        closeModals();
    }
 
    function closeModals() {
        closeModalButtons[i].addEventListener('click', function() {
            document.querySelector('body').style.overflow = 'auto';
            document.querySelector('.dark__overlay').style.display = 'none';
            for (i = 0; i < modals.length; i++) {
                modals[i].style.display = "none";
            }
        });
    }
 
  
    // Open Modal
    for (i = 0; i < openModalImage.length; i++) {
        openTheModal();
    }
 
    function openTheModal() {
        openModalImage[i].addEventListener('click', function() {
            document.querySelector('body').style.overflow = 'hidden';
            document.querySelector('.dark__overlay').style.display = 'block';
            for (i = 0; i < modals.length; i++) {
                if (this.dataset.modaltype === modals[i].dataset.modaltype) {
                    modals[i].style.display = "flex";
                    modals[i].scrollTop = 0;
                    modals[i].querySelector('.style__modal').style.backgroundColor = "black";
                    modals[i].querySelector('.style__modal__cross').style.backgroundColor = "black";
                }
            }
        });
    }
 

    // Change country sidebar
     // change country
     const countryOptions = document.querySelectorAll('.country-radio');
   
    
     // open change country slider
     document.getElementById('change_country').addEventListener('click', function(){
           document.querySelector('.cross .style__modal').classList.toggle('black__cross');
           document.querySelector('.cross .style__modal__cross').classList.toggle('black__cross');
           document.querySelector('.delivery-country-selector__overlay').classList.toggle('slide');
     });
  
   
      // close change country slider
      document.querySelector('.cross').addEventListener('click', function(){
           document.querySelector('.cross .style__modal').classList.toggle('black__cross');
           document.querySelector('.cross .style__modal__cross').classList.toggle('black__cross');
           document.querySelector('.delivery-country-selector__overlay').classList.toggle('slide');
   });

   
     
     // SEARCH FILTER
           const search = document.getElementById("country-search");
      
           search.addEventListener("keyup", filterProducts);
  
           function filterProducts(e) {
               searchresult = search.value;
               console.log(searchresult);
             const userInput = searchresult.toLowerCase();
             // console.log(productName[0]);
             // this loop works with IE
             for (i = 0; i < countryOptions.length; i++) {
                  const countryDataSet = countryOptions[i].dataset.country
               if (countryDataSet.toLowerCase().indexOf(userInput) != -1) {
                       countryOptions[i].style.display = "block";
               } 
               else if (countryOptions[i].className.match(userInput)) {
                     countryOptions[i].style.display = "block";
               }
               else {
                       countryOptions[i].style.display = "none"
               }
             }
           }

           
        //    update country name to the whichever country the user selects in side menu
        for (i = 0; i < countryOptions.length; i++) {
           countryOptions[i].addEventListener('click', function(e){
                countryName.innerHTML = this.dataset.country;
                // if currency is already zloty and user clicks on zloty
                if (e.target.id === "zloty" && document.querySelector('.currency__symbol').innerHTML ===  'zł' ) {
                    return; 
                }
                else if  (e.target.id === "zloty") {
                    covertToZloty();
                }
                // convert from zloty to pounds
                 else if (document.querySelector('.currency__symbol').innerHTML === 'zł' && e.target.id === "pounds") {
                    zlotyToPounds();
                }
         });
        }
  


   // Calculate orders
   const items = document.querySelectorAll('.modal__info .plus');

   for (let i = 0; i < items.length; i++) {
         items[i].addEventListener('click', function(){
            let priceOfItem = this.parentElement.querySelector('.item').innerHTML;
            let priceOfItemInteger = parseFloat(priceOfItem);
            newUpdated(priceOfItemInteger);
        });

        function newUpdated(priceOfItemInteger){
            const currentTotal =  document.querySelector('.total').innerHTML;
            const currentTotalParsed  = parseFloat(currentTotal);
            // 'priceOfItemInteger' is the item that was clicked on
            document.querySelector('.total').innerHTML = (currentTotalParsed + priceOfItemInteger).toFixed(2);
        }
   }


    // close modal if dark overlay is clicked
    document.querySelector('.dark__overlay').addEventListener('click', function(){
        const modals = document.querySelectorAll(".flex__modal");
        for (i = 0; i < modals.length; i++) {
            modals[i].style.display = "none";
        }
        document.querySelector('body').style.overflow = 'auto';
        document.querySelector('.dark__overlay').style.display = 'none';
    });



    // change currency - polish zloty
   function covertToZloty(){
        console.log('zloty clicked')
        const items = document.querySelectorAll('.modal__info div .item');
        const total = document.getElementById('thetotal');
        const currencySymbol = document.querySelector('.currency__symbol');
        const itemCurrency = document.querySelectorAll('.item__currency');
        const polishZloty = 5.52
        for (let i = 0; i < items.length; i++) {
            items[i].innerHTML = (items[i].innerHTML*polishZloty).toFixed(2);
        }
        total.innerHTML = (total.innerHTML*polishZloty).toFixed(2);
        currencySymbol.innerHTML = 'zł';
        for (i = 0; i < itemCurrency.length; i++) {
            itemCurrency[i].innerHTML = 'zł';
        }
    };


        // change currency - british pounds
   function zlotyToPounds(){
        console.log('zloty to pounds');
        const items = document.querySelectorAll('.modal__info div .item');
        const total = document.getElementById('thetotal');
        const currencySymbol = document.querySelector('.currency__symbol');
        const itemCurrency = document.querySelectorAll('.item__currency');
        const britishPounds = 5.52;
        for (let i = 0; i < items.length; i++) {
            items[i].innerHTML = (items[i].innerHTML/britishPounds).toFixed(2);
        }
        total.innerHTML = (total.innerHTML/britishPounds).toFixed(2);
        currencySymbol.innerHTML = '£';
            for (i = 0; i < itemCurrency.length; i++) {
                itemCurrency[i].innerHTML = '£';
            }
};

  

// add item to order
for (let i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function(){
        this.parentElement.classList.add('added__item');
        this.parentElement.querySelector('.minus').style.visibility = 'visible';
        this.parentElement.querySelector('.quantity').innerHTML++;
        this.parentElement.querySelector('.quantity').style.visibility = 'visible';
        });
      };



    //   remove added item
    const minusButtons = document.querySelectorAll('.minus');

      for (let i = 0; i < minusButtons.length; i++) {
        minusButtons[i].addEventListener('click', function(e){
            e.stopPropagation();
            console.log('minus clicked')
            console.log(this.nextElementSibling);
            this.parentElement.querySelector('.quantity').innerHTML--;

            // update total
            let priceOfItem = this.parentElement.querySelector('.item').innerHTML;
            let priceOfItemInteger = parseFloat(priceOfItem);
            newUpdated(priceOfItemInteger);
    
            function newUpdated(priceOfItemInteger){
                const currentTotal =  document.querySelector('.total').innerHTML;
                const currentTotalParsed  = parseFloat(currentTotal);
                // 'priceOfItemInteger' is the item that was clicked on
                document.querySelector('.total').innerHTML = (currentTotalParsed - priceOfItemInteger).toFixed(2);
            }
            // if quanity of item is 0, hide the minus and quanitiy 
            if ( this.parentElement.querySelector('.quantity').innerHTML == 0) {
                this.parentElement.querySelector('.minus').style.visibility = 'hidden';
                this.parentElement.querySelector('.quantity').style.visibility = 'hidden';
                this.parentElement.classList.remove('added__item');
            }
          });
        };



    //  Add orders to cart
    const addToOrder = document.querySelectorAll('.add__to__order');
    const basket = document.querySelectorAll('.basket')[0];
    const quantity = document.querySelectorAll('.quantity');


        function addToCart(){
            console.log('log one');
            for (i = 0; i < quantity.length; i++) {
                console.log('log two');
                // get the quantity innerHTML of all items 
                const quantityOfDishesStrings = quantity[i].innerHTML;
                populateOrders(quantityOfDishesStrings);
            }
            return;
                // convert these from strings to intergers
                // console.log('log three');
                // for (i = 0; i < quantityOfDishesStrings.length; i++) {
                //     const quantityOfDishes = parseFloat(quantityOfDishesStrings[i]);
                //     console.log('the quantity is' + quantityOfDishes);
                //     // populate orders
                //     populateOrders(quantityOfDishes);
                // }
        
    }

            // when the 'add to order' button is cliked...
            for (i = 0; i < addToOrder.length; i++) {
                addToOrder[i].addEventListener('click', function() {
                    addToCart();
                });
            }

            function populateOrders(quantityOfDishes){
                    // if dish has already been added , do nothing
            // if ((quantityOfDishes > 0) && (this.closest('.modal__holder').querySelector('.modal__info').querySelector('.added__item'))) {
                console.log('the quantity is' + quantityOfDishes);
                console.log('log five');
                // update quantities of items
                console.log('log six');
            }
                // clearInterval(addingStuff);
                        // console.log('log seven');
                        //   // when the 'add to order' button is cliked...
                        //  const CurrentItemQuantities = document.querySelectorAll('.dish__quantity__cart');

                        // for (i = 0; i < CurrentItemQuantities.length; i++) {
                        //     CurrentItemQuantities[i].innerHTML = 12;
                        // }
                        // console.log('log eight');
                    // // create the dish quantity
                    // const dishQuantity = document.createElement('span');
                    // dishQuantity.setAttribute('class', 'dish__quantity__cart');
                    // const quanityToAdd = allDishes[i].querySelector('.quantity').innerHTML;
                    // dishQuantity.append(quanityToAdd);
                    // console.log('update quantities function called');
                   
                //  }
           

        
            //   }
        //    }
            // // show orders basket
            // basket.classList.add('slide__basket');
            // // get all the dishes 
            // const allDishes = this.closest('.modal__holder').querySelector('.modal__info').children;
            // // dish name
            // const DishName = this.closest('.modal__holder').querySelector('.dish__name');
          
            // loop through dishes and proceed with function if a dish has at least 1 item added to basket
            // for (i = 0; i < allDishes.length; i++) {
            //     if (allDishes[i].querySelector('.quantity').innerHTML > 0) {

            //         // holds the dish information added to cart
            //         const dishHolder = document.createElement('p');

            //         // create the dish element
            //         const dishElement = document.createElement('span');
            //         dishElement.setAttribute('class', 'dish__in__cart');
            //         // create the dish type
            //         const DishType = allDishes[i].querySelector('.dish__type').innerHTML;
                   
            //         // create the dish quantity
            //         const dishQuantity = document.createElement('span');
            //         dishQuantity.setAttribute('class', 'dish__quantity__cart');
            //         const quanityToAdd = allDishes[i].querySelector('.quantity').innerHTML;
            //         dishQuantity.append(quanityToAdd);

            //         // append dish name and type HTML to dish name element we just created
            //         dishElement.append(DishName, DishType, dishQuantity);

            //         // add the dish and type/quanity to the holder
            //         dishHolder.append(dishElement)

            //         // append the dish to the basket
            //         basket.append(dishHolder);
            //     }
            // }
        // });
    // }
});