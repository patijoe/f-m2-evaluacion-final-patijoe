'use strict';

const field = document.querySelector('.field');
const btn = document.querySelector('.btn');
const list = document.querySelector('.list');
const listFav = document.querySelector('.list__favorites');


function read () {
  remove();

  fetch(`http://api.tvmaze.com/search/shows?q=${field.value}`)
  .then(response => response.json())
  .then(data => {
   
    // console.log('_^_', data);
    let filteredTitles = [];
    for (let i = 0; i<data.length; i++) {
      
      const title = data[i].show.name;
      if (title.match(field.value)) {
        filteredTitles.push(data[i].show.name);
      }
    }
    createElement(data);

    const itemSelected = document.querySelectorAll('.item__list');
    for (let i = 0; i < itemSelected.length; i++) {
      itemSelected[i].addEventListener('click', select);
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
    // console.log('__**__', newImgContent);
    if (newImgContent === null) {
      newImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      newImg.src = newImgContent.medium;
    }

    // Creo contenido del título
    const newTextContent = document.createTextNode(arr[i].show.name);
    // console.log('___^___', newTextContent);

    // Meto cada elemento donde coresponde
    newTitle.appendChild(newTextContent);
    newItem.appendChild(newTitle);
    newItem.appendChild(newImg);
    list.appendChild(newItem);
  }
 
}

// FAVORITES. Función que me crea tanto li como elementos tenga el array y su contenido
function createElementFavorite (arr) {
  
  for (let i = 0; i<arr.length; i++) {
    // Creo elementos
    const newItemFav = document.createElement('li');
    newItemFav.classList.add ('item__list-fav');
    const newImgFav = document.createElement('img');
    newImgFav.classList.add('item__img-fav');
    const newTitleFav = document.createElement('h2');
    newTitleFav.classList.add('item__title-fav');

    // Creo contenido de la imagen
    const newImgContentFav = arr[i].lastChild.currentSrc;
    // console.log('__**__', newImgContent);
    if (newImgContentFav === null) {
      newImgFav.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      newImgFav.src = newImgContentFav;
    }

    // Creo contenido del título
    const newTextContentFav = document.createTextNode(arr[i].innerText);

    // Meto cada elemento donde coresponde
    newTitleFav.appendChild(newTextContentFav);
    newItemFav.appendChild(newTitleFav);
    newItemFav.appendChild(newImgFav);
    listFav.appendChild(newItemFav);
  }
 
}

// Función que me define donde ocurre el evento y me cambia la clase
let favorites = [];

function select (event) {
  let culpable = event.currentTarget;
  
  culpable.classList.toggle('item__list2');

  favorites.push(culpable);
  console.dir(favorites);
}

// // Función que me elimina la busqueda anterior
function remove () {
  list.innerHTML = '';
}

btn.addEventListener('click', read);


// let array = [];
// function add (arr) {
//   array.push('hola');
//   console.log(array);
// }