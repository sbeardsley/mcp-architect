# Contributing to MCP Architect

We love your input! We want to make contributing to MCP Architect as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with Github

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html)

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the ISC Software License

In short, when you submit code changes, your submissions are understood to be under the same [ISC License](LICENSE.md) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issue tracker](../../issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](../../issues/new); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## License

By contributing, you agree that your contributions will be licensed under its ISC License.

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in required values
4. Start the development server:
   ```bash
   npm run dev
   ```

## Testing

We use Jest for testing. To run tests:

```bash
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

Please ensure all new code includes appropriate tests.

## Coding Standards

- Use TypeScript for all new code
- Follow the existing code style
- Use ESLint and Prettier for code formatting:
  ```bash
  npm run lint          # Check code style
  npm run lint:fix      # Fix code style issues
  ```

## Branch Naming Convention

- Feature branches: `feature/short-description`
- Bug fixes: `fix/issue-description`
- Documentation: `docs/what-changed`
- Example: `feature/add-architecture-validation`

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Examples:

```
feat(architecture): add new microservices template
fix(validation): handle empty requirements array
docs(readme): update setup instructions
```

## Pull Request Guidelines

1. **Title**: Use the same format as commit messages
2. **Description**:
   - Explain the problem you're solving
   - Include screenshots for UI changes
   - Link to related issues
3. **Size**: Keep PRs small and focused on a single change
4. **Tests**: Include relevant tests
5. **Documentation**: Update relevant documentation
6. **Review**: Request review from maintainers

## Project Structure

```
src/
├── agents/          # AI agent implementations
├── tools/           # Tool definitions and handlers
├── prompts/         # System prompts and templates
├── resources/       # Static resources and templates
└── server.ts        # Main server implementation
```

## Release Process

1. **Version Bump**:

   ```bash
   npm version patch  # For bug fixes
   npm version minor  # For new features
   npm version major  # For breaking changes
   ```

2. **Changelog**: Update CHANGELOG.md following [Keep a Changelog](https://keepachangelog.com/)

3. **Release Notes**: Create detailed release notes in GitHub
   - Group changes by type (Added, Changed, Deprecated, Removed, Fixed)
   - Include migration instructions if needed
   - Credit contributors

## Security

- **Dependency Updates**: Keep dependencies up to date
- **Security Issues**: Report security vulnerabilities directly to architect@modelcontextprotocol.ai
- **API Keys**: Never commit API keys or secrets
- **Input Validation**: Always validate user input
- **Dependencies**: Only add necessary dependencies
