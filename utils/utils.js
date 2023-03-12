/* функция закрытие попапов esc */

const setEscListener = function (event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

/* функции открытия и закрытия  всех попапов  */

 function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener("keyup", setEscListener);
};

 function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.addEventListener("keyup", setEscListener);
};


export default {openPopup, closePopup};

