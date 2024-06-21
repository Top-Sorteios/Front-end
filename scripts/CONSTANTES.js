export const SERVER_NAME = "https://modulo-sorteios.azurewebsites.net/";
export const EMAIL = sessionStorage.getItem("email");
export const SET_EMAIL = (email) => {
  sessionStorage.setItem("email", email);
};
export const SET_TOKEN = (token) => {
  sessionStorage.setItem("token", token);
};
export const TOKEN = sessionStorage.getItem("token");

// export default SERVER_NAME;

const get = async function (endpoint, auth) {
  const request = await fetch(SERVER_NAME + endpoint, {
    method: "GET",
    headers: {
      Autorizathion: `${auth ? "Bearer " + TOKEN : undefined}`,
    },
  });

  if (request.ok) {
    const response = await request.json();
    return response;
  }
};
