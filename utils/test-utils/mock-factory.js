// utils/test-utils/test-utils.js

/**
 * Creates a mock request object for testing API routes.
 */
export function createMockReq(options = {}) {
  return {
    method: "GET", // Standardmäßig GET
    ...options, // Erlaubt es uns, z.B. POST zu simulieren
  };
}

/**
 * Creates a mock response object for testing API routes.
 */
export function createMockRes() {
  const res = {};
  // jest.fn() ist ein "Spion" von Jest, der mitschreibt,
  // was mit dieser Funktion passiert.
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}
