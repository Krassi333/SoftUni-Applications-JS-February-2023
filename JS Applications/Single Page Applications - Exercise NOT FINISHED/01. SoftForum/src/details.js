let detailsSection=document.getElementById('detailsView');


export function showDetails(){
   document.getElementById('main').replaceChildren(detailsSection);
    console.log('details');
}