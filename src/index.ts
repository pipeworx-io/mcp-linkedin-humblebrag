interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * linkedin-humblebrag MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Transform any achievement into a LinkedIn post. Vulnerability included. Dave wil
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'linkedin_humblebrag_generate',
    description: 'Transform any achievement into a LinkedIn post. Vulnerability included. Dave will be mentioned.',
    inputSchema: {
      type: 'object' as const,
      properties: {"achievement": {"type": "string", "description": "Your achievement"}, "spin": {"type": "string", "enum": ["grateful", "vulnerable", "inspirational", "all_three"]}, "include_lesson": {"type": "boolean", "description": "Add a universal lesson for strangers"}},
      required: ["achievement"],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('linkedin-humblebrag API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'linkedin_humblebrag_generate':
      return callApi('https://api.stupidapis.com/linkedin-humblebrag/generate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
