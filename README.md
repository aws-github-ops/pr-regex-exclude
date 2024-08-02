# This repository is archived.


## Pull Request Exclusion Action for GitHub Actions

Sometimes, you don't want to accept pull requests on GitHub against some parts
of your code. This GitHub action accepts a regular expression as an argument,
and if your repository receives a pull request with a pathspec that matches,
the pull request will be automatically closed with a message.

## Building and testing

Install dependencies
```bash
$ yarn install
```

Build and test
```bash
$ yarn run all
```
## Usage

You need to add a workflow file into your repository under
[.github/workflows](./.github/workflows), just like any other Github Action.
This workflow file [follows the standard workflow syntax for Github Actions.](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions).

A sample workflow file for you to use as a drop-in is in [sample_workflow.yml](./sample_workflow.yml).

**NOTE:** For stability, you should use the action with either an
explicit tag, or commit SHA:

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.

