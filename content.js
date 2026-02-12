(async function () {
  const username = await getUsername();
  if (!username) return;

  const repoMatch = window.location.pathname.match(/^\/([^/]+)\/([^/]+)(?:\/|$)/);
  if (!repoMatch) return;

  const owner = repoMatch[1];
  const repo = repoMatch[2];

  if (owner === username) return;

  addForkButton(owner, repo, username);
})();

async function getUsername() {
  const stored = localStorage.getItem("better-github-username");
  if (stored) return stored;

  const profileLink = document.querySelector('a[data-ga-click*="Header, go to profile"]');
  if (profileLink) {
    const match = profileLink.getAttribute("href").match(/^\/([^/]+)/);
    if (match) {
      localStorage.setItem("better-github-username", match[1]);
      return match[1];
    }
  }

  const userMenu = document.querySelector('meta[name="user-login"]');
  if (userMenu) {
    const username = userMenu.getAttribute("content");
    localStorage.setItem("better-github-username", username);
    return username;
  }

  return null;
}

async function addForkButton(owner, repo, username) {
  if (document.getElementById("better-github-fork-btn")) return;

  const header = document.querySelector("#repository-container-header");
  if (!header) return;

  const actionsContainer = header.querySelector(".pagehead-actions") || 
                           header.querySelector("ul") ||
                           header.querySelector('[class*="actions"]');

  const btn = document.createElement("summary");
  btn.id = "better-github-fork-btn";
  btn.className = "btn-sm btn";
  btn.setAttribute("data-view-component", "true");
  btn.setAttribute("aria-haspopup", "menu");
  btn.setAttribute("role", "button");
  btn.innerHTML = `Loading...`;

  if (actionsContainer) {
    const li = document.createElement("li");
    li.appendChild(btn);
    actionsContainer.insertBefore(li, actionsContainer.firstChild);
  } else {
    header.appendChild(btn);
  }

  const forkUrl = `/${username}/${repo}`;
  const response = await fetch(forkUrl, { method: "HEAD" });

  if (response.status === 200) {
    btn.disabled = false;
    btn.onclick = () => {
      window.location.href = forkUrl;
    };
    btn.innerHTML = `Go to Fork`;
  } else {
    btn.disabled = false;
    btn.onclick = () => {
      window.location.href = `/${owner}/${repo}/fork`;
    };
    btn.innerHTML = `Fork This Repo`;
  }
}

let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    (async function () {
      const username = await getUsername();
      if (!username) return;

      const repoMatch = window.location.pathname.match(/^\/([^/]+)\/([^/]+)(?:\/|$)/);
      if (!repoMatch) return;

      const owner = repoMatch[1];
      const repo = repoMatch[2];

      if (owner === username) return;

      const existingBtn = document.getElementById("better-github-fork-btn");
      if (existingBtn) existingBtn.remove();

      addForkButton(owner, repo, username);
    })();
  }
}).observe(document, { subtree: true, childList: true });
