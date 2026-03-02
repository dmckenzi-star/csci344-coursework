const items = ["Apple", "Banana", "Orange", "Grape", "Mango"];

const itemList = document.querySelector('#itemList');

console.log(items);
console.log(itemList);

function displayItems() {
  itemList.innerHTML = ''; // clear reset

  for (let i = 0; i < items.length; i++) {
    const html = `<li>${items[i]}</li>`;
    itemList.insertAdjacentHTML('beforeend', html);
  }
}

displayItems();