import { showHomePage } from "./home.js";
import { showDetails } from "./details.js";
document.getElementById('detailsView').remove();
document.getElementById('homeView').remove();

let homeBtn = document.getElementById('home-btn');
homeBtn.addEventListener('click', showHomePage);

window.showHomePage = showHomePage;
window.showDetails = showDetails;