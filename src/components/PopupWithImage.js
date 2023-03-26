import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupImageCaption = this._popup.querySelector(".popup__image-text");
    super.setEventListeners();
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = `${name}. Иллюстрация.`;
    this._popupImageCaption.textContent = name;

    super.open();
  }
}

export default PopupWithImage;
