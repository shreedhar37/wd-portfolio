// check for existing entries
let userEntries = localStorage.getItem("user-entries");
if (userEntries) {
  userEntries = JSON.parse(userEntries);
} else {
  userEntries = [];
}

// saving data in localstorage
const saveUserForm = (event) => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions =
    document.getElementById("acceptTerms").checked;

  let acceptTnc;

  if (acceptTermsAndConditions === true) acceptTnc = "accepted";
  else acceptTnc = "not accepted";

  let errors = [];

  if (password.length < 8) {
    errors.push("Password must be atleast 8 characters long !!!");
  }

  if (password.length > 16) {
    errors.push("Password can't be longer than 16 characters long !!");
  }

  let currentYear = parseInt(new Date().getFullYear());
  let userDobYear = parseInt(dob.slice(0, 4));

  if (currentYear - userDobYear < 18 || currentYear - userDobYear > 55) {
    errors.push("Your age need to be between 18 to 55 years old !! ");
  }

  // check for any errors in form
  if (errors.length <= 0) {
    const userDetails = {
      name,
      email,
      password,
      dob,
      acceptTnc,
    };
    userEntries.push(userDetails);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
  } else {
    event.preventDefault();
    alert(errors.join(","));
    errors = [];
  }
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
        const acceptTerms = `<td>${entry.acceptTnc}</td>`;
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

displayEntries();
