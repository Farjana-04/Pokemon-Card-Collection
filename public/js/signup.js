const signupFormHandler = async (event) => {
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

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);