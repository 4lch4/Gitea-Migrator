# Gitea-Migrator

A small utility written in TypeScript that processes a data file containing repos on GitHub and migrates them to a Gitea instance.

## Requirements

To use the migrator tool, you need the following pieces of information for the `.env` file. Rename the `template.env` file to just `.env` and then fill in the values as needed, with the `GH_API_BASE_URL` being the only optional value.

- `GITEA_API_BASE_URL`
  - The base API URL for the instance of Gitea you're migrating your repositories to.
  - Example: `https://git.4lch4.io/api/v1`
- `GITEA_API_TOKEN`
  - An application token generated in the **Settings/Applications** page of your Gitea instance.
- `GH_API_BASE_URL`
  - An optional URL for the GitHub API, defaults to the regular "https://api.github.com".
  - I'm not too sure why this is available, but it's an option just in case something changes in the future.
- `GH_API_TOKEN`
  - An authentication token for the GitHub API. It requires the following scopes, and I'll explain why each scope is necessary for which function of the migration process:
    - `Repo (All)`
      - Grants access to all private and public repositories so they can be listed and migrated.
      - Specifically used with the [repos.listForAuthenticatedUser][1] endpoint.
    - `admin:org` -> `read:org`
      - Gitea supports the creation of orgs, so this scope enables us to use the [orgs] endpoint to list the orgs you're a part of and recreate those orgs in Gitea, along with their repos.
    - `admin:public_key` -> `read:public_key`
      - Your SSH public keys can be migrated over to your Gitea instance, and this scope grants us access to read the SSH public keys you have saved to your account so we can do the migration.
    - `admin:repo_hook` -> `read:repo_hook`
      - As Gitea supports webhooks and hooks for repos, similar to GitHub, being able to read the hooks on each repo enables the utility to copy/migrate those over to Gitea as well.
    - `user` -> `read:user`
      - Lets us read all the information about the user so we can copy it over to their account on Gitea.
    - `project` -> `read:project`
      - Lets us list all GitHub projects so we can copy them over to Gitea as well.

## Usage

In order to use the tool, you must rename the `template.env` file to `.env` and fill it with the [information mentioned above][2]. Once the `.env` file is ready to go, you can transpile the code and run it like so:

```bash
# Transpile the TypeScript to JavaScript.
tsc

# Begin execution of the utility.
node ./dist/index.js
```

!!!note Default Sleep Timer
    Depending on the amount of repos you have on GitHub, this can take quite some time to execute. By default, each time a new repository is gonna be migrated a message is displayed and a 5 second sleep is started, then the migration is actually started. This is specifically so the user can cancel the utility while it's running without causing a migration error.

    If you cancel the app while it's migrating a repository then the migration will fail and you'll have to restart it, this is why there's the 5 second sleep. To disable it, set `DISABLE_SLEEP=true` in the `.env` file.

[0]: https://git.4lch4.io/user/settings/applications
[1]: https://docs.github.com/en/rest/repos/repos#list-repositories-for-the-authenticated-user
[2]: #Requirements
