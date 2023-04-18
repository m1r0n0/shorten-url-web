import { Reducer } from "redux";

interface IDisclaimerAction {
  type: string;
  payload: boolean;
}

interface DisclaimerState {
  isExistingEmail: boolean;
  isIncorrectDateOfBirth: boolean;
  isInvalidEmail: boolean;
  isInvalidPasswordInput: boolean;
  isNoMatchingPasswords: boolean;
}

const defaultState: DisclaimerState = {
  isExistingEmail: false,
  isIncorrectDateOfBirth: false,
  isInvalidEmail: false,
  isInvalidPasswordInput: false,
  isNoMatchingPasswords: false,
};

const SET_IS_EXISTING_EMAIL = "SET_IS_EXISTING_EMAIL";
const SET_IS_INCORRECT_DATE_OF_BIRTH = "IS_INCORRECT_DATE_OF_BIRTH";
const SET_IS_INVALID_EMAIL = "IS_INVALID_EMAIL ";
const SET_IS_INVALID_PASSWORD_INPUT = "IS_INVALID_PASSWORD_INPUT";
const SET_IS_NO_MATCHING_PASSWORDS = "IS_NO_MATCHING_PASSWORDS";
const HIDE_ALL_DISCLAIMERS ="HIDE_ALL_DISCLAIMERS";

export const disclaimerReducer: Reducer<DisclaimerState, IDisclaimerAction> = (
  state = defaultState,
  action: IDisclaimerAction
) => {
  switch (action.type) {
    case SET_IS_EXISTING_EMAIL:
      return { ...state, isExistingEmail: action.payload };
    case SET_IS_INCORRECT_DATE_OF_BIRTH:
      return { ...state, isIncorrectDateOfBirth: action.payload };
    case SET_IS_INVALID_EMAIL:
      return { ...state, isInvalidEmail: action.payload };
    case SET_IS_INVALID_PASSWORD_INPUT:
      return { ...state, isInvalidPasswordInput: action.payload };
    case SET_IS_NO_MATCHING_PASSWORDS:
      return { ...state, isNoMatchingPasswords: action.payload };
    default:
      return state;
  }
};

export const setIsExistingEmailAction = (payload: boolean) => ({
  type: SET_IS_EXISTING_EMAIL,
  payload,
});
export const setIsIncorrectDateOfBirthAction = (payload: boolean) => ({
  type: SET_IS_INCORRECT_DATE_OF_BIRTH,
  payload,
});
export const setIsInvalidEmailAction = (payload: boolean) => ({
  type: SET_IS_INVALID_EMAIL,
  payload,
});
export const setIsInvalidPasswordInputAction = (payload: boolean) => ({
  type: SET_IS_INVALID_PASSWORD_INPUT,
  payload,
});
export const setIsNoMatchingPasswordsAction = (payload: boolean) => ({
  type: SET_IS_NO_MATCHING_PASSWORDS,
  payload,
});
