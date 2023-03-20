class Card {
  constructor(item, template, handleCardClick) {
    this._name = item.name;
    this._link = item.link;

    this._template = template;

    this._handleCardClick = handleCardClick;
  }

  _getElementFromTemplate() {
    return document.querySelector(this._template).content.children[0].cloneNode(true);
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._elementCardLike.classList.toggle("element__like_active");
  }

  _addEventListeners() {
    this._element.querySelector(".element__delete").addEventListener("click", () => this._deleteCard());

    this._elementCardLike.addEventListener("click", () => this._likeCard());
    this._elementCardFoto.addEventListener("click", () => this._handleCardClick(this._name, this._link, this._altName));
  }

  getElement() {
    this._element = this._getElementFromTemplate();

    this._elementCardTitle = this._element.querySelector(".element__title");
    this._elementCardFoto = this._element.querySelector(".element__image");
    this._elementCardLike = this._element.querySelector(".element__like");
    this._altName = `${this._name}. Иллюстрация.`;

    this._elementCardTitle.textContent = this._name;
    this._elementCardFoto.src = this._link;
    this._elementCardFoto.alt = this._altName;

    this._addEventListeners();

    return this._element;
  }
}

export default Card;
