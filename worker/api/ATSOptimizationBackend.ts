export async function ATSOptimizationBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const contentType = req.headers.get('content-type');
    if (!contentType || contentType !== 'application/json') {
      return new Response(JSON.stringify({ error: 'Unsupported Media Type' }), {
        status: 415,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await req.json();
    const validationResult = validateRequestBody(body);
    if (!validationResult.isValid) {
      return new Response(JSON.stringify({ error: validationResult.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const optimizedResume = await optimizeForATS(body);
    return new Response(JSON.stringify({ optimizedResume }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

interface RequestBody {
  resumeContent: string;
  industry: string;
  role: string;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

function validateRequestBody(body: any): ValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { isValid: false, message: 'Invalid request body' };
  }

  const { resumeContent, industry, role } = body;

  if (typeof resumeContent !== 'string' || resumeContent.trim() === '') {
    return { isValid: false, message: 'resumeContent is required' };
  }

  if (typeof industry !== 'string' || industry.trim() === '') {
    return { isValid: false, message: 'industry is required' };
  }

  if (typeof role !== 'string' || role.trim() === '') {
    return { isValid: false, message: 'role is required' };
  }

  return { isValid: true };
}

async function optimizeForATS(body: RequestBody): Promise<string> {
  const { resumeContent, industry, role } = body;
  // Simulate a call to an AI model for optimization
  const optimizedContent = `Optimized Resume for ${industry} - ${role}: ${resumeContent}`;
  return optimizedContent;
}
