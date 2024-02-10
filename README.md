# ts-types
[![Build](https://github.com/infrastructure-blocks/ts-types/actions/workflows/build.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-types/actions/workflows/build.yml)
[![NPM Publish Release From Label](https://github.com/infrastructure-blocks/ts-types/actions/workflows/npm-publish-release-from-label.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-types/actions/workflows/npm-publish-release-from-label.yml)
[![Update From Template](https://github.com/infrastructure-blocks/ts-types/actions/workflows/update-from-template.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-types/actions/workflows/update-from-template.yml)
[![codecov](https://codecov.io/gh/infrastructure-blocks/ts-types/graph/badge.svg?token=EHQLSLTN3K)](https://codecov.io/gh/infrastructure-blocks/ts-types)

Types utility library for Typescript.

## Development

### Repo init

This repository leverages [nvm](https://github.com/nvm-sh/nvm) and users should have it installed in their local environment.
In addition, it is recommended that users install a [shell hook](https://github.com/nvm-sh/nvm#deeper-shell-integration)
so that `nvm use` is run upon changing into a project that utilises `nvm`.

Upon checking out the repository, run the following commands:
```shell
nvm install
npm install
npm run compile
npm run lint
npm run test
```

### Package publication

Package publication is fully automated at the CI level. This repository leverages the
[npm-publish-from-label-workflow](https://github.com/infrastructure-blocks/npm-publish-from-label-workflow)
workflow as a turnkey, automated mechanism for publishing packages. Refer to its documentation for usage information.
