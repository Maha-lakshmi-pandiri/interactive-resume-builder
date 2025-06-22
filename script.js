const formElements = document.querySelectorAll("#resume-form input, #resume-form textarea, #resume-form input[type='checkbox']");

formElements.forEach(input => {
  input.addEventListener("input", () => {
    updatePreview();
    updateProgress();
  });

  input.addEventListener("change", () => {
    updatePreview();
    updateProgress();
  });
});

function updatePreview() {
  document.getElementById("preview-name").textContent = "Name: " + document.getElementById("name").value;
  document.getElementById("preview-email").textContent = "Email: " + document.getElementById("email").value;
  document.getElementById("preview-phone").textContent = "Phone: " + document.getElementById("phone").value;
  document.getElementById("preview-summary").textContent = "Summary: " + document.getElementById("summary").value;

  const skills = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(e => e.value);
  document.getElementById("preview-skills").textContent = "Skills: " + skills.join(", ");
}

function addEducation() {
  const edu = prompt("Enter Education Detail:");
  if (edu) {
    const li = document.createElement("li");
    li.textContent = edu;
    document.getElementById("preview-education").appendChild(li);
  }
}

function addExperience() {
  const exp = prompt("Enter Experience Detail:");
  if (exp) {
    const li = document.createElement("li");
    li.textContent = exp;
    document.getElementById("preview-experience").appendChild(li);
  }
}

function clearForm() {
  document.getElementById("resume-form").reset();
  document.getElementById("preview-name").textContent = "";
  document.getElementById("preview-email").textContent = "";
  document.getElementById("preview-phone").textContent = "";
  document.getElementById("preview-summary").textContent = "";
  document.getElementById("preview-education").innerHTML = "";
  document.getElementById("preview-experience").innerHTML = "";
  document.getElementById("preview-skills").textContent = "";
  updateProgress();
}

function updateProgress() {
  const inputs = document.querySelectorAll("#resume-form input[type='text'], #resume-form input[type='email'], #resume-form input[type='tel'], #resume-form textarea");
  const total = inputs.length;
  let filled = 0;
  inputs.forEach(input => {
    if (input.value.trim() !== "") filled++;
  });

  const percent = Math.floor((filled / total) * 100);
  document.getElementById("progress-bar").style.width = percent + "%";
}