import "./index.css";

import { titleInputProfile, subtitleInputProfile, buttonOpenPopupProfile, buttonOpenPopupElement, profileEditAvatar, config } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const formsValidators = {};

// Вся валидация
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formsValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

const userProfile = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

const profilePopup = new PopupWithForm(".popup_edit-profile", handleProfileFormSubmit);

const cardPopup = new PopupWithForm(".popup_add-element", handleCardFormSubmit);

const avatarPopup = new PopupWithForm(".popup_edit-avatar", handleAvatarSubmit);

const imagePopup = new PopupWithImage(".popup_open-image");

const deleteCardPopup = new PopupWithConfirmation(".popup_confirmation");

buttonOpenPopupProfile.addEventListener("click", () => {
  profilePopup.open();
  const { about, name } = userProfile.getUserInfo();
  titleInputProfile.value = name;
  subtitleInputProfile.value = about;
  formsValidators["formProfile"].removeValidationErrors();
});

buttonOpenPopupElement.addEventListener("click", () => {
  cardPopup.open();
  formsValidators["formElement"].removeValidationErrors();
});

profileEditAvatar.addEventListener("click", () => {
  avatarPopup.open();
  formsValidators["addAvatar"].removeValidationErrors();
});

// Вся валидация
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "24747cee-051c-47bf-ba30-2cb89fe40c27",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((data) => {
    userProfile.setUserInfo(data);
    userProfile.setUserAvatar(data);
  })
  .catch((err) => console.log(err));

const cards = new Section(
  {
    renderer: (item) => {
      addPhotoAppend(createCard(item));
    },
  },
  ".elements__grid"
);

api
  .getInitialCards()
  .then((items) => {
    cards.renderItems(items);
  })
  .catch((err) => console.log(err));

function createCard(data) {
  data.user = userProfile.getUserInfo();
  const card = new Card(data, ".element-template", {
    click: handleCardClick,
    like: (currentData, callback) => {
      if (card.isLike()) {
        api
          .deleteLike(currentData._id)
          .then((updatedCard) => callback(updatedCard.likes))
          .catch((err) => console.log(err));
      } else {
        api
          .setLike(currentData._id)
          .then((updatedCard) => callback(updatedCard.likes))
          .catch((err) => console.log(err));
      }
    },
    delete: (currentData, callback) => {
      deleteCardPopup.open();
      deleteCardPopup.setQuestion(() => {
        deleteCardPopup.renderLoading(true);
        api
          .deleteCard(currentData._id)
          .then(() => {
            deleteCardPopup.close();
            callback();
          })
          .catch((err) => console.log(err))
          .finally(() => deleteCardPopup.renderLoading(false));
      });
    },
  });

  return card.getElement();
}

function addPhotoPrepend(cardElement) {
  cards.addItemPrepend(cardElement);
}
function addPhotoAppend(cardElement) {
  cards.addItemAppend(cardElement);
}

function handleCardFormSubmit(data) {
  cardPopup.renderLoading(true);
  api
    .addCard({ name: data.name, link: data.link })
    .then((res) => {
      const cardElement = createCard(res);
      addPhotoPrepend(cardElement);
      cardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => cardPopup.renderLoading(false));
}

function handleProfileFormSubmit({ name, about }) {
  profilePopup.renderLoading(true);
  api
    .setUserInfo({ name: name, about: about })
    .then((data) => {
      userProfile.setUserInfo(data);
      profilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => profilePopup.renderLoading(false));
}

function handleAvatarSubmit({ avatar }) {
  avatarPopup.renderLoading(true);
  api
    .setAvatar({ avatar: avatar })
    .then((data) => {
      userProfile.setUserAvatar(data);
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarPopup.renderLoading(false));
}

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}
