# MCP Architect

A Model Context Protocol server that provides comprehensive architectural expertise through specialized agents, resources, and tools.

## Features

- Suite of specialized architect agents covering various architectural domains:

  - Software Architecture
  - Cloud Architecture
  - AI Architecture
  - Microservices Architecture
  - Event-Driven Architecture
  - Serverless Architecture
  - Service Mesh Architecture
  - Multi-Cloud and Hybrid Cloud
  - Edge Computing
  - Data Mesh
  - Hexagonal Architecture
  - Blockchain-Based Architecture

- Rich resources including:

  - Design templates
  - Best practices
  - Pattern catalogs
  - Case studies

- Tools for:
  - Generating architectural designs
  - Evaluating architectures
  - Modifying architectural blueprints
  - Performing architectural analysis

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. **Setup**

   ```bash
   # Copy environment file
   cp .env.example .env

   # Add your OpenAI API key
   echo "OPENAI_API_KEY=your-key-here" >> .env
   ```

## Project Structure

```
src/
├── agents/          # Specialized architect agents
├── resources/       # Architecture resources and templates
├── tools/          # Architecture tools and utilities
├── prompts/        # Agent prompts and instructions
└── server.ts       # MCP server implementation
```

## Documentation

- [Getting Started](docs/getting-started.md)
- [API Reference](docs/api-reference.md)
- [Architecture Styles](docs/architecture-styles.md)
- [Contributing](CONTRIBUTING.md)

## Examples

Check out our [examples directory](examples/) for:

- Basic architecture generation
- Custom evaluation criteria
- Integration patterns
- Migration strategies

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Security

Please report security vulnerabilities

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

This project uses the Model Context Protocol SDK and OpenAI's GPT models. See [NOTICE.md](NOTICE.md) for details.
