import basketservice from "../services/basketservice.js";
import service from "../services/service.js";

/* 

    Products

*/

const products = {

    // Template til rendering af produkter. modtager ét produkt object.
    template : (product) => `<div class="product">
        <h3>${product.title}</h3>
        <div>discountInPercent: <strong>${product.discountInPercent !== '' ? `${product.discountInPercent}%`: ''}</strong></div>
        <div>
        
        price: <strong>${product.price}</strong></div>
        <img src="${product.image}" width="50px"></img>
        <div>

        <button class="add" data-id="${product._id}">KØB</button>

        <hr/>
    </div>`,

    // Metode til at tilføje et produkt til kurven, benyttes via EventListener.
    addToBasket : (e) => {

        basketservice.addToBasket(e.target.dataset.id);
       
    },

    // Metode til at fjerne et produkt fra kurven, benyttes via EventListener.
    removeFromBasket : (e) => {

        basketservice.removeFromBasket(e.target.dataset.id);
      
    },

    // Udskriver produkterne i produkt container elementet.
    renderProducts : (productsList, productsContainer, recommended) => {

        productsList.forEach(product => {

            if(product.recommended && recommended)
            {

                productsContainer.insertAdjacentHTML('beforeend', products.template(product))

            } else {

                productsContainer.insertAdjacentHTML('beforeend', products.template(product))

            }

        });

        const addToBasketBtns = document.querySelectorAll('.product button.add');
        
        addToBasketBtns.forEach( (addToBasketBtn) => {

            addToBasketBtn.addEventListener('click', products.addToBasket);
            
        })  
        


    },

    // Initialisere vores produkt modul.
    init : () => {

        const productsContainer = document.querySelector('.products-container');
        const recomendedContainer = document.querySelector('.recommended-container');

        let cont = productsContainer || recomendedContainer;

        if(cont)
        {
            let recommended = cont.classList.value === 'recommended-container';
            
            service.getProducts().then( (productsList) => {

                products.renderProducts(productsList, cont, recommended);


            });
            
        }

    }

}



// Esportere vores products metoder.
export default products