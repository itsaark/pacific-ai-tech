# Official Google Ads MCP setup

This project includes Google's official, read-only Google Ads MCP server in
`.codex/config.toml`. It is disabled until the Google Ads and Google Cloud
credentials exist.

Official sources:

- Integration guide: https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server
- Source repository: https://github.com/googleads/google-ads-mcp

## Capabilities

The official server can list accessible Google Ads customers, run read-only
Google Ads Query Language reports, and inspect resource metadata. It cannot
create campaigns, edit ads, change bids, or pause campaigns.

## Credentials required before enabling

1. A Google Ads account accessible to the authenticating Google user.
2. A Google Cloud project with the Google Ads API enabled.
3. A Google Ads developer token with at least Explorer access for production
   account queries.
4. Application Default Credentials or another authentication method supported
   by the official server, authorized for the Google Ads API scope.

The project configuration forwards these local variables when present:

- `GOOGLE_PROJECT_ID`
- `GOOGLE_CLOUD_PROJECT`
- `GOOGLE_ADS_DEVELOPER_TOKEN`
- `GOOGLE_APPLICATION_CREDENTIALS`

Never commit developer tokens, OAuth client secrets, refresh tokens, or service
account keys to this repository.

## Activation

After credentials are configured outside the repository, change
`enabled = false` to `enabled = true` in `.codex/config.toml`, restart the
ChatGPT desktop app or start a new Codex session in this project, and verify the
server appears in `/mcp`.

The current MCP release is read-only. Campaign creation and changes still need
the Google Ads interface, browser automation with explicit approval, or a
separately reviewed write-capable integration.
