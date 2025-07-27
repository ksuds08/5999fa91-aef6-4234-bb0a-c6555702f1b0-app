export function validateUserData(data: any): string | null {
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
