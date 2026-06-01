# Open Source and Protected Core

Oskar scripts are structured to keep adaptation work simple while protecting the files that should not be touched by most server owners.

## Open Files

Open files are intended for configuration and framework adaptation.

Common examples:

- `config/`
- `functions/`
- `frameworks/`
- Public integration helpers.
- Documentation.

These files are where server owners should adapt inventory, money, permissions, framework methods, profile image lookups, rewards, and public events.

## Protected Core

Protected core files contain the logic that should stay stable across servers.

Common examples:

- Main client logic.
- Main server logic.
- Authentication or license checks.
- Sensitive flow control.

The goal is to avoid editing this layer directly. If something needs to be adapted, it should be exposed through an open function, adapter, config value, export, or event.

## Recommended Workflow

1. Choose the active framework in the config.
2. Edit the framework adapter if your base needs custom behavior.
3. Use open function files for server-specific logic.
4. Keep protected core files untouched.
5. Document any local changes in the script page.
