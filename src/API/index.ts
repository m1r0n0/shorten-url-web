import { Link, RegisterUser, LoginUser, UserEmailId } from "../Models";
import {
  ACCOUNT,
  API,
  CHANGE_LINK_PRIVACY,
  CHANGE_USER_EMAIL,
  CHECK_EMAIL_EXISTING,
  CREATE_LINK,
  GET_USER_EMAIL,
  GET_USER_ID,
  GET_USER_LINKS,
  LOGIN,
  REDIRECT,
  REDIRECT_TO_ORIGINAL_URL,
  REGISTER,
  SHORTEN,
} from "../JS/routeConstants";

const GetUserIdURI: string = `${API}/${ACCOUNT}/${GET_USER_ID}`;
const GetUserEmailURI: string = `${API}/${ACCOUNT}/${GET_USER_EMAIL}`;
const CreateLinkURI: string = `${API}/${SHORTEN}/${CREATE_LINK}`;
const LoginURI: string = `${API}/${ACCOUNT}/${LOGIN}`;
const RegisterURI: string = `${API}/${ACCOUNT}/${REGISTER}`;
const CheckEmailExistingURI: string = `${API}/${ACCOUNT}/${CHECK_EMAIL_EXISTING}`;
const ChangeLinkPrivacyURI: string = `${API}/${SHORTEN}/${CHANGE_LINK_PRIVACY}`;
const GetUserLinksURI: string = `${API}/${SHORTEN}/${GET_USER_LINKS}`;
const RedirectToOriginalUrlURI: string = `${API}/${REDIRECT}/${REDIRECT_TO_ORIGINAL_URL}`;
const ChangeUserEmailURI: string = `${API}/${ACCOUNT}/${CHANGE_USER_EMAIL}`;

export async function fetchUserID(userEmail: string) {
  const response = await fetch(`${GetUserIdURI}?userEmail=${userEmail}`);
  return await response.json();
}

export async function fetchUserEmail(tempUserID: string) {
  const response = await fetch(`${GetUserEmailURI}?userID=${tempUserID}`);
  return await response.json();
}

export async function addUrl(body: Link) {
  const response = await fetch(CreateLinkURI, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Network response was not OK");
  } else {
    return await response.json();
  }
}

export async function proceedLogin(body: LoginUser) {
  const response = await fetch(LoginURI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not OK");
  } else {
    return await response.json();
  }
}

export async function proceedRegister(body: RegisterUser) {
  const response = await fetch(RegisterURI, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not OK");
  } else {
    return await response.json();
  }
}

export async function checkEmailExisting(email: string) {
  const response = await fetch(`${CheckEmailExistingURI}?email=${email}`);
  return await response.json();
}

export async function getItemsForMyLinksTable(userID: string) {
  const response = await fetch(`${GetUserLinksURI}?userID=${userID}`);
  return await response.json();
}

export async function changeParticularLinkPrivacy(
  body: Link,
  userID: string | undefined
) {
  body.shortUrl = body.shortUrl.split(".com/").pop()!;
  if (userID === undefined) userID = "";
  let fetchLink: string = `${ChangeLinkPrivacyURI}?shortUrl=${body.shortUrl}&state=${body.isPrivate}&userID=${userID}`;
  body = { ...body, userId: userID };
  const response = await fetch(fetchLink, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(String(response.status));
  }
}

export function proceedRedirect(shortUrl: string, userID: string) {
  window.location.href = `${RedirectToOriginalUrlURI}?shortUrl=${shortUrl}&userId=${userID}`;
}

export async function proceedEmailChange(body: UserEmailId) {
  const response = await fetch(ChangeUserEmailURI, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Network response was not OK");
  } else {
    return await response.json();
  }
}
