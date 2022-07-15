// check for existing entries
let userEntries = localStorage.getItem("user-entries");
if (userEntries) {
  userEntries = JSON.parse(userEntries);
} else {
  userEntries = [];
}

// saving data in localstorage
const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions =
    document.getElementById("acceptTerms").checked;

  if (acceptTermsAndConditions === true) acceptTermsAndConditions = "accepted";
  else acceptTermsAndConditions = "not accepted";

  const userDetails = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };
  userEntries.push(userDetails);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};

// adding Eventlistener
let form = document.getElementById("user_form");
form.addEventListener("submit", saveUserForm, true);

// display the localstorage

const displayEntries = () => {
  const savedUserEntries = localStorage.getItem("user-entries");
  let entries = "";
  if (savedUserEntries) {
    const parsedUserEntries = JSON.parse(savedUserEntries);
    entries = parsedUserEntries
      .map((entry) => {
        const name = `<td>${entry.name}</td>`;
        const email = `<td>${entry.email}</td>`;
        const password = `<td>${entry.password}</td>`;
        const dob = `<td>${entry.dob}</td>`;
        const acceptTerms = `<td>${entry.acceptTermsAndConditions}</td>`;
        const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
        return row;
      })
      .join("\n");
  }
  var table = `<table border='1' width='100%'><tr>
      <th>Name</th>
      <th>Email</th>
      <th>Password</th>
      <th>dob</th>
      <th>accepted terms?</th>
    </tr>${entries} </table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};
