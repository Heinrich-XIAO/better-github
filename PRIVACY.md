# Privacy Policy

**Effective Date:** February 12, 2026

## Better GitHub Extension

This Privacy Policy explains how the Better GitHub browser extension handles your data.

## Data Collection

The Better GitHub extension does **not** collect, store, or transmit any personal data to external servers. All data is stored locally on your device.

## Data Stored Locally

The extension stores the following information locally in your browser:

1. **GitHub Username** - Stored in `localStorage` to cache your GitHub username for faster loading
2. **Recent Repositories** - Stored in `chrome.storage.local` to cache a list of your recent repositories for display on the GitHub dashboard

## Data Usage

The data stored locally is used solely to provide the extension's functionality:
- To check if you have already forked a repository
- To display your recent repositories on the GitHub dashboard
- To add navigation buttons to GitHub repository pages

## Third-Party Services

The extension only interacts with GitHub's website (`github.com`) and does not send data to any other third-party services.

## Permissions

The extension requests the following permissions:
- **`storage`**: To save your recent repositories list
- **`host_permissions` for `https://github.com/*`**: To inject content scripts and make requests to GitHub pages

## Data Security

All data is stored locally on your device using browser storage mechanisms. No data is transmitted to external servers.

## Changes to This Policy

If we make changes to this privacy policy, we will update the effective date above.

## Contact

If you have questions about this privacy policy, please open an issue on the GitHub repository.
