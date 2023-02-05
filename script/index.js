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

//форма профиля
const formEditProfile = document.forms.formProfile;
const titleInputProfile = formEditProfile.elements.formInputTitle;
const subtitleInputProfile = formEditProfile.elements.formInputSubtitle;
const buttonSendProfile = formEditProfile.elements.sendForm;
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const buttonOpenPopupElement = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup_add-element");

//форма добавления карточек
const formAddElement = document.forms.formElement;
const titleInputElement = formAddElement.elements.formInputTitle;
const imageInputElement = formAddElement.elements.formInputImage;
const buttonSendElement = formAddElement.elements.sendForm;

const elementContainer = document.querySelector(".elements__grid");
const elementTemplate = document.querySelector(".element-template").content.querySelector(".element");

const popupOpenImage = document.querySelector(".popup_open-image");
const popupMaxImage = popupOpenImage.querySelector(".popup__image");
const popupTextImage = popupOpenImage.querySelector(".popup__image-text");

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll(".popup__close-button");

// обнуление ошибок валидации
const popupInputsError = document.querySelectorAll(".popup__input-error");
const popupInputs = document.querySelectorAll(".popup__input");

/* функция создания карточки с удалением, лайком и открытием картинки элемента*/
function creatElement(elementTitle, elementImage) {
  const newElement = elementTemplate.cloneNode(true);
  const deleteElement = newElement.querySelector(".element__delete");
  const likeElement = newElement.querySelector(".element__like");

  const ElementFoto = newElement.querySelector(".element__image");
  const ElementTitle = newElement.querySelector(".element__title");
  const ElementAltTitle = elementTitle + ". Иллюстрация.";

  ElementFoto.src = elementImage;
  ElementFoto.alt = ElementAltTitle;
  ElementTitle.textContent = elementTitle;

  deleteElement.addEventListener("click", () => {
    newElement.remove();
  });

  likeElement.addEventListener("click", () => {
    likeElement.classList.toggle("element__like_active");
  });

  newElement.querySelector(".element__image").addEventListener("click", () => {
    popupMaxImage.src = elementImage;
    popupMaxImage.alt = ElementAltTitle;
    popupTextImage.textContent = elementTitle;

    openPopup(popupOpenImage);
  });

  return newElement;
}

/* создание массива карточек и добавление карточек стоковых*/
function arrayInitialCards(initialCards) {
  initialCards.forEach((element) => {
    elementContainer.append(creatElement(element.name, element.link));
  });
}

arrayInitialCards(initialCards);

/* функция закрытие попапов esc*/
const setEscListener = function (event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

/* функции открытия//закрыли всех попапов */
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
}

/* функция формы попапа AddElement */
function submitElement(event) {
  event.preventDefault();
  elementContainer.prepend(creatElement(titleInputElement.value, imageInputElement.value));
  closePopup(popupAddElement);
  event.target.reset();
}

/* функция закрытия попапа при клике за границей попапа */
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

/* слушатель открытия Profile */
buttonOpenPopupProfile.addEventListener("click", () => {
  openPopup(profilePopup);
  clearErrorPopup();
  titleInputProfile.value = profileTitle.textContent;
  subtitleInputProfile.value = profileSubtitle.textContent;
  buttonSendProfile.setAttribute("disabled", true);
});

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
