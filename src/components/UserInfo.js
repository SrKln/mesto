class UserInfo {
  constructor({ dataName, dataDescription }) {
    this._elementName = document.querySelector(dataName);
    this._elementDescription = document.querySelector(dataDescription);
  }
  getUserInfo() {
    return {
      name: this._elementName.textContent,
      description: this._elementDescription.textContent,
    };
  }

  setUserInfo({ formInputTitle, formInputSubtitle }) {
    this._elementName.textContent = formInputTitle;
    this._elementDescription.textContent = formInputSubtitle;
  }
}

export default UserInfo;
