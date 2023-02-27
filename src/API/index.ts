import { Link } from "../Models"
import { API, CREATE_LINK, SHORTEN } from "../JS/routeConstants";

const CreateLinkURI: string = `${API}/${SHORTEN}/${CREATE_LINK}`;

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