export async function UserDataPrivacyBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    const contentType = req.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Invalid content type' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const requestBody = await req.json();
    const validationError = validateUserData(requestBody);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Perform operations with user data, e.g., storing securely or processing

    return new Response(JSON.stringify({ message: 'User data processed successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

function validateUserData(data: any): string | null {
  if (typeof data !== 'object' || data === null) {
    return 'Invalid data format';
  }

  if (!data.name || typeof data.name !== 'string') {
    return 'Name is required and must be a string';
  }

  if (!data.email || typeof data.email !== 'string' || !validateEmail(data.email)) {
    return 'Valid email is required';
  }

  if (!data.resumeDetails || typeof data.resumeDetails !== 'object') {
    return 'Resume details are required';
  }

  return null;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}
