import Cookies from "js-cookie";

const urlBase = import.meta.env.VITE_REACT_APP_API_URL;

export enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

const request = async <TResponse>(
  url: string,
  method: HttpMethod,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
): Promise<TResponse> => {
  const headers = new Headers({ "Content-Type": "application/json" });
  headers.append("spotify-token", Cookies.get("spotifyAuthToken") || "");

  const response = await fetch(urlBase + url, {
    method,
    headers,
    body: JSON.stringify(data),
  });

  return (await response.json()) as TResponse;
};

export default request;
