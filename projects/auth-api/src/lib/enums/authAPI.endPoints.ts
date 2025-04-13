export class AuthEndPoint {
  static readonly LOGIN = 'auth/signin'
  static readonly SIGNUP = 'auth/signup'
  static readonly CHANGE_PASSWORD = 'auth/changePassword'
  static readonly DELETE_ACCOUNT = 'auth/deleteMe'
  static readonly EDIT_PROFILE = 'auth/editProfile'
  static readonly LOGOUT = 'auth/logout'
  static readonly LOGGED_INFO = 'auth/profileData'
  static readonly FORGET_PASSWORD = 'auth/forgotPassword'
  static readonly RESET_PASSWORD = 'auth/resetPassword'
  static readonly VERIFY_CODE = 'auth/verifyResetCode'
}
