import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector(".popup__info");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._inputValue = {};
    this._inputList.forEach((input) => {
      this._inputValue[input.name] = input.value;
    });
    return this._inputValue;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}

export default PopupWithForm;
