export class User {
  _id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  user_type: string;
  is_admin: boolean;
  profile_picture: string;
  token?: string;

  constructor() {
    this._id = '';
    this.first_name = '';
    this.last_name = '';
    this.user_name = '';
    this.email = '';
    this.password = '';
    this.user_type = 'User';
    this.is_admin = false;
    this.profile_picture = '';
    this.token = '';
  }

  setter(
    _first_name: string,
    _last_name: string,
    _user_name: string,
    _email: string,
    _password: string,
    _user_type: string,
    _profile_picture: string
  ) {
    this.first_name = _first_name;
    this.last_name = _last_name;
    this.user_name = _user_name;
    this.email = _email;
    this.password = _password;
    this.user_type = _user_type;
    this.profile_picture = _profile_picture;
  }
}
