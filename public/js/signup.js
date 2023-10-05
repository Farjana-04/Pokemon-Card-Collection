const signupFormHandler = async (event) => {
  //had spelling mistake, will lower case p
  event.preventDefault();
  
  const username = document.querySelector("#enter-username").value.trim();
  const email = document.querySelector("#enter-email").value.trim();
  const password = document.querySelector("#enter-password").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response)

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
 
};
// function handleLoginErr(err) {
//   $("#alert .msg").text(err.responseJSON);
//   $("#alert").fadeIn(500);
// }
// if (response.status === 409) {
//   alert('Username already exists');
// } else if (response.status === 200) {
//   alert('Signup successful!');
  
// }


document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);