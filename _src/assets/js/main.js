'use strict';

const field = document.querySelector('.field');
const btn = document.querySelector('.btn');
const list = document.querySelector('.list');
const listFav = document.querySelector('.list__favorites');

// al cargar la págona q me aparezcan las almacenadas en LS
let favorites = JSON.parse(localStorage.getItem('favorites'));
console.log('mmm', favorites);
// Ejecuto la función al inicio para que me aparezcan los favoritos
createElementFavorite(favorites);


function read() {
  // Para que no se me vayan añadiendo a la lista las diferentes búsquedas. 
  remove();

  fetch(`http://api.tvmaze.com/search/shows?q=${field.value}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      createElement(data);

      const itemSelected = document.querySelectorAll('.item__list');

      for (let i = 0; i < itemSelected.length; i++) {
        
        itemSelected[i].addEventListener('click', select);
        // Cuando aun addEventListener le meto una función con parámetro, es necesario usar este formato
        itemSelected[i].addEventListener('click', () => { createElementFavorite(favorites) });
      }
    });
}


function createElement(arr) {

  for (let i = 0; i < arr.length; i++) {

    const newItem = document.createElement('li');
    newItem.classList.add('item__list');
    const newImg = document.createElement('img');
    newImg.classList.add('item__img');
    const newTitle = document.createElement('h2');
    newTitle.classList.add('item__title');
    const newDay = document.createElement('h3');
    newDay.classList.add('item__day');
    const newGenresUl = document.createElement('ul');
    newGenresUl.classList.add('genres__list');
    
    const newImgContent = arr[i].show.image;

    if (newImgContent === null) {
      newImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      newImg.src = newImgContent.medium;
    }

    const newTextContent = document.createTextNode(arr[i].show.name);
    const newDayContent = document.createTextNode(arr[i].show.schedule.days);
    
    for (let j = 0; j<arr[i].show.genres.length; j++) {
      const newGenresItem = document.createElement('li');
      newGenresItem.classList.add('item__genres');
      let newGenresContentItem = document.createTextNode(arr[i].show.genres[j]);
      newGenresItem.appendChild(newGenresContentItem);
      newGenresUl.appendChild(newGenresItem);
    }
    

    // newGenresItem.appendChild(newGenresContentItem);
    newDay.appendChild(newDayContent);
    newTitle.appendChild(newTextContent);
    newItem.appendChild(newDay);
    newItem.appendChild(newTitle);
    newItem.appendChild(newImg);
    newItem.appendChild(newGenresUl);
    list.appendChild(newItem);
  }

}

function createElementFavorite(arr) {
  // Para que cada vez q añado un favorito la lista se actualice y no añada el listado de favoritos (listFav) varias veces
  removeIniFav()

  // Creo los elementos de favoritos, si favoritos no está vacío.
  if (favorites === null) {
    favorites = [];
  } else {

    for (let i = 0; i < arr.length; i++) {
      
      // Creo elementos
      const newItemFav = document.createElement('li');
      newItemFav.classList.add('item__list-fav');
      const newImgFav = document.createElement('img');
      newImgFav.classList.add('item__img-fav');
      const newTitleFav = document.createElement('h2');
      newTitleFav.classList.add('item__title-fav');
      const newDayFav = document.createElement('h3');


      // Creo contenido
      // de la imgen. Como no es un texto, no uso createTextNode
      const newImgContentFav = arr[i].img;


      // Meto contenido de la img dentro de elemento.
      // si la serie no tuviera imagen definida, le pongo una general
      if (newImgContentFav === null) {
        newImgFav.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
      } else {
        newImgFav.src = newImgContentFav;
      }

      // creo contenido del título dentro de elemento
      const newTextContentFav = document.createTextNode(arr[i].name);
      const newDayContentFav = document.createTextNode(arr[i].day);

      // meto elemento dentro de elemento
      newDayFav.appendChild(newDayContentFav);
      newTitleFav.appendChild(newTextContentFav);
      newItemFav.appendChild(newDayFav);
      newItemFav.appendChild(newTitleFav);
      newItemFav.appendChild(newImgFav);
      listFav.appendChild(newItemFav);
    }
  }
}

function select(event) {

  const culpable = event.currentTarget;
  culpable.classList.toggle('item__list2');

  const seriesInfo = {};
  seriesInfo.name = culpable.querySelector('.item__title').innerHTML;
  seriesInfo.img = culpable.querySelector('.item__img').src;
  seriesInfo.day = culpable.querySelector('.item__day').innerHTML;

  seriesInfo.genres = [];
  const genresArr = culpable.querySelectorAll('.item__genres');
  
  for (let i = 0; i<genresArr.length; i++) {
    seriesInfo.genres.push(genresArr[i].innerHTML);
    console.log('m', seriesInfo.genres);
  }
  favorites.push(seriesInfo);
  console.log('poi', favorites);

  saveLocalStorage(favorites);
}

function saveLocalStorage(arr) {
  localStorage.setItem('favorites', JSON.stringify(arr));
}

function remove() {
  list.innerHTML = '';
}

function removeIniFav() {
  listFav.innerHTML = '';
}

btn.addEventListener('click', read);