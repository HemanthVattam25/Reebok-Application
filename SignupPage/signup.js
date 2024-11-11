let signup = document.querySelector("#form");
signup.addEventListener("submit", signUp);

function signUp(event) {
  event.preventDefault();

  let userArr = JSON.parse(localStorage.getItem("userDetails")) || [];
  let givenEmail = document.getElementById("userEmail").value;

  let userExists = false;
  userArr.forEach((element) => {
    if (givenEmail === element.userEmail) {
      userExists = true;
      alert("You are an existing user, Please Login!");
      window.location.href = "../LoginPage/login.html";
    }
  });

  if (!userExists) {
    let userObj = {
      userEmail: document.getElementById("userEmail").value,
      userPassword: document.getElementById("signupPassword").value,
    };
    console.log(userObj);
    userArr.push(userObj);
    console.log(userArr);
    localStorage.setItem("userDetails", JSON.stringify(userArr));
    alert("You are successfully Signed Up");
    form.reset();
    window.location.href = "../Navbar/index.html";
  }
}
