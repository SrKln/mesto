class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._data = {};
  }

  getUserInfo() {
    return this._data;
  }

  setUserInfo(data) {
    this._data = data;
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }

  setUserAvatar(data) {
    this._data = data;
    this._avatar.style.backgroundImage = `url(${data.avatar})`;
  }
}

export default UserInfo;
