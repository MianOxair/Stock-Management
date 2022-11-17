function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove(
    "form__message--success",
    "form__message--error"
  );
  messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const Username = $("#UserName").val();
    const Password = $("#UserPassword").val();
    if (
      Username == null ||
      Password == null ||
      Username == "" ||
      Password == ""
    ) {
      setFormMessage(loginForm, "error", "Invalid username/password");
      return;
    }

    const data = JSON.stringify({ email: Username, password: Password });

    $.ajax({
      url: "http://localhost:3030/user/login",
      method: "POST",
      contentType: "application/json;charset=UTF-8",
      data: data,
      success: function (res) {
        console.log(res);
        localStorage.setItem("usr", JSON.stringify(res));
        window.location.href = "index2.html";
      },
      error: function (err) {
        console.error(err);
      },
    });
  });

  document.querySelectorAll(".form__input").forEach((inputElement) => {
    inputElement.addEventListener("blur", (e) => {
      if (
        e.target.id === "signupUsername" &&
        e.target.value.length > 0 &&
        e.target.value.length < 8
      ) {
        setInputError(
          inputElement,
          "Username must be at least 10 characters in length"
        );
      }
    });

    inputElement.addEventListener("input", (e) => {
      clearInputError(inputElement);
    });
  });

  createAccountForm.addEventListener("submit", (e) => {
    e.preventDefault();
    setFormMessage(createAccountForm, "error", "");

    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const Username = $("#signupUsername").val();
    const email = $("#email").val();
    const Password = $("#newpassword").val();
    const cpassword = $("#cpassword").val();

    if (
      Username == null ||
      Password == null ||
      Username == "" ||
      Password == ""
    ) {
      setFormMessage(createAccountForm, "error", "Invalid username/password");
      return;
    }

    if (Password != cpassword) {
      setFormMessage(createAccountForm, "error", "Password and Confirmed Password must match.");
      return;
    }

    const data = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: Username,
      password: Password,
    });

    $.ajax({
      url: "http://localhost:3030/user/signup",
      method: "POST",
      contentType: "application/json;charset=UTF-8",
      data: data,
      success: function (res) {
        console.log(res);
        alert("User created");
        localStorage.setItem("usr", JSON.stringify(res));
        window.location.href = "index.html";
      },
      error: function (err) {
        console.error(err);
      },
    });
  });
});
