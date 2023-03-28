
import { escapeHTML, unEscapeHTML } from "../services/helpers.js";
import service from "../services/service.js";
/* 
    Questions
*/
const questions = {

    template : (question) => `<div class="questions-accordian">
        <div>
            <h3>${question.question}</h3>
        </div>
        <div class="questions-accordian-content">
            <p>${unEscapeHTML(question.answer)}</p>
        </div>
    </div>`,

    onToggle : (e) => {

        e.currentTarget.classList.toggle('active');

    },

    addEvents : () => {

        const accordions = document.querySelectorAll('.questions-accordian');
        accordions.forEach((accord) => accord.addEventListener('click', questions.onToggle))

    },

    init : async () => {

        let questionContainer = document.querySelector('.questions-container');

        if(questionContainer)
        {

            const response = await service.get('questions');

            response.forEach(question => {

                questionContainer.insertAdjacentHTML('beforeend', questions.template(question))

            });

            questions.addEvents();

            console.log(escapeHTML('<p>Vores brune pigmentering i huden kommer fra vores melaninceller, også kaldet melanocytter. De frigiver melanin til vores celler og lægger sig som en paraply oven på cellen for at beskytte cellens dna. Pigmentfejl skyldes skade eller forvirring i melanocytterne.</p>  <p>Det kan være på grund af at huden har været udsat for meget sol eller skyldes hormoner som f.eks. stress eller graviditet.</p> <p>Pigmentering i forbindelse med stress kan ske ved overproduktion af stress hormon da det minder meget om vores melaninstimulerende hormon, og på den måde snyder kroppen til at danne melanin.</p>'))
        }
    }

}




export default questions;