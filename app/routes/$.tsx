import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession } from "~/db.server"; // Ajuste o caminho conforme necessário

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("access_token")) {
    return redirect("/dashboard");
  } else {
    return redirect("/free-route");
  }
};