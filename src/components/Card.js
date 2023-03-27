class Card {
  userId;
  constructor(data, templateSelector, userId, handleCard) {
    this._titleValue = data.name;
    this._linkValue = data.link;
    this._likes = data.likes;
    this._data = data;

    this._userId = userId;

    this._handleCardLike = handleCard.like;
    this._handleCardDelete = handleCard.delete;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCard.click;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.children[0].cloneNode(true);
    return cardElement;
  }

  _isOwner() {
    return this._userId === this._data.owner._id;
  }

  isLike() {
    return this._data.likes.some((user) => {
      return this._userId === user._id;
    });
  }

  _toogleLike() {
    if (this.isLike()) {
      this._like.classList.add("element__like_active");
      this._likeCounter.textContent = this._data.likes.length;
    } else {
      this._like.classList.remove("element__like_active");
      this._likeCounter.textContent = this._data.likes.length;
    }
  }

  _handleLike() {
    this._handleCardLike(this._data, (updatedLike) => {
      this._data.likes = updatedLike;
      this._toogleLike();
    });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._bin.addEventListener("click", () => {
      this._handleCardDelete(this._data, () => {
        this._deleteCard();
      });
    });

    this._like.addEventListener("click", () => {
      this._handleLike();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._titleValue, this._linkValue);
    });
  }

  getElement() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardImage.src = this._linkValue;
    this._element.querySelector(".element__title").textContent = this._titleValue;
    this._cardImage.alt = `${this._titleValue}. Иллюстрация.`;

    this._like = this._element.querySelector(".element__like");
    this._likeCounter = this._element.querySelector(".element__like-count");
    this._likeCounter.textContent = this._likes.length;
    this._bin = this._element.querySelector(".element__delete");

    if (!this._isOwner()) {
      this._bin.remove();
    }

    this._toogleLike();
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
