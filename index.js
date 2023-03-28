import products from "./scripts/features/products.js";
import questions from "./scripts/features/questions.js";
import subscribe from "./scripts/features/subscribe.js";
import reviews from "./scripts/features/reviews.js";
import navigation from "./scripts/features/navigation.js";
import { escapeHTML } from "./scripts/services/helpers.js";

navigation.init();
products.init();
questions.init();
subscribe.init();
reviews.init();


console.log(escapeHTML("Vil prismacther på følgende parametre:<ol><li>Prisen skal gælde på handelstidspunktet.</li><li>Varen skal være i samme model, farve og evt. størrelse</li><li>Varen skal være på lager hos konkurrenten på tidspunktet for prismatch</li>"))