const popup = document.querySelector(".popup");
const editClosePopupProfile = popup.querySelector(".popup__close-button-profile");
const editOpenPopupProfile = document.querySelector(".profile__edit-button");

const popupProfile = document.querySelector(".popup__info");
const popupProfileTitle = document.querySelector(".popup__input_profile_title");
const profileTitle = document.querySelector(".profile__title");
const popupProfileSubtitle = document.querySelector(".popup__input_profile_subtitle");
const profileSubtitle = document.querySelector(".profile__subtitle");

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

/* слушатели  открытия//закрытия  Profile */
editOpenPopupProfile.addEventListener("click", function () {
  openPopup(popup);
});

editClosePopupProfile.addEventListener("click", () => {
  closePopup(popup);
});

/* слушатель формы попапа Profile */
popupProfile.addEventListener("submit", submitFrofile);
