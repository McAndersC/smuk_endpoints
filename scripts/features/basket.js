import basketservice from "../services/basketservice.js";

const basket = {

    basketProducts : document.querySelector('.basket-products'),
    basketPrice : document.querySelector('.basket-price'),

    // Template til et produkt i kurven i navigationen
    tmpl : (product, amount) => `<div class="basket-product">
        <h1>${product.title}</h1>
        <img src="${product.image}" width="50" />
        <div>
            ${product.price} kr. (${amount} x ${product.price} = ${amount*product.price} du spare: ${(amount*product.price) / 100 * product.discountInPercent})
            </div>
        <input id="basket-product-amount" type="number" min="1" max="10" data-id="${product._id}" value="${parseInt(amount)}">
        <button class="basket-btn" data-id="${product._id}">Remove</button>
    </div>`,

    // Initialisere Modulet
    init : async () => {

        // Henter order
        let orderProducts = await basketservice.getOrderProducts();

        if (orderProducts.length !== 0) {

            basket.renderBasket(orderProducts);
    
        } else {
    
            // No products to render
            basket.reset();
    
        }

        basket.addEvents();
    },

    reset : () => {

        let basketProducts = document.querySelector('.basket-products');
        let basketPrice = document.querySelector('.basket-price');
    
        if( basketProducts && basketPrice) {
            basketProducts.innerHTML = ''
            basketPrice.innerHTML = 'Total Price 0'
        }
    
    },

    renderBasket : (products) => {
  
        let basketProducts = document.querySelector('.basket-products');
        let basketPrice = document.querySelector('.basket-price');

        if ( basketProducts )
        {
            
            let orderBasket = basketservice.getBasket();
            let totalPrice = 0;
    
            basket.reset();
           
            products.forEach( (product) => {
        
                let orderProduct = orderBasket.find( (p) => p.id === product._id);

                totalPrice += orderProduct.amount * product.price;
                basketProducts.innerHTML += basket.tmpl(product, orderProduct.amount)
        
            })
        
            basketPrice.innerHTML = `Total Price ${totalPrice}`;

        }
    
    },

    addEvents : () => {

        const basketBtns = document.querySelectorAll('.basket-btn');
        const basketBtnsAmount = document.querySelectorAll('#basket-product-amount');
        const orderForm = document.querySelector('#order-form');
    
        basketBtns.forEach( ( btn ) => {
    
            btn.addEventListener('click', basket.removeItemFromBasket);
    
        })   
        
        basketBtnsAmount.forEach( ( btn ) => {
    
            btn.addEventListener('change', basket.addAmountToProductOrder);
    
        })
    
        orderForm.addEventListener('submit', basket.orderProducts);
    
    },

    orderProducts : (e) => {

        e.preventDefault();
    
        const { email } = e.target.elements;
    
        basketservice.submitOrder(email.value);
    
    },

    addAmountToProductOrder : (e) => {

        basketservice.updateAmount(e.currentTarget.dataset.id, e.currentTarget.value);
    
    },

    removeItemFromBasket : (e) => {

        basketservice.removeFromBasket(e.target.dataset.id);
    
    }

};

















export default basket;