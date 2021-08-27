import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import FormInput from "../UI/FormInput/FormInput";
import AuthContext from "../../store/auth-context";
import { inputReducer } from "../../store/inputReducer";

const Login = () => {
  const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [inputState, dispatchInput] = useReducer(inputReducer, {
    emailValue: "",
    passwordValue: "",
    emailValid: null,
    passwordValid: null,
  });
  const { emailValid: emailIsValid, passwordValid: passwordIsValid } =
    inputState;

  useEffect(() => {
    const validityCheck = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(validityCheck);
    };
  }, [emailIsValid, passwordIsValid]);

  const formHandler = (e, type) => {
    switch (type) {
      case "EMAIL_INPUT":
        dispatchInput({ type: "EMAIL_INPUT", emailValue: e.target.value });
        break;
      case "PASSWORD_INPUT":
        dispatchInput({
          type: "PASSWORD_INPUT",
          passwordValue: e.target.value,
        });
        break;
      case "EMAIL_BLUR":
        dispatchInput({ type: "EMAIL_BLUR" });
        break;
      case "PASSWORD_BLUR":
        dispatchInput({ type: "PASSWORD_BLUR" });
        break;
      case "SUBMIT_FORM":
        e.preventDefault();
        if (formIsValid) {
          ctx.onLogin(inputState.emailValue, inputState.passwordValue);
        } else if (!emailIsValid) {
          emailInputRef.current.focus();
        } else {
          passwordInputRef.current.focus();
        }
        break;
      default:
        return;
    }
  };

  return (
    <Card className={classes.login}>
      <form
        onSubmit={(e) =>
          formHandler(e, "SUBMIT_FORM", formIsValid, ctx.onLogin)
        }
      >
        <FormInput
          ref={emailInputRef}
          type="email"
          id="email"
          label="E-Mail"
          value={inputState.emailValue}
          isValid={inputState.emailValid}
          onChange={(e) => formHandler(e, "EMAIL_INPUT")}
          onBlur={(e) => formHandler(e, "EMAIL_BLUR")}
        />
        <FormInput
          ref={passwordInputRef}
          type="password"
          id="password"
          label="Password"
          value={inputState.passwordValue}
          isValid={inputState.passwordValid}
          onChange={(e) => formHandler(e, "PASSWORD_INPUT")}
          onBlur={(e) => formHandler(e, "PASSWORD_BLUR")}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
