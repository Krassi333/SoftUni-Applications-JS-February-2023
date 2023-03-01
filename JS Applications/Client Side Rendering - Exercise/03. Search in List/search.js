import { towns } from './towns.js'
import { html, render } from '/node_modules/lit-html/lit-html.js'

function search() {
   console.log(towns);

   let root = document.getElementById('towns');
   let searchTextField = document.getElementById('searchText');
   let searchText = searchTextField.value;

   let res = (towns, searchText) => html`
<ul>
   ${towns.map(el => html`<li class=${searchText && el.toLowerCase().includes(searchText.toLowerCase()) ? 'active' : ''
    }>${el}</li>`)}
</ul>
`
   render(res(towns, searchText), root);

   let searchBtn = document.querySelector('button');
   searchBtn.addEventListener('click', () => {
      searchText = searchTextField.value;
      let count = 0;

      towns.forEach(town => {
         if (town.toLowerCase().includes(searchText.toLowerCase())) {
            count++;
         }

      })
      render(res(towns, searchText), root);

      document.getElementById('result').innerText = `${count} matches found`

   })
}

search()
