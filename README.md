# Nature Remo MCP server

MCP Server for the Nature Remo API.

## WIP

It is the MCP server for nature remo.

- Use the Model Context Protocol SDK https://github.com/modelcontextprotocol/typescript-sdk
- Refer to the sample code https://github.com/modelcontextprotocol/servers/tree/main/src/github
- API spec is https://swagger.nature.global/

TODO:

- Create a new TypeScript project and set up the necessary dependencies in the package.json file.
- Write the MCP server code to handle requests and interact with the Nature Remo API using the SDK.

## Setup

### Access Token
To to https://home.nature.global/ .

### Usage with Claude Desktop
To use this with Claude Desktop, add the following to your `claude_desktop_config.json`:

### NPX

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "noboru-i/nature-remo-mcp-server"
      ],
      "env": {
        "ACCESS_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
```
