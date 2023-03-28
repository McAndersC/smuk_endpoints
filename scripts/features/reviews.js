import service from "../services/service.js";
/* 
    Reviews
*/
const reviews = {

    template : (review) => `<div>
        <p>${review.description}</p>
        <img src='${review.image}' width='50px'></img>
        <p>${review.name}</p>
        <p>${review.byline}</p>
    </div>`,
    
    init : async () => {

        let reviewContainer = document.querySelector('.reviews-container');

        if(reviewContainer) {

            const reviewResult = await service.get('reviews');

            reviewResult.forEach(review => {

                reviewContainer.insertAdjacentHTML('beforeend', reviews.template(review))

            });
            
        }

    
    }
}





export default reviews;