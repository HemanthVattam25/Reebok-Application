let form = document.querySelector("#otp-form");

form.addEventListener("submit", validateOTP);
const otp = "1234";

function validateOTP(event) {
  event.preventDefault();
  let enteredOtp = document.querySelector("#otp").value;

  if (enteredOtp !== otp) {
    alert("OTP is Incorrect. Please Check");
  } else {
    alert("OTP verified, Payment Successful");
  }
  window.location.href = "../Navbar/index.html";
}
