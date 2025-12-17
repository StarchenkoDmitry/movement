export async function RegisterWithEmail(dto: {
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/auth/register/email",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      }
    );

    return {
      registrationSucceeded: response.status === 201,
    };
  } catch (error) {
    return {
      registrationSucceeded: false,
    };
  }
}
