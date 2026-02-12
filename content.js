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

  const btn = document.createElement("button");
  btn.id = "better-github-fork-btn";
  btn.className = "prc-Button-ButtonBase-9n-Xk better-github-fork-btn";
  btn.setAttribute("type", "button");
  btn.setAttribute("data-loading", "true");
  btn.setAttribute("data-size", "small");
  btn.setAttribute("data-variant", "default");
  btn.disabled = true;
  btn.innerHTML = `
    <span data-component="buttonContent" data-align="center" class="prc-Button-ButtonContent-Iohp5 better-github-btn-content">
      <span data-component="leadingVisual" class="prc-Button-Visual-YNt2F prc-Button-VisualWrap-E4cnq better-github-btn-visual">
        <svg aria-hidden="true" focusable="false" class="octicon octicon-repo-forked" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" display="inline-block" overflow="visible" style="vertical-align: text-bottom;">
          <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8 12.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
        </svg>
      </span>
      <span data-component="text" class="prc-Button-Label-FWkx3 better-github-btn-text">Loading...</span>
    </span>
  `;

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
    btn.setAttribute("data-loading", "false");
    btn.onclick = () => {
      window.location.href = forkUrl;
    };
    btn.innerHTML = `
      <span data-component="buttonContent" data-align="center" class="prc-Button-ButtonContent-Iohp5 better-github-btn-content">
        <span data-component="leadingVisual" class="prc-Button-Visual-YNt2F prc-Button-VisualWrap-E4cnq better-github-btn-visual">
          <svg aria-hidden="true" focusable="false" class="octicon octicon-repo-forked" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" display="inline-block" overflow="visible" style="vertical-align: text-bottom;">
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8 12.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
          </svg>
        </span>
        <span data-component="text" class="prc-Button-Label-FWkx3 better-github-btn-text">Go to My Fork</span>
      </span>
    `;
  } else {
    btn.disabled = false;
    btn.setAttribute("data-loading", "false");
    btn.onclick = () => {
      window.location.href = `/${owner}/${repo}/fork`;
    };
    btn.innerHTML = `
      <span data-component="buttonContent" data-align="center" class="prc-Button-ButtonContent-Iohp5 better-github-btn-content">
        <span data-component="leadingVisual" class="prc-Button-Visual-YNt2F prc-Button-VisualWrap-E4cnq better-github-btn-visual">
          <svg aria-hidden="true" focusable="false" class="octicon octicon-repo-forked" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" display="inline-block" overflow="visible" style="vertical-align: text-bottom;">
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8 12.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
          </svg>
        </span>
        <span data-component="text" class="prc-Button-Label-FWkx3 better-github-btn-text">Fork This Repo</span>
      </span>
    `;
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
