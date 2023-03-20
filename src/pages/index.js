import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {  initialCards,
  profilePopup,
  buttonOpenPopupProfile,
  popupAddElement,
  titleInputProfile,
  subtitleInputProfile,
  buttonOpenPopupElement,
  config} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";



// попап зум
const popupWithImage = new PopupWithImage(".popup_open-image");

popupWithImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupWithImage.open({ name, link });
};

//создание карточкки
const cardsGrid = new Section(
  {
    renderer: (item) => cardsGrid.addItem(createCard(item)),
  },
  ".elements__grid"
);

cardsGrid.renderItems(initialCards.reverse());

const addNewCard = new PopupWithForm(".popup_add-element", (data) => {
  cardsGrid.addItem(createCard(data));
  addNewCard.close();
});

addNewCard.setEventListeners();

// создаем карточку и возвращаем карточку
function createCard(data) {
  const card = new Card(data, ".element-template", handleCardClick);
  return card.getElement();
}

//  клик по кнопке добавления карточки
buttonOpenPopupElement.addEventListener("click", () => {
  validatorAddElement.removeValidationErrors();
  addNewCard.open();
});

//передача инво о профиле
const userInfo = new UserInfo({
  dataName: ".profile__title",
  dataDescription: ".profile__subtitle",
});

const popupEditProfile = new PopupWithForm(".popup_edit-profile", submiteditForm);
popupEditProfile.setEventListeners();

function submiteditForm({ formInputTitle, formInputSubtitle }) {
  userInfo.setUserInfo({ formInputTitle, formInputSubtitle });
  popupEditProfile.close();
}

// клик по кнопке редактирования профиля
buttonOpenPopupProfile.addEventListener("click", () => {
  validatorProfile.removeValidationErrors();

  const { name, description } = userInfo.getUserInfo();

  titleInputProfile.value = name;
  subtitleInputProfile.value = description;

  popupEditProfile.open();
});

//валидация форм

const validatorProfile = new FormValidator(config, profilePopup);
validatorProfile.enableValidation();

const validatorAddElement = new FormValidator(config, popupAddElement);
validatorAddElement.enableValidation();
