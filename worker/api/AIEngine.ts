import { validateRequest } from "../../functions/api/validateRequest";
import { generateTemplate } from "../../functions/api/generateTemplate";

export async function AIEngineHandler(req: Request): Promise<Response> {
  try {
    const { valid, error, data } = await validateRequest(req);
    if (!valid) {
      return new Response(JSON.stringify({ error }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const result = await generateTemplate(data);
    return new Response(JSON.stringify(result), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}