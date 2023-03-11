import openPopup from './index.js';

const popupOpenImage = document.querySelector(".popup_open-image");
const popupMaxImage = popupOpenImage.querySelector(".popup__image");
const popupTextImage = popupOpenImage.querySelector(".popup__image-text");

class Card {
  constructor(template, item ) {
    this._name = item.name;
    this._link = item.link;

    this._template = template;

  }

  _getElementFromTemplate() {
    return document.querySelector(this._template)
      .content
      .children[0]
      .cloneNode(true);
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _zoomCard() {
    popupMaxImage.src = this._link;
    popupMaxImage.alt = `${this._name}. Иллюстрация.`;;
    popupTextImage.textContent = this._name;
    openPopup(popupOpenImage);
  }

  _addEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => this._deleteCard());
    this._element.querySelector('.element__like').addEventListener('click', () => this._likeCard());
    this._element.querySelector('.element__image').addEventListener('click', () => this._zoomCard());
  }

   getElement() {
    this._element = this._getElementFromTemplate();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = `${this._name}. Иллюстрация.`;

    this._addEventListeners();

    return this._element;
  }

}

export default Card;
