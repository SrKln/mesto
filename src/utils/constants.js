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

const profilePopup = document.querySelector(".popup_edit-profile");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");

const popupAddElement = document.querySelector(".popup_add-element");

const titleInputProfile = document.querySelector(".popup__input_profile_title");

const subtitleInputProfile = document.querySelector(".popup__input_profile_subtitle");

const buttonOpenPopupElement = document.querySelector(".profile__add-button");

const config = {
  formSelector: ".popup__info",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export {
  initialCards,
  profilePopup,
  buttonOpenPopupProfile,
  popupAddElement,
  titleInputProfile,
  subtitleInputProfile,
  buttonOpenPopupElement,
  config
};
