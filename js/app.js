const card = document.querySelector("#card");
const progress = document.querySelector("#progress");
const form = document.querySelector("form");
const labelInput = form.querySelector("#labelInput");
const btnCont = form.querySelector("#btnContainer");

let step = 1;
let nameInput = "";
let emailInput = "";
let phoneInput = "";

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
    progress.style.width = "33%";
    step++;
    updateForm(step);
    nameInput = input;
  } else {
    labelInput.lastElementChild.style.border = "1px solid red";
    console.log("empty name");
  }
}

function validateStepTwo(input) {
  if (input) {
    if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(input)) {
      progress.style.width = "66%";
      step++;
      updateForm(step);
      emailInput = input;
    } else {
      labelInput.lastElementChild.style.border = "1px solid red";
      console.log("invalid email");
    }
  } else {
    labelInput.lastElementChild.style.border = "1px solid red";
    console.log("empty email");
  }
}

function validateStepThree(input) {
  if (input) {
    if (/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/i.test(input)) {
      console.log("complete progress animation");
      progress.classList.add("completed");
      phoneInput = input;
      setTimeout(() => {
        completeForm();
      }, 600);
    } else {
      labelInput.lastElementChild.style.border = "1px solid red";
      console.log("invalid phone");
    }
  } else {
    labelInput.lastElementChild.style.border = "1px solid red";
    console.log("empty phone");
  }
}

function updateForm(step) {
  if (step === 1) {
    updateLabelHTML("text", "name", nameInput, "Joe Smith");
    btnCont.innerHTML = `
      <button type="submit" class="whole-btn">Next</button>
    `;
  } else if (step === 2) {
    updateLabelHTML("email", "email", emailInput, "joe@example.com");
    btnCont.innerHTML = `
      <button type="button" class="half-btn prev-btn">Previous</button>
      <button type="submit" class="half-btn">Next</button>
    `;
  } else if (step === 3) {
    updateLabelHTML("tel", "phone", phoneInput, "123-123-1234");
    btnCont.innerHTML = `
      <button type="button" class="half-btn prev-btn">Previous</button>
      <button type="submit" class="half-btn submit-btn">Submit</button>
    `;
  }
}

function updateLabelHTML(type, name, value, placeholder) {
  labelInput.innerHTML = `
    <label for="${name}">${
    name.charAt(0).toUpperCase() + name.slice(1)
  }:</label>
    <input type="${type}" name="${name}" id="${name}" value="${value}" placeholder="${placeholder}"/>
  `;
}

function completeForm() {
  card.innerHTML = `
    <h1>Thanks ${nameInput}!</h1>
    <p>We'll be spamming ${emailInput}</p>
    <p>and scamming ${phoneInput} shortly!</p>
  `;
}
