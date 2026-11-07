export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  message: 5000,
  bodyBytes: 24_000,
} as const;

export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

type ValidationResult =
  | { success: true; values: ContactValues }
  | { success: false; message: string };

export function validateContact(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { success: false, message: "Please provide a valid contact form." };
  }

  const record = input as Record<string, unknown>;
  const values: ContactValues = { name: "", email: "", message: "" };
  for (const key of ["name", "email", "message"] as const) {
    if (typeof record[key] !== "string") {
      return { success: false, message: "Please fill out all the fields." };
    }
    const value = record[key].trim();
    if (!value || value.length > CONTACT_LIMITS[key]) {
      return {
        success: false,
        message: `Please enter a ${key} between 1 and ${CONTACT_LIMITS[key]} characters.`,
      };
    }
    values[key] = value;
  }

  if (
    /[\x00-\x1f\x7f]/.test(values.name) ||
    !/^[^\s<>@,;:()\\"\x00-\x1f\x7f]+@[^\s<>@,;:()\\"\x00-\x1f\x7f]+\.[^\s<>@,;:()\\"\x00-\x1f\x7f]+$/.test(
      values.email,
    )
  ) {
    return {
      success: false,
      message: "Please enter a valid name and email address.",
    };
  }
  if (values.message.includes("\0")) {
    return { success: false, message: "Please enter a valid message." };
  }
  return { success: true, values };
}
