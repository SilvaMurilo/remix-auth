import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getSession } from "~/db.server";
import { supabaseClient } from "~/supabase.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("access_token");

    if (!token) {
      console.log("No access token found. Redirecting to login.");
      throw redirect("/login");
    }

    supabaseClient.auth.setSession(token);

    const { data: userData, error: userError } =
      await supabaseClient.auth.getUser();
    if (userError) {
      console.error("Error getting user:", userError);
      throw redirect("/login");
    }

    const { data: peoples, error: dbError } = await supabaseClient
      .from("peoples")
      .select("id, name, age");

    if (dbError) {
      console.error("Error fetching peoples:", dbError);
      return json({ error: dbError.message });
    }

    return json({ peoples, userData });
  } catch (error) {
    console.error("Loader error:", error);
    throw redirect("/login");
  }
};

export default function Dashboard() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="p-6">
      <Form method="post" action="/logout">
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Logout
        </button>
      </Form>
      <h1 className="text-2xl font-bold mt-6">Peoples:</h1>
      <pre className="mt-4 bg-gray-100 p-4 rounded-lg shadow-inner">
        {JSON.stringify(data, null, 3)}
      </pre>
    </main>
  );
}
