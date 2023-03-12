import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import initialCards from "../utils/constants.js";

const allPopap = document.querySelectorAll(".popup");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_edit-profile");

//форма редактирования профиля
const formEditProfile = document.forms.formProfile;
const titleInputProfile = formEditProfile.elements.formInputTitle;
const subtitleInputProfile = formEditProfile.elements.formInputSubtitle;
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const buttonOpenPopupElement = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup_add-element");

//форма добавления карточки
const formAddElement = document.forms.formElement;
const titleInputElement = formAddElement.elements.formInputTitle;
const imageInputElement = formAddElement.elements.formInputImage;

//попап зума
const popupOpenImage = document.querySelector(".popup_open-image");
const popupMaxImage = popupOpenImage.querySelector(".popup__image");
const popupTextImage = popupOpenImage.querySelector(".popup__image-text");

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

// попап зум
function handleCardClick(name, link, altName) {
  popupMaxImage.src = link;
  popupMaxImage.alt = altName;
  popupTextImage.textContent = name;
  openPopup(popupOpenImage);
}

//создание карточкки

function createCard(item) {
  const card = new Card(".element-template", item, handleCardClick);
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

/* функции открытия и закрытия всех попапов   */

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
  const cardData = {
    name: titleInputElement.value,
    link: imageInputElement.value,
  };
  cardsGrid.prepend(createCard(cardData));
  closePopup(popupAddElement);
  event.target.reset();
}

function closePopupOutZone(event, popup) {
  if (event == popup) {
    closePopup(popup);
  }
}



/* валидация Profile */

const validatorProfile = new FormValidator(config, profilePopup);
validatorProfile.enableValidation();

/* слушатель открытия Profile */

buttonOpenPopupProfile.addEventListener("click", () => {

  titleInputProfile.value = profileTitle.textContent;
  subtitleInputProfile.value = profileSubtitle.textContent;
  openPopup(profilePopup);
  validatorProfile.removeValidationErrors();

});

/* валидация добавление карточки */

const validatorAddElement = new FormValidator(config, popupAddElement);
validatorAddElement.enableValidation();

/* слушатель открытия AddElement */

buttonOpenPopupElement.addEventListener("click", () => {
  openPopup(popupAddElement);
  validatorAddElement.removeValidationErrors();
  formAddElement.reset();
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
