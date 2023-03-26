const titleInputProfile = document.querySelector(".popup__input_profile_title");
const subtitleInputProfile = document.querySelector(".popup__input_profile_subtitle");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupElement = document.querySelector(".profile__add-button");
const profileEditAvatar = document.querySelector(".profile__avatar");

const config = {
  formSelector: ".popup__info",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export { titleInputProfile, subtitleInputProfile, buttonOpenPopupProfile, buttonOpenPopupElement, profileEditAvatar, config };
