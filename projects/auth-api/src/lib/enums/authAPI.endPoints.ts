export class AuthEndPoint {
  static readonly LOGIN = 'signin'
  static readonly SIGNUP = 'signup'
  static readonly CHANGE_PASSWORD = 'changePassword'
  static readonly DELETE_ACCOUNT = 'deleteMe'
  static readonly EDIT_PROFILE = 'editProfile'
  static readonly LOGOUT = 'logout'
  static readonly LOGGED_INFO = 'profileData'
  static readonly FORGET_PASSWORD = 'forgotPassword'
  static readonly RESET_PASSWORD = 'resetPassword'
  static readonly VERIFY_CODE = 'verifyResetCode'
}
