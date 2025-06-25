const form = document.getElementById('resumeForm');

form.addEventListener('input', () => {
  updatePreview();
  updateProgressBar();
});
form.addEventListener('change', () => {
  updatePreview();
  updateProgressBar();
});

function updatePreview() {
  document.getElementById('pName').textContent = document.getElementById('name').value;
  document.getElementById('pEmail').textContent = document.getElementById('email').value;
  document.getElementById('pPhone').textContent = document.getElementById('phone').value;
  document.getElementById('pSummary').textContent = document.getElementById('summary').value;

  const educationInputs = document.querySelectorAll('.educationInput');
  document.getElementById('pEducation').innerHTML = '<h3>Education:</h3>' +
    Array.from(educationInputs).map(e => `<p>${e.value}</p>`).join('');

  const experienceInputs = document.querySelectorAll('.experienceInput');
  document.getElementById('pExperience').innerHTML = '<h3>Experience:</h3>' +
    Array.from(experienceInputs).map(e => `<p>${e.value}</p>`).join('');

  const checkedSkills = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .map(cb => cb.value).join(', ');
  document.getElementById('pSkills').innerHTML = '<h3>Skills:</h3><p>' + checkedSkills + '</p>';
}

function addEducation() {
  const input = document.createElement('input');
  input.className = 'educationInput';
  input.placeholder = 'Education Detail';
  input.addEventListener('input', () => {
    updatePreview();
    updateProgressBar();
  });
  document.getElementById('education-section').appendChild(input);
}

function addExperience() {
  const input = document.createElement('input');
  input.className = 'experienceInput';
  input.placeholder = 'Experience Detail';
  input.addEventListener('input', () => {
    updatePreview();
    updateProgressBar();
  });
  document.getElementById('experience-section').appendChild(input);
}

function clearForm() {
  form.reset();
  document.querySelectorAll('.educationInput, .experienceInput').forEach(el => el.remove());
  updatePreview();
  updateProgressBar();
}

function generatePDF() {
  const resume = document.getElementById('resumePreview');
  const opt = {
    margin: 0.5,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(resume).set(opt).save();
}

// ✅ Progress bar logic with 1 skill enough
function updateProgressBar() {
  let filledFields = 0;
  let totalFields = 5; // name, email, phone, summary, skills (count as 1)

  if (document.getElementById('name').value.trim()) filledFields++;
  if (document.getElementById('email').value.trim()) filledFields++;
  if (document.getElementById('phone').value.trim()) filledFields++;
  if (document.getElementById('summary').value.trim()) filledFields++;

  // Count 1 if at least one skill is selected
  const hasSkill = document.querySelectorAll('input[type="checkbox"]:checked').length > 0;
  if (hasSkill) filledFields++;

  // Count dynamic education/experience
  const educationInputs = document.querySelectorAll('.educationInput');
  const experienceInputs = document.querySelectorAll('.experienceInput');

  totalFields += educationInputs.length + experienceInputs.length;

  educationInputs.forEach(input => {
    if (input.value.trim()) filledFields++;
  });

  experienceInputs.forEach(input => {
    if (input.value.trim()) filledFields++;
  });

  const percentage = Math.min(100, Math.round((filledFields / totalFields) * 100));
  document.getElementById('progressBar').style.width = `${percentage}%`;
}
