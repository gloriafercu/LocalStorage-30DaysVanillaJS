const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
	e.preventDefault();
	const text = this.querySelector('[name=item]').value;
	const item = {
		text: text,
		done: false
	};
	items.push(item);
	populateList(items, itemsList);
	localStorage.setItem('items', JSON.stringify(items));
	this.reset();
}

// Para almacenar datos en el localStorage es necesario pasar a string (JSON.stringify) el objeto y para obtener datos del localStorage es necesario volverlos a convertir en objeto (JSON.parse)

function populateList(plates, platesList) {
	platesList.innerHTML = plates.map((plate, i) => {
		return `
			<li>
				<input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : '' }/>
				<label for="item${i}">${plate.text}</label>
			</li>
		`;
	}).join('');
}

function toggleDone(e) {
	if (!e.target.matches('input')) return;
	const el = e.target;
	const index = el.dataset.index;
	items[index].done = !items[index].done;
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList);



// Necesitamos tambien almacenar en el array de objetos si esta checked el input o no
