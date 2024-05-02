export async function createAccount({ formData }: { formData: FormData }) {
  const request = new Request("/api/signup", {
    body: formData,
    method: "POST",
    cache: "no-cache",
  });

  try {
    const res = await fetch(request);
    return Response.json({
      message: "The account was created",
      payload: res.text(),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
