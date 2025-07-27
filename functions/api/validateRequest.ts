export async function validateRequest(req: Request): Promise<{ valid: boolean, error?: string, data?: any }> {
  try {
    if (req.method !== "POST") {
      return { valid: false, error: "Only POST requests are allowed." };
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return { valid: false, error: "Content-Type must be application/json." };
    }

    const data = await req.json();
    if (!data || typeof data !== "object") {
      return { valid: false, error: "Invalid JSON body." };
    }

    // Additional validation logic can be added here
    return { valid: true, data };
  } catch (err) {
    return { valid: false, error: "Invalid request format." };
  }
}