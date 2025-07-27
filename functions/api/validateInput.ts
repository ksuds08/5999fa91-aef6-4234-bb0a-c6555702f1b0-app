export function validateInput(data: any): { valid: boolean, errors?: string[] } {
  const errors: string[] = [];

  if (!data) {
    errors.push('No data provided');
  }

  if (!data.careerGoals) {
    errors.push('Missing career goals');
  }

  if (!data.experience) {
    errors.push('Missing experience');
  }

  if (!data.skills) {
    errors.push('Missing skills');
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}
