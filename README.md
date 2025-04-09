# Nature Remo MCP server

[![npm version](https://badge.fury.io/js/nature-remo-mcp-server.svg)](https://badge.fury.io/js/nature-remo-mcp-server)

MCP Server for the Nature Remo API.

## Overview

This is an MCP server for Nature Remo, designed to handle requests and interact with the Nature Remo API using the Model Context Protocol SDK. It provides tools to manage and automate interactions with Nature Remo devices.

## Prerequisites

1. Create your own access_token on [Nature Remo Home](https://home.nature.global/). more detail, see [documentation](https://developer.nature.global/en/)).

## Setup

### Usage with VS Code

Add the following configuration to your User Settings (JSON) file. Open the settings by pressing `Cmd + Shift + P` and selecting `Preferences: Open User Settings (JSON)`.

Alternatively, you can create a `.vscode/mcp.json` file in your workspace to share the configuration with others. Note that the `mcp` key is not needed in the `.vscode/mcp.json` file.

> Note that the `mcp` key is not needed in the `.vscode/mcp.json` file.

```json
{
  "mcp": {
    "servers": {
      "nature-remo": {
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
}
```

### Usage with Claude Desktop

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

## Tools

This server provides the following tools:

- **list_devices** - List devices on the home.
  - No parameters required

- **list_appliances** - List appliances on the home.
  - No parameters required

- **operate_tv** - Operate a TV appliance.
  - `applianceId`: Appliance id (string, required)
  - `button`: Button label (string, required)
  - `times`: Number of times to press the button (integer, optional)

- **operate_aircon** - Operate an aircon appliance.
  - `applianceId`: Appliance id (string, required)
  - `airDirection`: Air direction (string, optional)
  - `airDirectionH`: Horizontal air direction (string, optional)
  - `airVolume`: Air volume (string, optional)
  - `button`: Button label (string, optional)
  - `operationMode`: Operation mode (string, optional)
  - `temperature`: Temperature (string, optional)
  - `temperatureUnit`: Temperature unit (string, optional)
  - `times`: Number of times to press the button (integer, optional)

## License

This project is licensed under the terms of the MIT open source license. Please refer to [MIT](./LICENSE) for the full terms.
