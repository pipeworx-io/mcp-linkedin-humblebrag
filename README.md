# mcp-linkedin-humblebrag

linkedin-humblebrag MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `linkedin_humblebrag_generate` | Transform any achievement into a LinkedIn post. Vulnerability included. Dave will be mentioned. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "linkedin-humblebrag": {
      "url": "https://gateway.pipeworx.io/linkedin-humblebrag/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use linkedin-humblebrag
```

## License

MIT
