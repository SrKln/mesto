import Card from "./card.js";
import FormValidator from "./FormValidator.js";
export default openPopup;

const initialCards = [
  {
    name: "Казанский кремль",
    link: "https://i.postimg.cc/FFS3s0z2/image-grid-1.jpg",
  },
  {
    name: "Кул-Шариф",
    link: "https://i.postimg.cc/QNSs7yF5/image-grid-2.jpg",
  },
  {
    name: "Дворец земледельцев",
    link: "https://i.postimg.cc/vmRdMRKR/image-grid-3.jpg",
  },
  {
    name: "Татмак",
    link: "https://i.postimg.cc/zB7mnyG5/image-grid-4.jpg",
  },
  {
    name: "Озеро Кабан",
    link: "https://i.postimg.cc/VLTxBQmS/image-grid-5.webp",
  },
  {
    name: "Богоявленская колокольня",
    link: "https://i.postimg.cc/hG8NBXxx/image-grid-6.jpg",
  },
];

const allPopap = document.querySelectorAll(".popup");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_edit-profile");

//форма редактирования профиля
const formEditProfile = document.forms.formProfile;
const titleInputProfile = formEditProfile.elements.formInputTitle;
const subtitleInputProfile = formEditProfile.elements.formInputSubtitle;
const buttonSendProfile = formEditProfile.elements.sendForm;
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const buttonOpenPopupElement = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup_add-element");

//форма добавления карточки
const formAddElement = document.forms.formElement;
const titleInputElement = formAddElement.elements.formInputTitle;
const imageInputElement = formAddElement.elements.formInputImage;
const buttonSendElement = formAddElement.elements.sendForm;

//родительский у карточек
const cardsGrid = document.querySelector(".elements__grid");

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll(".popup__close-button");

// обнуление ошибок валидации
const popupInputsError = document.querySelectorAll(".popup__input-error");
const popupInputs = document.querySelectorAll(".popup__input");

const config = {
  formSelector: ".popup__info",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

//создание карточкки

function createCard(item) {
  const card = new Card(".element-template", item);
  return card.getElement();
}

//перебор базового набора карточек

function renderBaseCards() {
  initialCards.reverse().forEach((item) => {
    prependCard(item);
  });
}

function prependCard(item) {
  cardsGrid.prepend(createCard(item));
}

/* функция закрытие попапов esc есть++*/

const setEscListener = function (event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

/* функции открытия//закрыли всех попапов  есть++*/

function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener("keyup", setEscListener);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.addEventListener("keyup", setEscListener);
}

/* функция формы попапа Profile */

function submitFrofile(event) {
  event.preventDefault();
  profileTitle.textContent = titleInputProfile.value;
  profileSubtitle.textContent = subtitleInputProfile.value;
  closePopup(profilePopup);
  event.target.reset();
}

function submitElement(event) {
  event.preventDefault();
  const its = {
    name: titleInputElement.value,
    link: imageInputElement.value,
  };
  cardsGrid.prepend(createCard(its));
  closePopup(popupAddElement);
  event.target.reset();
}

function closePopupOutZone(event, popup) {
  if (event == popup) {
    closePopup(popup);
  }
}

/* функция очищения от ошибок */

function clearErrorPopup() {
  for (let i = 0; i < popupInputsError.length; i++) {
    popupInputsError[i].textContent = "";
    popupInputsError[i].classList.remove("popup__input-error_active");
    popupInputs[i].classList.remove("popup__input_type_error");
  }
}

/* валидация Profile */

const validatorProfile = new FormValidator(config, profilePopup);
validatorProfile.enableValidation();

/* слушатель открытия Profile */

buttonOpenPopupProfile.addEventListener("click", () => {
  openPopup(profilePopup);
  clearErrorPopup();
  titleInputProfile.value = profileTitle.textContent;
  subtitleInputProfile.value = profileSubtitle.textContent;
  buttonSendProfile.setAttribute("disabled", true);
});

/* валидация добавление карточки */

const validatorAddElement = new FormValidator(config, popupAddElement);
validatorAddElement.enableValidation();

/* слушатель открытия AddElement */

buttonOpenPopupElement.addEventListener("click", () => {
  clearErrorPopup();
  openPopup(popupAddElement);
  titleInputElement.value = "";
  imageInputElement.value = "";
  buttonSendElement.setAttribute("disabled", true);
});

/* универсальная логика закрытия всех попапов */

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

/* слушатель формы попапа Profile */

formEditProfile.addEventListener("submit", submitFrofile);

/* слушатель формы попапа AddElement */

formAddElement.addEventListener("submit", submitElement);

/* слушатель закрытия при нажатие на зону вне попапа */

allPopap.forEach((popup) => {
  popup.addEventListener("click", function (event) {
    closePopupOutZone(event.target, popup);
  });
});

renderBaseCards();
