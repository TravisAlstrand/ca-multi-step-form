const card = document.querySelector("#card");
const error = card.lastElementChild;
const progress = document.querySelector("#progress");
const form = document.querySelector("form");
const labelInput = form.querySelector("#labelInput");
const btnCont = form.querySelector("#btnContainer");

let step = 1;
let nameInput = "";
let emailInput = "";
let phoneInput = "";

labelInput.lastElementChild.focus();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (form.name) {
    validateStepOne(form.name.value);
  } else if (form.email) {
    validateStepTwo(form.email.value);
  } else if (form.phone) {
    validateStepThree(form.phone.value);
  }
});

function validateStepOne(input) {
  if (input) {
    step++;
    updateForm(step);
    nameInput = input;
    handleError();
  } else {
    labelInput.lastElementChild.style.border = "1px solid red";
    handleError("Please provide a name");
  }
}

function validateStepTwo(input) {
  if (input) {
    if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(input)) {
      step++;
      updateForm(step);
      emailInput = input;
      handleError();
    } else {
      labelInput.lastElementChild.style.border = "1px solid red";
      handleError("Invalid email address");
    }
  } else {
    labelInput.lastElementChild.style.border = "1px solid red";
    handleError("Please provide an email address");
  }
}

function validateStepThree(input) {
  if (input) {
    if (/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/i.test(input)) {
      console.log("complete progress animation");
      progress.classList.add("completed");
      phoneInput = input;
      handleError();
      setTimeout(() => {
        completeForm();
      }, 600);
    } else {
      labelInput.lastElementChild.style.border = "1px solid red";
      handleError("Please use (123) 456-7890 or 123-456-7890 formatting");
    }
  } else {
    labelInput.lastElementChild.style.border = "1px solid red";
    handleError("Please provide a phone number");
  }
}

function updateForm(step) {
  if (step === 1) {
    updateLabelHTML("text", "name", nameInput, "Joe Smith");
    btnCont.innerHTML = `
      <button type="submit" class="whole-btn">Next</button>
    `;
    updateProgress("0%");
  } else if (step === 2) {
    updateLabelHTML("email", "email", emailInput, "joe@example.com");
    btnCont.innerHTML = `
      <button type="button" class="half-btn prev-btn">Previous</button>
      <button type="submit" class="half-btn">Next</button>
    `;
    updateProgress("33%");
  } else if (step === 3) {
    updateLabelHTML("tel", "phone", phoneInput, "123-123-1234");
    btnCont.innerHTML = `
      <button type="button" class="half-btn prev-btn">Previous</button>
      <button type="submit" class="half-btn submit-btn">Submit</button>
    `;
    updateProgress("66%");
  }
  labelInput.lastElementChild.focus();
  listenForPrevBtn();
}

function updateLabelHTML(type, name, value, placeholder) {
  labelInput.innerHTML = `
    <label for="${name}">${
    name.charAt(0).toUpperCase() + name.slice(1)
  }:</label>
    <input type="${type}" name="${name}" id="${name}" value="${value}" placeholder="${placeholder}"/>
  `;
}

function listenForPrevBtn() {
  const prevBtn = form.querySelector(".prev-btn");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      step--;
      updateForm(step);
    });
  }
}

function updateProgress(amt) {
  progress.style.width = amt;
}

function handleError(msg) {
  if (!msg) {
    error.style.display = "none";
  } else {
    error.textContent = msg;
    error.style.display = "block";
  }
}

function completeForm() {
  card.innerHTML = `
    <h1>Thanks ${nameInput}!</h1>
    <p>We'll be spamming <strong>${emailInput}</strong></p>
    <p>and scamming <strong>${phoneInput}</strong> shortly!</p>
  `;
}
