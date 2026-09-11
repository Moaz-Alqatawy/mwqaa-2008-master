---
name: Workspace integrity
description: A snapshot can contain duplicated manifest, config, and source blocks that fail before feature code runs.
---

When a workspace snapshot appears to have repeated file contents, validate the root HTML, JSON/YAML/TypeScript configuration, source components, and workspace package manifests before diagnosing the requested feature.

**Why:** Duplicate HTML documents can produce a blank preview, while duplicate source declarations and root configs can make pnpm, TypeScript, and Vite fail before the browser reaches the changed UI.

**How to apply:** Run lightweight JSON/YAML/build checks after structural edits, then verify the specific artifact workflow and browser preview.