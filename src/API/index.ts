import { Link, RegisterUser, User } from "../Models"
import { ACCOUNT, API, CHANGE_LINK_PRIVACY, CHECK_EMAIL_EXISTING, CREATE_LINK, GET_USER_EMAIL, GET_USER_ID, GET_USER_LINKS, LOGIN, REDIRECT, REDIRECT_TO_ORIGINAL_URL, REGISTER, SHORTEN } from "../JS/routeConstants";

const GetUserIdURI: string = `${API}/${ACCOUNT}/${GET_USER_ID}`;
const GetUserEmailURI: string = `${API}/${ACCOUNT}/${GET_USER_EMAIL}`;
const CreateLinkURI: string = `${API}/${SHORTEN}/${CREATE_LINK}`;
const LoginURI: string = `${API}/${ACCOUNT}/${LOGIN}`;
const RegisterURI: string = `${API}/${ACCOUNT}/${REGISTER}`;
const CheckEmailExistingURI: string = `${API}/${ACCOUNT}/${CHECK_EMAIL_EXISTING}`;
const ChangeLinkPrivacyURI: string = `${API}/${SHORTEN}/${CHANGE_LINK_PRIVACY}`;
const GetUserLinksURI: string = `${API}/${SHORTEN}/${GET_USER_LINKS}`;
const RedirectToOriginalUrlURI: string = `${API}/${REDIRECT}/${REDIRECT_TO_ORIGINAL_URL}`;

export const fetchUserID = (userEmail: string) => {
  return fetch(`${GetUserIdURI}?userEmail=${userEmail}`).then((res) => res.json())
}

export const fetchUserEmail = (tempUserID: string) => {
  return fetch(`${GetUserEmailURI}?userID=${tempUserID}`).then((res) => res.json())
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

export const checkEmailExisting = (email: string) => {
return fetch(`${CheckEmailExistingURI}?email=${email}`).then((response) => response.json())
}

export const getItemsForMyLinksTable = (userID: string) => {
  return fetch(`${GetUserLinksURI}?userID=${userID}`)
  .then((res) => res.json())
}

export const changeParticularLinkPrivacy = (body: Link, userID: string | undefined) => {
  body.shortUrl = body.shortUrl.split(".com/").pop()!;
  if (userID === undefined) userID = "";
  let fetchLink: string = `${ChangeLinkPrivacyURI}?shortUrl=${body.shortUrl}&state=${body.isPrivate}&userID=${userID}`;
  body = {...body, userId: userID}
return fetch(fetchLink, {
  method: "POST",
}).then((response) => {
  if (!response.ok) {
    throw new Error(String(response.status));
  }
});
}

export const proceedRedirect = (shortUrl: string, userID: string) => {
  window.location.href = `${RedirectToOriginalUrlURI}?shortUrl=${shortUrl}&userId=${userID}`;
}

