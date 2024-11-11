let form = document.querySelector("#payment-form");

form.addEventListener("submit", validatePayment);
const cardNumber = "1234567890123456";
const cvv = "123";
const ExpiryDate = "2025-12";

function validatePayment(event) {
  event.preventDefault();
  let enteredCardNumber = document.querySelector("#cardNumber").value;
  let enteredCVV = document.querySelector("#cvv").value;
  let enteredExpiryDate = document.querySelector("#exp-date").value;

  if (enteredCardNumber !== cardNumber) {
    alert("Card Number is Incorrect");
    return;
  }
  if (enteredCVV !== cvv) {
    alert("CVV is Incorrect");
    return;
  }
  if (enteredExpiryDate !== ExpiryDate) {
    alert("Expiry Date is Incorrect");
    return;
  }
  window.location.href = "../OTPPage/otp.html";
}
