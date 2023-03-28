import navigation from "../features/navigation.js";
import productbasket from "../features/basket.js";
import service from "./service.js";

const basketService = {

    setBasket : (basket) => {

        localStorage.setItem('basket', JSON.stringify(basket));
    
        productbasket.init();
        navigation.update();
        
    },

    getBasket : () => {
        return JSON.parse(localStorage.getItem('basket'));
    },

    addToBasket : (productId) => {

        let basket = basketService.getBasket();
    
        if(!basket) {
    
            basket = [
                {
                    id: productId,
                    amount: 1
                }
            ]
            
            //Setting Data in Local Storage
            basketService.setBasket(basket)
       
        } else {
    
            let productAllreadyExists =  basket.find( (p) => p.id === productId );
    
            if(!productAllreadyExists)
            {
                // Adding Product to List
                basket.push({
                    id: productId,
                    amount: 1
                })
    
                // Setting Data in Local Storage
                basketService.setBasket(basket)
                
            }
    
        }
    
    },

    submitOrder : (email) => {

        let order = {
            products : basketService.getBasket(),
            email : email
        }
    
        service.postOrder(order).then((orderResponse) => {
    
            console.log('orderResponse', orderResponse)
            basketService.setBasket([]);
    
        });
      
    
    },

    updateAmount : (id, amount) => {

        let basket = basketService.getBasket();
    
        basket.forEach( (productOrder) => {
    
            if(productOrder.id === id)
            {
                productOrder.amount = parseInt(amount)
            }
            
            
        } )
    
        basketService.setBasket(basket)
    
    },

    removeFromBasket : (productId) => {
    
        let basket = basketService.getBasket();
    
        basket = basket.filter(product => product.id !== productId);
        basketService.setBasket(basket)
        
    },

    getProductCount : () => {

    
        return basketService.getBasket() ? basketService.getBasket().length : 0;
    
    },

    getOrderProducts : async () => {

        let basket = basketService.getBasket();
        let orderProducts = basket ? basket : [];
    
        orderProducts = orderProducts.map( p => p.id).toString();
        const products = await service.get(`products/${orderProducts}`);
    
        return orderProducts ? products : [];
    
    }

};

export default basketService;