export const inputReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_INPUT":
      return {
        emailValue: action.emailValue,
        emailValid: action.emailValue.includes("@"),
        passwordValue: state.passwordValue,
        passwordValid: state.passwordValid,
      };
    case "EMAIL_BLUR":
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValue.includes("@"),
        passwordValue: state.passwordValue,
        passwordValid: state.passwordValid,
      };
    case "PASSWORD_INPUT":
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValid,
        passwordValue: action.passwordValue,
        passwordValid: action.passwordValue.trim().length > 6,
      };
    case "PASSWORD_BLUR":
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValid,
        passwordValue: state.passwordValue,
        passwordValid: state.passwordValue.trim().length > 6,
      };
    default:
      return {
        emailValue: "",
        passwordValue: "",
        emailValid: false,
        passwordValid: false,
      };
  }
};
