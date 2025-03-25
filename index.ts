#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from 'zod-to-json-schema';

import * as devices from './operations/devices.js';
import * as appliances from './operations/appliances.js';
import * as appliancesTv from './operations/appliances_tv.js';

const server = new Server({
    name: "nature-remo-mcp-server",
    version: "0.0.1"
}, {
    capabilities: {
        tools: {},
    },
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "list_devices",
                description: "List devices on the home",
                inputSchema: zodToJsonSchema(devices.ListDevicesSchema),
            },
            {
                name: "list_appliances",
                description: "List appliances on the home",
                inputSchema: zodToJsonSchema(appliances.ListAppliancesSchema),
            },
            {
                name: "operate_tv",
                description: "Operate a TV appliance",
                inputSchema: zodToJsonSchema(appliancesTv.OperateTvSchema),
            },
        ]
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
        if (!request.params.arguments) {
            throw new Error("Arguments are required");
        }

        switch (request.params.name) {
            case "list_devices": {
                const response = await devices.listDevices({});
                return {
                    content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
                };
            }
            case "list_appliances": {
                const response = await appliances.listAppliances({});
                return {
                    content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
                };
            }
            case "operate_tv": {
                const args = appliancesTv.OperateTvSchema.parse(request.params.arguments);
                const response = await appliancesTv.operateTv(args);
                return {
                    content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
                };
            }
            default:
                throw new Error(`Unknown tool: ${request.params.name}`);
        }
    } catch (error) {
        console.error("Error in request handler:", error);
        if (error instanceof z.ZodError) {
            throw new Error(`Invalid input: ${JSON.stringify(error.errors)}`);
        }
        throw error;
    }
});

async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Nature Remo MCP Server running on stdio");
}

runServer().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
