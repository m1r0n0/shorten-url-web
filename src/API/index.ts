import { Link, RegisterUser, User } from "../Models"
import { ACCOUNT, API, CREATE_LINK, GET_USER_EMAIL, GET_USER_ID, LOGIN, REGISTER, SHORTEN } from "../JS/routeConstants";

const GetUserIdURI: string = `${API}/${ACCOUNT}/${GET_USER_ID}?userEmail=`;
const GetUserEmailURI: string = `${API}/${ACCOUNT}/${GET_USER_EMAIL}?userID=`;
const CreateLinkURI: string = `${API}/${SHORTEN}/${CREATE_LINK}`;
const LoginURI: string = `${API}/${ACCOUNT}/${LOGIN}`;
const RegisterURI: string = `${API}/${ACCOUNT}/${REGISTER}`;

export const fetchUserID = (userEmail: string) => {
  return fetch(GetUserIdURI + userEmail).then((res) => res.json())
}

export const fetchUserEmail = (tempUserID: string) => {
  return fetch(GetUserEmailURI + tempUserID).then((res) => res.json())
}

export const addUrl = (body: Link) => {
  return fetch(CreateLinkURI, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    })
}

export const proceedLogin = (body: User) => {
  return fetch(LoginURI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    })
}

export const proceedRegister = (body: RegisterUser) => {
  return fetch(RegisterURI, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      } else {
        return response.json();
      }
    })
    
}