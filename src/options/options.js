document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const saveBtn = document.getElementById("save");
  const status = document.getElementById("status");

  const stored = localStorage.getItem("better-github-username");
  if (stored) {
    usernameInput.value = stored;
  }

  saveBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username) {
      localStorage.setItem("better-github-username", username);
      status.style.display = "inline";
      setTimeout(() => {
        status.style.display = "none";
      }, 2000);
    }
  });
});
