'use strict';

const field = document.querySelector('.field');
const btn = document.querySelector('.btn');
const list = document.querySelector('.list');
const listFav = document.querySelector('.list__favorites');
// Creo array favorites donde se almacenan las selecionadas
let favorites = [];


function read () {
  remove();

  fetch(`http://api.tvmaze.com/search/shows?q=${field.value}`)
  .then(response => response.json())
  .then(data => {
   
    createElement(data);

    const itemSelected = document.querySelectorAll('.item__list');
    for (let i = 0; i < itemSelected.length; i++) {
      
      itemSelected[i].addEventListener('click', select);
      // Se usa esta estructura cuando al meter la función en un addEventListener, hay que introducir un parámetro
      itemSelected[i].addEventListener('click', () => {createElementFavorite(favorites)});
    }
  });
}


// Función que me crea tanto li como elementos tenga el array y su contenido
function createElement (arr) {
  
  for (let i = 0; i<arr.length; i++) {
    // Creo elementos
    const newItem = document.createElement('li');
    newItem.classList.add ('item__list');
    const newImg = document.createElement('img');
    newImg.classList.add('item__img');
    const newTitle = document.createElement('h2');
    newTitle.classList.add('item__title');

    // Creo contenido de la imagen
    const newImgContent = arr[i].show.image;
    if (newImgContent === null) {
      newImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      newImg.src = newImgContent.medium;
    }

    // Creo contenido del título
    const newTextContent = document.createTextNode(arr[i].show.name);

    // Meto cada elemento donde coresponde
    newTitle.appendChild(newTextContent);
    newItem.appendChild(newTitle);
    newItem.appendChild(newImg);
    list.appendChild(newItem);
  }
 
}

// FAVORITES. Función que me crea tanto li como elementos tenga el array y su contenido
function createElementFavorite (arr) {
  removeIniFav ()
  
  for (let i = 0; i<arr.length; i++) {
    // Creo elementos a partir del array favorites, que tiene almacenado el objeto SeriesInfo
    const newItemFav = document.createElement('li');
    newItemFav.classList.add ('item__list-fav');
    const newImgFav = document.createElement('img');
    newImgFav.classList.add('item__img-fav');
    const newTitleFav = document.createElement('h2');
    newTitleFav.classList.add('item__title-fav');

    // Creo contenido de la imagen a partir del array favorites y del objeto seriesInfo que contien
    const newImgContentFav = arr[i].img;
    console.log('__**__', newImgContentFav);

    if (newImgContentFav === null) {
      newImgFav.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      newImgFav.src = newImgContentFav;
    }

    // Creo contenido del título
    const newTextContentFav = document.createTextNode(arr[i].name);

    // Meto cada elemento donde coresponde
    newTitleFav.appendChild(newTextContentFav);
    newItemFav.appendChild(newTitleFav);
    newItemFav.appendChild(newImgFav);
    listFav.appendChild(newItemFav);
  }
 
}

function select (event) {
  // Origen del evento
  const culpable = event.currentTarget;
  // al culpable le cambio la clase
  culpable.classList.toggle('item__list2');

  // Meto title/img en el objeto
  const seriesInfo = {};

  seriesInfo.name = culpable.querySelector('.item__title').innerHTML;
  seriesInfo.img = culpable.querySelector('.item__img').src;

  // Añado el objeto seriesInfo a favorites
  favorites.push(seriesInfo);

  saveLocalStorage(favorites);
}

const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
console.log('mmm', savedFavorites);

function saveLocalStorage (arr) {
  localStorage.setItem('favorites', JSON.stringify(arr));
}

// Función que me elimina la busqueda anterior
function remove () {
  list.innerHTML = '';
}

// Función que me elimina la busqueda anterior
function removeIniFav () {
  listFav.innerHTML = '';
}

btn.addEventListener('click', read);