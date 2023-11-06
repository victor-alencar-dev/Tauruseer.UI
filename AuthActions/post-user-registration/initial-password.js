/**
 * Handler that will be called during the execution of a PostUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that has registered.
 * @param {PostUserRegistrationAPI} api - Methods and utilities to help change the behavior after a signup.
 *
 * https://auth0.com/docs/authenticate/database-connections/password-change
 *
 */
exports.onExecutePostUserRegistration = async (event, api) => {
  var axios = require("axios").default;

  var options = {
    method: "POST",
    url: event.secrets.URL,
    headers: { "content-type": "application/json" },
    data: {
      client_id: event.secrets.CLIENT_ID,
      email: event.user.email,
      connection: "Username-Password-Authentication",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
