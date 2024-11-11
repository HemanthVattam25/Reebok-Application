let login = document.getElementById("form");
login.addEventListener("submit", loginAction);

function loginAction(event) {
  event.preventDefault();
  let userArr = JSON.parse(localStorage.getItem("userDetails")) || [];

  let loginEmail = document.getElementById("loginEmail").value;
  let loginPassword = document.getElementById("loginPassword").value;

  let userFound = false;
  userArr.forEach((element) => {
    if (
      loginEmail === element.userEmail &&
      loginPassword === element.userPassword
    ) {
      userFound = true;
      alert("Login Successful, Welcome to Reebok");
      window.location.href = "../Navbar/index.html";
    }
  });
  if (!userFound) {
    alert("You are not an Existing User, Please SignUp");
    window.location.href = "../SignupPage/signup.html ";
  }
}
