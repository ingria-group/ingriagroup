# Boilerplate

## Requirements

- [Node.js 16.14.2](https://nodejs.org) or later
- [Yarn 1.22.17](https://classic.yarnpkg.com) or later

## Configuration

Copy file `.env.example` to `.env`

```bash
cp .env.example .env
```

| Key                      | Description                       | Required | Type     |
|--------------------------|-----------------------------------|----------|----------|
| `APP_NAME`               | App Name                          | **✓**    | `string` |
| `APP_VERSION`            | App Version                       |          | `string` |
| `APP_BUILD_SIGNATURE`    | App Build Signature               |          | `string` |
|                          |                                   |          |          |
| `API_BASE_URL`           | API Base URL                      | **✓**    | `string` |
| `API_CLIENT_ID`          | API Credential Client ID          | **✓**    | `string` |
| `API_CLIENT_SECRET`      | API Credential Client Secret      | **✓**    | `string` |
| `API_PLATFORM_ID`        | API Platform ID                   | **✓**    | `number` |
|                          |                                   |          |          |
| `MOCK_API_BASE_URL`      | Mock API Base URL                 |          | `string` |
| `MOCK_API_CLIENT_ID`     | Mock API Credential Client ID     |          | `string` |
| `MOCK_API_CLIENT_SECRET` | Mock API Credential Client Secret |          | `string` |

## Installation

```bash
yarn install --frozen-lockfile
```

> Why use `--frozen-lockfile`?
>
> See https://classic.yarnpkg.com/en/docs/cli/install#toc-yarn-install-frozen-lockfile

## Usage

- Start Application
  ```bash
  yarn dev
  ```
- Build Application
  ```bash
  yarn build
  ```
- Check `package.json` to see more script.

