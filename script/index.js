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

const profilePopup = document.querySelector(".popup_edit-profile");
const editClosePopupProfile = profilePopup.querySelector(".popup__close-button_profile");
const editOpenPopupProfile = document.querySelector(".profile__edit-button");

const popupFormProfile = document.querySelector(".popup__info_edit-profile");
const popupProfileTitle = document.querySelector(".popup__input_profile_title");
const profileTitle = document.querySelector(".profile__title");
const popupProfileSubtitle = document.querySelector(".popup__input_profile_subtitle");
const profileSubtitle = document.querySelector(".profile__subtitle");

const addOpenPopupElement = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup_add-element");
const popupFormElement = document.querySelector(".popup__info_add-element");
const addClosePopupElement = popupAddElement.querySelector(".popup__close-button_add-element");
const popupElementImage = popupAddElement.querySelector(".popup__input_element-image");
const popupElementTitle = popupAddElement.querySelector(".popup__input_element-title");

const elementContainer = document.querySelector(".elements__grid");
const elementTemplate = document.querySelector(".element-template").content.querySelector(".element");

const popupOpenImage = document.querySelector(".popup_open-image");
const closeImage = popupOpenImage.querySelector(".popup__close-button_image");
const popupMaxImage = popupOpenImage.querySelector(".popup__image");
const popupTextImage = popupOpenImage.querySelector(".popup__image-text");

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll(".popup__close-button");

/* функция создания карточки с удалением, лайком и открытием картинки элемента*/
function creatElement(elementTitle, elementImage) {
  const newElement = elementTemplate.cloneNode(true);
  const deleteElement = newElement.querySelector(".element__delete");
  const likeElement = newElement.querySelector(".element__like");

  newElement.querySelector(".element__image").src = elementImage;
  newElement.querySelector(".element__title").textContent = elementTitle;
  newElement.querySelector(".element__image").alt = elementTitle + ". Иллюстрация.";

  deleteElement.addEventListener("click", () => {
    newElement.remove();
  });

  likeElement.addEventListener("click", () => {
    likeElement.classList.toggle("element__like_active");
  });

  newElement.querySelector(".element__image").addEventListener("click", () => {
    popupMaxImage.src = elementImage;
    popupMaxImage.alt = elementTitle + ". Иллюстрация.";
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
  profileTitle.textContent = popupProfileTitle.value;
  profileSubtitle.textContent = popupProfileSubtitle.value;
  closePopup(profilePopup);
}

/* функция формы попапа AddElement */
function submitElement(event) {
  event.preventDefault();
  elementContainer.prepend(creatElement(popupElementTitle.value, popupElementImage.value));
  closePopup(popupAddElement);
  event.target.reset();
}

/* функция закрытия попапа при клике за границей попапа */
function closePopupOutZone(event, popup) {
  if (event == popup) {
    closePopup(popup);
  }
}

/* слушатель открытия Profile */
editOpenPopupProfile.addEventListener("click", () => {
  popupProfileTitle.value = profileTitle.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  openPopup(profilePopup);
});

/* слушатель открытия AddElement */
addOpenPopupElement.addEventListener("click", () => {
  openPopup(popupAddElement);
});

/* универсальная логика закрытия всех попапов */
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

/* слушатель формы попапа Profile */
popupFormProfile.addEventListener("submit", submitFrofile);

/* слушатель формы попапа AddElement */
popupFormElement.addEventListener("submit", submitElement);

/* слушатель закрытия при нажатие на зону вне попапа */
allPopap.forEach((popup) => {
  popup.addEventListener("click", function (event) {
    closePopupOutZone(event.target, popup);
  });
});
