'use strict';

const field = document.querySelector('.field');
const btn = document.querySelector('.btn');
const list = document.querySelector('.list');
const listFav = document.querySelector('.list__favorites');
let favorites = JSON.parse(localStorage.getItem('favorites'));
console.log('mmm', favorites);

createElementFavorite(favorites);


function read() {
  remove();

  fetch(`http://api.tvmaze.com/search/shows?q=${field.value}`)
    .then(response => response.json())
    .then(data => {

      createElement(data);

      const itemSelected = document.querySelectorAll('.item__list');

      for (let i = 0; i < itemSelected.length; i++) {
        
        itemSelected[i].addEventListener('click', select);
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

    const newImgContent = arr[i].show.image;

    if (newImgContent === null) {
      newImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      newImg.src = newImgContent.medium;
    }

    const newTextContent = document.createTextNode(arr[i].show.name);

    newTitle.appendChild(newTextContent);
    newItem.appendChild(newTitle);
    newItem.appendChild(newImg);
    list.appendChild(newItem);
  }

}

function createElementFavorite(arr) {
  removeIniFav()

  if (favorites === null) {
    favorites = [];
  } else {

    for (let i = 0; i < arr.length; i++) {

      const newItemFav = document.createElement('li');
      newItemFav.classList.add('item__list-fav');
      const newImgFav = document.createElement('img');
      newImgFav.classList.add('item__img-fav');
      const newTitleFav = document.createElement('h2');
      newTitleFav.classList.add('item__title-fav');

      const newImgContentFav = arr[i].img;
      console.log('__**__', newImgContentFav);

      if (newImgContentFav === null) {
        newImgFav.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
      } else {
        newImgFav.src = newImgContentFav;
      }

      const newTextContentFav = document.createTextNode(arr[i].name);

      newTitleFav.appendChild(newTextContentFav);
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
  favorites.push(seriesInfo);

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