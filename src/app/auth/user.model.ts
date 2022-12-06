export class User {
    constructor(
      // public email: string,
      // public id: string,
      // private _token: string,
      // private _tokenExpirationDate: Date
      private _token: string,
      private _expires: Date,
      private _username: string
    ) {}

    get token() {
      // if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      if (!this._expires || new Date() > this._expires) {
        return null;
      }
      return this._token;
    }
  }
