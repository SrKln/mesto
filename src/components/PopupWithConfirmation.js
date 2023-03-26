import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSeletor) {
    super(popupSeletor);
    this._form = this._popup.querySelector(".popup__info");
    this._confirmBtn = this._popup.querySelector(".popup__button");
    this._confirmBtnText = this._confirmBtn.textContent;
    this._question = () => {};
    this.setEventListeners();
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._question();
    });
    super.setEventListeners();
  }

  setQuestion(data) {
    this._question = data;
  }

  renderLoading(isLoading, loadingText = "Удаление...") {
    if (isLoading) {
      this._confirmBtn.textContent = loadingText;
    } else {
      this._confirmBtn.textContent = this._confirmBtnText;
    }
  }
}

export default PopupWithConfirmation;
