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

const popup = document.querySelector(".popup");
const editClosePopupProfile = popup.querySelector(".popup__close-button_profile");
const editOpenPopupProfile = document.querySelector(".profile__edit-button");

const popupProfile = document.querySelector(".popup__info");
const popupProfileTitle = document.querySelector(".popup__input_profile_title");
const profileTitle = document.querySelector(".profile__title");
const popupProfileSubtitle = document.querySelector(".popup__input_profile_subtitle");
const profileSubtitle = document.querySelector(".profile__subtitle");

const addOpenPopupElement = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup_add-element");
const addClosePopupElement = popupAddElement.querySelector(".popup__close-button_add-element");
const popupElementImage = popupAddElement.querySelector(".popup__input_element-image");
const popupElementTitle = popupAddElement.querySelector(".popup__input_element-title");

const elementContainer = document.querySelector(".elements__grid");
const elementTemplate = document.querySelector(".element-template").content.querySelector(".element");

const popupOpenImage = document.querySelector(".popup_open-image");
const closeImage = popupOpenImage.querySelector(".popup__close-button_image");
const popupMaxImage = popupOpenImage.querySelector(".popup__image");
const popupTextImage = popupOpenImage.querySelector(".popup__image-text");

/* функция создания карточки с удалением, лайком и открытием картинки элемента*/
function creatElement(elementTitle, elementImage) {
  const newElement = elementTemplate.cloneNode(true);
  const deleteElement = newElement.querySelector(".element__delete");
  const likeElement = newElement.querySelector(".element__like");

  newElement.querySelector(".element__image").src = elementImage;
  newElement.querySelector(".element__title").textContent = elementTitle;

  deleteElement.addEventListener("click", () => {
    newElement.remove();
  });

  likeElement.addEventListener("click", () => {
    likeElement.classList.toggle("element__like_active");
  });

  newElement.querySelector(".element__image").addEventListener("click", () => {
    popupMaxImage.src = elementImage;
    popupTextImage.textContent = elementTitle;

    openPopup(popupOpenImage);
  });

  closeImage.addEventListener("click", () => {
    closePopup(popupOpenImage);
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

/* функции открытия//закрыли попап Profile */

function openPopup(popup) {
  popupProfileTitle.value = profileTitle.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

/* функция формы попапа Profile */

function submitFrofile(event) {
  event.preventDefault();
  profileTitle.textContent = popupProfileTitle.value;
  profileSubtitle.textContent = popupProfileSubtitle.value;
  closePopup(popup);
}

/* функция формы попапа AddElement */
function submitElement(event) {
  event.preventDefault();
  elementContainer.prepend(creatElement(popupElementTitle.value, popupElementImage.value));
  closePopup(popupAddElement);
  popupAddElement.reset();
}

/* слушатели  открытия//закрытия  Profile */
editOpenPopupProfile.addEventListener("click", () => {
  openPopup(popup);
});

editClosePopupProfile.addEventListener("click", () => {
  closePopup(popup);
});

/* слушатели  открытия//закрытия  AddElement */

addOpenPopupElement.addEventListener("click", () => {
  openPopup(popupAddElement);
});

addClosePopupElement.addEventListener("click", () => {
  closePopup(popupAddElement);
});

/* слушатель формы попапа Profile */
popupProfile.addEventListener("submit", submitFrofile);

/* слушатель формы попапа AddElement */
popupAddElement.addEventListener("submit", submitElement);
