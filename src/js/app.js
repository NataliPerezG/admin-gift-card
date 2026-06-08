import data from '../data/data.json';
import Gift from './clases.js';

// referencias al DOM
// Tabla
const tbody = document.querySelector('.tbody');
const template = document.querySelector('#template').content;
const fragment = document.createDocumentFragment();

// formulario ppal
const form = document.querySelector('.form');
const giftName = document.querySelector('#gift');
const type = document.querySelector('#type');
const time = document.querySelector('#month');
const price = document.querySelector('#price');

// formulario modal
const modal = document.querySelector('dialog');
const formModal = document.querySelector('.form-modal');
const giftNameModal = document.querySelector('.gift-modal');
const typeModal = document.querySelector('.type-modal');
const timeModal = document.querySelector('.month-modal');
const priceModal = document.querySelector('.price-modal');

// LocalStorage
let cards = JSON.parse(localStorage.getItem('cardData'));
if (!cards) {
    cards = data;
    localStorage.setItem('cardData', JSON.stringify(cards));
}

// Variables globales:
let editingId = null;

// Funciones
function loadTable() {
    tbody.innerHTML = '';

    cards.forEach(card => {
        const clone = template.cloneNode(true);
        clone.querySelector('.cardGift').dataset.id = card.id;
        clone.querySelector('.cardName').textContent = card.gift;
        clone.querySelector('.cardType').textContent = card.tipo;
        clone.querySelector('.cardPrice').textContent = card.precio;
        clone.querySelector('.cardTime').textContent = card.tiempo;
        fragment.append(clone);
    });

    tbody.append(fragment);
    form.reset();
    giftName.focus();
}

function getFormData() {
    const cardId = cards.length;
    const card = new Gift(cardId, giftName.value, type.value, time.value, price.value);
    cards.push(card);
    localStorage.setItem('cardData', JSON.stringify(cards));
}

function deleteCard(e) {
    const row = e.target.closest('tr');
    const cardId = row.dataset.id;
    cards = cards.filter(card => card.id != cardId);
    localStorage.setItem('cardData', JSON.stringify(cards));
    loadTable();
}

function openModalForEdit(e) {
    const row = e.target.closest('tr');
    const cardId = row.dataset.id;
    const card = cards.find(c => c.id == cardId);

    editingId = cardId;

    giftNameModal.value = card.gift;
    typeModal.value = card.tipo;
    timeModal.value = card.tiempo;
    priceModal.value = card.precio;

    modal.showModal();
}

function saveEdit() {
    const card = cards.find(c => c.id == editingId);

    card.gift = giftNameModal.value;
    card.tipo = typeModal.value;
    card.tiempo = timeModal.value;
    card.precio = priceModal.value;

    localStorage.setItem('cardData', JSON.stringify(cards));
    loadTable();
    modal.close();
    editingId = null;
}

function closeModal() {
    formModal.reset();
    modal.close();
    editingId = null;
}

// Eventos
loadTable();

form.addEventListener('submit', e => {
    e.preventDefault();
    getFormData();
    loadTable();
});

formModal.addEventListener('submit', e => {
    e.preventDefault();
    saveEdit();
});

document.querySelector('.reset').addEventListener('click', closeModal);

tbody.addEventListener('click', e => {
    if (e.target.classList.contains('fa-pen-to-square')) {
        openModalForEdit(e);
    }

    if (e.target.classList.contains('fa-trash')) {
        deleteCard(e);
    }
});
