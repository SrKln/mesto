const editButtonProfile = document.querySelector(".profile__edit-button");
const editPopupProfile = document.querySelector(".popup_edit-profile");
const editClosePopupProfile = document.querySelector(".popup__close-button-profile");

const popupProfile = document.querySelector(".popup__info");
const popupProfileTitle = document.querySelector(".popup__input_profile_title");
const profileTitle = document.querySelector(".profile__title");
const popupProfileSubtitle = document.querySelector(".popup__input_profile_subtitle");
const profileSubtitle = document.querySelector(".profile__subtitle");

/* открыли//закрыли попап Profile */

editButtonProfile.addEventListener("click", (event) => {
  event.preventDefault();
  editPopupProfile.classList.add("popup_opened");
});

editClosePopupProfile.addEventListener("click", () => {
  editPopupProfile.classList.remove("popup_opened");
});

/* отработка формы попапа Profile */

function submitFrofile(event) {
  event.preventDefault();
  profileTitle.textContent = popupProfileTitle.value;
  profileSubtitle.textContent = popupProfileSubtitle.value;
  editPopupProfile.classList.remove("popup_opened");
}

popupProfile.addEventListener("submit", submitFrofile);
