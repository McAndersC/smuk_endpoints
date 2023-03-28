
import { unEscapeHTML } from "../services/helpers.js";
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

            const questionsResult = await service.get('questions');

            questionsResult.forEach(question => {

                questionContainer.insertAdjacentHTML('beforeend', questions.template(question))

            });

            questions.addEvents();

            
        }
    }

}




export default questions;