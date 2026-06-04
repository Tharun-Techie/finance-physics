/**
 * Evaluates a mathematical formula string against a set of asset metrics variables.
 * Safe and sanitizes input to avoid JS execution hazards.
 */
export function evaluateFormula(formulaStr, variables) {
  if (!formulaStr || typeof formulaStr !== 'string') return 0;
  
  try {
    // Convert to lowercase and strip whitespaces
    let expr = formulaStr.trim().toLowerCase();

    // Map variables to lowercase
    const lowercaseVars = {};
    Object.keys(variables).forEach(key => {
      lowercaseVars[key.toLowerCase()] = variables[key];
    });

    // Sort variable keys by length descending to avoid partial replacements (e.g. marketCap vs cap)
    const sortedKeys = Object.keys(lowercaseVars).sort((a, b) => b.length - a.length);

    // Replace variable names with their values
    sortedKeys.forEach(key => {
      // Use boundary check so 'cap' doesn't replace inside 'marketcap' if it is different
      const val = lowercaseVars[key];
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      expr = expr.replace(regex, val !== undefined ? val : 0);
    });

    // Clean up double operators that might result from replacement, e.g. * -5 is fine, but protect against syntax errors
    // Sanitize: allow only numbers, operators, decimal points, parentheses, and spaces
    const sanitized = expr.replace(/[^0-9+\-*/().\s]/g, '');

    if (!sanitized.trim()) return 0;

    // Use a sandboxed-like function evaluation of the safe mathematical string
    const result = new Function(`return (${sanitized})`)();
    
    if (result === Infinity || result === -Infinity) return 0;
    return isNaN(result) ? 0 : Number(result);
  } catch (error) {
    return 0;
  }
}

/**
 * Validates a formula string by testing it with mock variable values.
 * Returns true if valid, or an error message if invalid.
 */
export function validateFormula(formulaStr, availableMetrics = []) {
  if (!formulaStr || !formulaStr.trim()) {
    return 'Formula cannot be empty';
  }

  // Check matching parentheses
  let openBrackets = 0;
  for (let char of formulaStr) {
    if (char === '(') openBrackets++;
    if (char === ')') openBrackets--;
    if (openBrackets < 0) return 'Mismatched parentheses (extra close bracket)';
  }
  if (openBrackets !== 0) return 'Mismatched parentheses (unclosed bracket)';

  // Build mock variables (all set to 1.5 to check for division by zero errors, etc.)
  const mockVars = {};
  availableMetrics.forEach(m => {
    mockVars[m.id] = 1.5;
  });

  try {
    let expr = formulaStr.trim().toLowerCase();
    
    // Check for invalid characters before variable replacement
    const allowedCharsRegex = /^[a-zA-Z0-9+\-*/().\s]+$/;
    if (!allowedCharsRegex.test(expr)) {
      return 'Contains invalid characters. Only letters, numbers, and + - * / ( ) spaces are allowed.';
    }

    const sortedKeys = Object.keys(mockVars).sort((a, b) => b.length - a.length);
    sortedKeys.forEach(key => {
      const regex = new RegExp(`\\b${key.toLowerCase()}\\b`, 'g');
      expr = expr.replace(regex, '1.5');
    });

    // Check if there are any leftover words (meaning undefined variables were used)
    const leftoverWords = expr.match(/[a-zA-Z]+/g);
    if (leftoverWords && leftoverWords.length > 0) {
      return `Undefined variables: ${[...new Set(leftoverWords)].join(', ')}`;
    }

    const sanitized = expr.replace(/[^0-9+\-*/().\s]/g, '');
    const result = new Function(`return (${sanitized})`)();

    if (isNaN(result)) {
      return 'Formula evaluates to NaN (Not a Number)';
    }

    return true; // Valid!
  } catch (err) {
    return `Syntax Error: ${err.message}`;
  }
}
