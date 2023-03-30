import { html } from '../../node_modules/lit-html/lit-html.js';

const template=()=>html`
  <section id="home">
  <p>100</p>
    <img src="./images/landing.png" alt="home" />

    <h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right
        here!</span></h2>
  </section>
`

export function homeView(ctx){
    ctx.render(template());
}

