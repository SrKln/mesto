import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._title = this._popup.querySelector(".popup__image-text");
  }

  open(item) {
    this._image.src = item.link;
    this._image.alt = `${item.name}. Иллюстрация.`;
    this._title.textContent = item.name;

    super.open();
  }
}

export default PopupWithImage;
