import basket from "./basket.js";
import basketservice from "../services/basketservice.js";

/*

    Navigation Module

*/

const navigation = {

    navData : [
        {
            page: '/pages/frontpage.html',
            title: 'Forside'
        },
        {
            page: '/pages/questions.html',
            title: 'Spørgsmål og svar'
        },
        {
            page: '/pages/reviews.html',
            title: 'Anmeldelser'
        },
        {
            page: '/pages/products.html',
            title: 'Products'
        },
        {
            page: '/pages/subscribe.html',
            title: 'Bliv Medlem'
        },
        {
            page: '/pages/basket.html',
            title: 'Kurv/Kvittering/Bestilling'
        }
    ],

    // Template til rendring af vores menu.
    template : (navDataList) => `<div>
        <ul>
            ${navDataList.map( (link) => `<li><a href="${link.page}">${link.title}</a></li>` ).join(' ')}
        </ul>

        <div class="toggle-basket-btn">Åbn/Luk Kurv :: Antal <span class="basket-amount">0</span></div>

        <div class="navigation-basket">
            
            <div class="basket">

                <div class="empty-basket">
                    Der er <span class="basket-amount">0</span> forskellige produkter i din kurv
                </div>
                
                <div>
                    <div class="basket-products"></div>
                    <div class="basket-price"></div>
                </div>

                <div>
                    <form id="order-form">
                        <input name="email" type="email" placeholder="indtast e-mail" value="anders@medieskolerne.dk" required />
                        <button>Bestil</button>
                    </form>
                </div>
            </div>
    </div>`,

    // Update metode vi kalder når kurven opdateres.
    update : () => {
 
        console.log('Nvigation Update')
        const amountElements = document.querySelectorAll('.navigation .basket-amount');
    
        if(amountElements)
        {
            amountElements.forEach( (amountElem) => {
                amountElem.innerHTML = basketservice.getProductCount()
            });
        }
    },

    // Events vi benytter i navigationen.
    addEvents : () => {

        const navBasket = document.querySelector('.navigation-basket');
        const toggleBasketBtn = document.querySelector('.toggle-basket-btn');
        if(toggleBasketBtn)
        {
            toggleBasketBtn.addEventListener('click', () => {
                navBasket.classList.toggle('show')
                navigation.update();
              
            })
         
        }
    },

    // Initialisere vores navigation. Skriver template, tilføjer events og kalder update for at opdatere kurven
    // Hvis der allerede skulle være en ordre.
    init : () => {

        const navigationElement = document.querySelector('.navigation');
        
        if(navigationElement) {
    
            navigationElement.innerHTML = navigation.template(navigation.navData);
    
            basket.init();
            navigation.addEvents();
            navigation.update();
    
        }
        
    }

};

export default navigation;