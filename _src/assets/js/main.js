'use strict';

const field = document.querySelector('.field');
const btn = document.querySelector('.btn');
const list = document.querySelector('.list');

// const item = document.createElement('li');
// item.classList.add ('item__list');
// list.appendChild(item);


function read () {
  remove();

  fetch('http://api.tvmaze.com/search/shows?q='+field.value)
  .then(response => response.json())
  .then(data => {
   
    console.log('_^_', data);
    let filteredTitles = [];
    for (let i = 0; i<data.length; i++) {
      
      const title = data[i].show.name;
      if (title.match(field.value)) {
        filteredTitles.push(data[i].show.name);
      }
    }
    createElement(data);

    // for (let j=0; j<data.length; j++) {
    //   const newTextContent = document.createTextNode(data[j].show.name);
    //   item__title.innerHTML = newTextContent;
    // }
    
  });
}


// Función que me crea tanto li como elementos tenga el array
function createElement (arr) {
  
  for (let i = 0; i<arr.length; i++) {
    // Creo elementos
    const newItem = document.createElement('li');
    newItem.classList.add ('item__list');
    const newImg = document.createElement('img');
    newImg.classList.add('item__img');
    const newTitle = document.createElement('h2');
    newTitle.classList.add('item__title');

    // // Creo contenido de la imagen
    // const newImgContent = document.createTextNode(arr[i].show.url);
    // newImg.setAttribute('src', newImgContent);
    // console.log('__**__', newImgContent)

    // Creo contenido del título
    const newTextContent = document.createTextNode(arr[i].show.name);
    console.log('___^___', newTextContent);

    // Meto cada elemento donde coresponde
    newTitle.appendChild(newTextContent);
    newItem.appendChild(newTitle);
    newItem.appendChild(newImg);
    list.appendChild(newItem);
  }
}



// // Función que me elimina la busqueda anterior
function remove () {
  list.innerHTML = '';
}

btn.addEventListener('click', read);

