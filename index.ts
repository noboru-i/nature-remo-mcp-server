#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const server = new Server(
    {
        name: "github-mcp-server",
        version: "0.0.1",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);
