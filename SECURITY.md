# Security policy

## Supported versions

Security fixes are applied to the latest commit on `main`. This boilerplate does not currently maintain older release branches.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting for the repository rather than opening a public issue. Include affected files or versions, impact, reproduction steps, and any suggested mitigation. Maintainers should acknowledge a complete report within seven days and coordinate disclosure after a fix is available.

## Mobile security scope

A shipped mobile application is an untrusted client. Values in JavaScript bundles, app resources, and `EXPO_PUBLIC_*` variables can be inspected. Keep privileged credentials and authorization decisions on a backend. Use SecureStore for native session tokens, validate external data, avoid token logging, and review the threat model when enabling biometric access or web persistence.
