import { Link } from "@remix-run/react";
import logo from "../assets/images/Logo.png";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { supabaseClient } from "~/supabase.server";
import { commitSession, getSession } from "~/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  const { data: user, error } = await supabaseClient.auth.signInWithPassword({
    email: email.toString(),
    password: password.toString(),
  });
  if (error) {
    console.error("Sign in error:", error.message);
    return json({ error: error.message });
  }

  if (user) {
    const session = await getSession(request.headers.get("Cookie"));
    session.set("access_token", user.session.access_token);
    return redirect("/", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }
  return json({});
};

export default function Login() {
  return (
    <>
      <section className="flex flex-col md:flex-row gap-16 p-8 bg-gray-100 rounded-lg shadow-lg">
        <aside className="md:w-1/3 flex flex-col items-center justify-center mb-8 md:mb-0">
          <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
            Sign in to your account
          </h1>
          <img src={logo} alt="Logo" width={300} className="mb-4" />
        </aside>

        <section className="md:w-2/3">
          <form
            action="#"
            method="POST"
            className="bg-white p-6 rounded-lg shadow-md"
          >
            {/* EMAIL */}
            <section className="mb-4">
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium"
                >
                  Email
                </label>
              </div>
              <div>
                <input
                  name="email"
                  id="email"
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </section>

            {/* PASSWORD */}
            <section className="mb-4">
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium"
                >
                  Password
                </label>
              </div>
              <div>
                <input
                  name="password"
                  id="password"
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </section>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>

          {/* SIGNUP BUTTON */}
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Don&apos;t have an account?
              <Link to="/signup" className="text-blue-500 hover:underline">
                &nbsp;Sign Up
              </Link>
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
            Don&apos;t want to register? Access the 
              <Link to="/free-route" className="text-blue-500 hover:underline">
                &nbsp;Free Route
              </Link>
            </p>
          </div>
        </section>
      </section>
    </>
  );
}
