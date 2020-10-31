document.addEventListener("DOMContentLoaded", () => {
  console.log("Page chargée");
  const $ = document;

  /* Launch Authentication */
  $.querySelector("#login-signin").addEventListener("click", (event) => {
    event.preventDefault();
    $.querySelector(".modal-signin").classList.add("modal-signin-display");
    $.querySelector("#signin-title").textContent =
      "Bienvenue ; connectez-vous !"; /* assign default title */
    if (
      $.querySelector(".form-login-display").classList.contains(
        "form-login-hidden"
      )
    ) {
      $.querySelector(".form-login-display").classList.remove(
        "form-login-hidden"
      );
    }
    if (
      $.querySelector(".form-signin-hidden").classList.contains(
        "form-signin-display"
      )
    ) {
      $.querySelector(".form-signin-hidden").classList.remove(
        "form-signin-display"
      );
    }
    if (
      $.querySelector("#initialize-form").classList.contains(
        "form-initialize-display"
      )
    ) {
      $.querySelector("#initialize-form").classList.remove(
        "form-initialize-display"
      );
    }
  });

  /* Leave Authentication */
  $.querySelector("#annulate-signin").addEventListener("click", (event) => {
    event.preventDefault();
    $.querySelector(".modal-signin").classList.remove("modal-signin-display");
  });

  /* Swipe on signin mode */
  $.querySelector("#swipe-signin").addEventListener("click", (event) => {
    event.preventDefault();
    $.querySelector(".form-login-display").classList.add("form-login-hidden");
    $.querySelector(".form-signin-hidden").classList.add("form-signin-display");
    $.querySelector("#signin-title").textContent =
      "Inscrivez-vous : c'est gratuit !"; /* Change title */
  });

  /* Swipe on initalize mode */
  $.querySelector("#swipe-initialize").addEventListener("click", (event) => {
    event.preventDefault();
    $.querySelector("#login-form").classList.add("form-login-hidden");
    $.querySelector("#initialize-form").classList.add(
      "form-initialize-display"
    );
    $.querySelector("#signin-title").textContent =
      "Vous avez oublié votre mot de passe ?"; /* Change title */
  });

  /* Manage login authentication */
  $.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      email: $.querySelector("#login-email").value,
      password: $.querySelector("#login-password").value,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        data
      );
      if (
        response &&
        response.status >= 200 &&
        response.status < 300 &&
        response.data &&
        response.data.account
      ) {
        const firstname = String(response.data.account.username).split(" ")[0];
        $.querySelector("#connected-user-text").textContent = firstname;
        $.querySelector("#login-signin").classList.add("login-signin-hidden");
        $.querySelector("#connected-user").classList.add(
          "connected-user-display"
        );
      } else {
        alert("Un problème empêche votre connexion !");
      }
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        alert(
          `${error.response.data.error.message} (${error.response.status}) `
        );
      } else {
        alert("Une erreur empêche votre authentification !");
      }
    }

    $.querySelector(".modal-signin").classList.remove("modal-signin-display");
  });

  /* Manage signin authentication */
  $.querySelector("#signin-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstname = $.querySelector("#firstname").value;
    const lastname = $.querySelector("#lastname").value;

    const data = {
      username: `${firstname} ${lastname}`,
      email: $.querySelector("#signin-email").value,
      password: $.querySelector("#signin-password").value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        data
      );
      if (
        response &&
        response.status >= 200 &&
        response.status < 300 &&
        response.data &&
        response.data.account
      ) {
        alert(
          "Votre compte a bien été créé. Veuillez consulter votre messagerie."
        );
        const firstname = String(response.data.account.username).split(" ")[0];
        $.querySelector("#connected-user-text").textContent = firstname;
        $.querySelector("#login-signin").classList.add("login-signin-hidden");
        $.querySelector("#connected-user").classList.add(
          "connected-user-display"
        );
      } else {
        alert("Un problème empêche la création de votre compte !");
      }
    } catch (error) {
      console.log(error);
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        alert(
          `${error.response.data.error.message} (${error.response.status}) `
        );
      } else {
        alert("Une erreur empêche la création de votre compte !");
      }
    }

    $.querySelector(".modal-signin").classList.remove("modal-signin-display");
  });

  /* Manage initialize authentication */
  $.querySelector("#initialize-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      email: $.querySelector("#initialize-email").value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/user/initialize",
        data
      );
      if (response && response.status >= 200 && response.status < 300) {
        alert(
          "Votre mot de passe a été réinitialisé. Veuillez consulter votre messagerie pour le changer."
        );
      } else {
        alert(
          "Un problème empêche la réinitialisation de votre mot de passe !"
        );
      }
    } catch (error) {
      console.log(error);
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        alert(
          `${error.response.data.error.message} (${error.response.status}) `
        );
      } else {
        alert("Une erreur empêche la réinitialisation de votre mot de passe !");
      }
    }

    $.querySelector(".modal-signin").classList.remove("modal-signin-display");
  });
});
