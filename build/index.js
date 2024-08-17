var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  Layout: () => Layout,
  default: () => App
});
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx2(ScrollRestoration, {}),
      /* @__PURE__ */ jsx2(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx2(Outlet, {});
}

// app/routes/free-route.tsx
var free_route_exports = {};
__export(free_route_exports, {
  default: () => FreeRoute
});
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function FreeRoute() {
  return /* @__PURE__ */ jsxs2("div", { className: "flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50", children: [
    /* @__PURE__ */ jsx3("h1", { className: "text-3xl mb-4 text-center", children: "Free Route" }),
    /* @__PURE__ */ jsx3("p", { className: "mb-6 text-center", children: "This is a publicly accessible route. No authentication is required." }),
    /* @__PURE__ */ jsxs2("div", { className: "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4", children: [
      /* @__PURE__ */ jsx3(
        "a",
        {
          href: "/login",
          className: "px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75",
          children: "Log In"
        }
      ),
      /* @__PURE__ */ jsx3(
        "a",
        {
          href: "/signup",
          className: "px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75",
          children: "Sign Up"
        }
      )
    ] })
  ] });
}

// app/routes/dashboard.tsx
var dashboard_exports = {};
__export(dashboard_exports, {
  default: () => Dashboard,
  loader: () => loader
});
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

// app/db.server.ts
import { createCookieSessionStorage } from "@remix-run/node";
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret)
  throw new Error("SESSION_SECRET environment variable is not defined");
var sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: !0,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: !0
  }
}), { getSession, commitSession, destroySession } = sessionStorage;

// app/supabase.server.ts
import { createClient } from "@supabase/supabase-js";
var supabaseUrl = process.env.SUPABASE_URL, supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl)
  throw new Error(
    "SUPABASE_URL is not defined. Please set it in your environment variables."
  );
if (!supabaseAnonKey)
  throw new Error(
    "SUPABASE_ANON_KEY is not defined. Please set it in your environment variables."
  );
var supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// app/routes/dashboard.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var loader = async ({ request }) => {
  try {
    let token = (await getSession(request.headers.get("Cookie"))).get("access_token");
    if (!token)
      throw console.log("No access token found. Redirecting to login."), redirect("/login");
    supabaseClient.auth.setSession(token);
    let { data: userData, error: userError } = await supabaseClient.auth.getUser();
    if (userError)
      throw console.error("Error getting user:", userError), redirect("/login");
    let { data: peoples, error: dbError } = await supabaseClient.from("peoples").select("id, name, age");
    return dbError ? (console.error("Error fetching peoples:", dbError), json({ error: dbError.message })) : json({ peoples, userData });
  } catch (error) {
    throw console.error("Loader error:", error), redirect("/login");
  }
};
function Dashboard() {
  let data = useLoaderData();
  return /* @__PURE__ */ jsxs3("main", { className: "p-6", children: [
    /* @__PURE__ */ jsx4(Form, { method: "post", action: "/logout", children: /* @__PURE__ */ jsx4(
      "button",
      {
        type: "submit",
        className: "px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75",
        children: "Logout"
      }
    ) }),
    /* @__PURE__ */ jsx4("h1", { className: "text-2xl font-bold mt-6", children: "Peoples:" }),
    /* @__PURE__ */ jsx4("pre", { className: "mt-4 bg-gray-100 p-4 rounded-lg shadow-inner", children: JSON.stringify(data, null, 3) })
  ] });
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  loader: () => loader2
});
import { redirect as redirect2 } from "@remix-run/node";
var loader2 = async ({ request }) => (await getSession(request.headers.get("Cookie"))).has("access_token") ? redirect2("/dashboard") : redirect2("/free-route");

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action
});
import { redirect as redirect3 } from "@remix-run/node";
var action = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));
  return redirect3("/free-route", {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
};

// app/routes/signup.tsx
var signup_exports = {};
__export(signup_exports, {
  action: () => action2,
  default: () => SignUp
});
import { Link } from "@remix-run/react";

// app/assets/images/Logo.png
var Logo_default = "/build/_assets/Logo-3A7JNXXD.png";

// app/routes/signup.tsx
import { json as json2, redirect as redirect4 } from "@remix-run/node";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var action2 = async ({ request }) => {
  let formData = await request.formData(), { email, password } = Object.fromEntries(formData);
  await supabaseClient.auth.signOut();
  let { data: user, error: signUpError } = await supabaseClient.auth.signUp({
    email: email.trim(),
    password: password.trim()
  });
  if (console.log("Supabase sign up response:", { user, signUpError }), signUpError)
    return console.error("Sign up error:", signUpError), json2({ error: signUpError.message }, { status: 400 });
  let session = await getSession(request.headers.get("Cookie")), accessToken = user?.session?.access_token || "";
  return session.set("access_token", accessToken), redirect4("/", {
    headers: { "Set-Cookie": await commitSession(session) }
  });
};
function SignUp() {
  return /* @__PURE__ */ jsxs4("section", { className: "flex flex-col md:flex-row gap-16 p-8 bg-gray-100 rounded-lg shadow-lg", children: [
    /* @__PURE__ */ jsxs4("aside", { className: "md:w-1/3 flex flex-col items-center justify-center mb-8 md:mb-0", children: [
      /* @__PURE__ */ jsx5("h1", { className: "text-2xl font-bold mb-4 text-center md:text-left", children: "Create your account" }),
      /* @__PURE__ */ jsx5("img", { src: Logo_default, alt: "Logo", width: 300, className: "mb-4" })
    ] }),
    /* @__PURE__ */ jsxs4("section", { className: "md:w-2/3", children: [
      /* @__PURE__ */ jsxs4("form", { method: "POST", className: "bg-white p-6 rounded-lg shadow-md", children: [
        /* @__PURE__ */ jsxs4("section", { className: "mb-4", children: [
          /* @__PURE__ */ jsx5("div", { className: "mb-2", children: /* @__PURE__ */ jsx5(
            "label",
            {
              htmlFor: "email",
              className: "block text-gray-700 font-medium",
              children: "Email"
            }
          ) }),
          /* @__PURE__ */ jsx5("div", { children: /* @__PURE__ */ jsx5(
            "input",
            {
              name: "email",
              id: "email",
              type: "email",
              className: "w-full p-2 border border-gray-300 rounded-md",
              required: !0
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs4("section", { className: "mb-4", children: [
          /* @__PURE__ */ jsx5("div", { className: "mb-2", children: /* @__PURE__ */ jsx5(
            "label",
            {
              htmlFor: "password",
              className: "block text-gray-700 font-medium",
              children: "Password"
            }
          ) }),
          /* @__PURE__ */ jsx5("div", { children: /* @__PURE__ */ jsx5(
            "input",
            {
              name: "password",
              id: "password",
              type: "password",
              className: "w-full p-2 border border-gray-300 rounded-md",
              required: !0
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx5(
          "button",
          {
            type: "submit",
            className: "w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600",
            children: "Sign Up"
          }
        )
      ] }),
      /* @__PURE__ */ jsx5("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxs4("p", { className: "text-gray-700", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsx5(Link, { to: "/login", className: "text-blue-500 hover:underline", children: "Sign In" })
      ] }) }),
      /* @__PURE__ */ jsx5("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxs4("p", { className: "text-gray-700", children: [
        "Don't want to register? Access the",
        /* @__PURE__ */ jsx5(Link, { to: "/free-route", className: "text-blue-500 hover:underline", children: "\xA0Free Route" })
      ] }) })
    ] })
  ] });
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action3,
  default: () => Login
});
import { Link as Link2 } from "@remix-run/react";
import { json as json3, redirect as redirect5 } from "@remix-run/node";
import { Fragment, jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var action3 = async ({ request }) => {
  let formData = await request.formData(), { email, password } = Object.fromEntries(formData), { data: user, error } = await supabaseClient.auth.signInWithPassword({
    email: email.toString(),
    password: password.toString()
  });
  if (error)
    return console.error("Sign in error:", error.message), json3({ error: error.message });
  if (user) {
    let session = await getSession(request.headers.get("Cookie"));
    return session.set("access_token", user.session.access_token), redirect5("/", {
      headers: { "Set-Cookie": await commitSession(session) }
    });
  }
  return json3({});
};
function Login() {
  return /* @__PURE__ */ jsx6(Fragment, { children: /* @__PURE__ */ jsxs5("section", { className: "flex flex-col md:flex-row gap-16 p-8 bg-gray-100 rounded-lg shadow-lg", children: [
    /* @__PURE__ */ jsxs5("aside", { className: "md:w-1/3 flex flex-col items-center justify-center mb-8 md:mb-0", children: [
      /* @__PURE__ */ jsx6("h1", { className: "text-2xl font-bold mb-4 text-center md:text-left", children: "Sign in to your account" }),
      /* @__PURE__ */ jsx6("img", { src: Logo_default, alt: "Logo", width: 300, className: "mb-4" })
    ] }),
    /* @__PURE__ */ jsxs5("section", { className: "md:w-2/3", children: [
      /* @__PURE__ */ jsxs5(
        "form",
        {
          action: "#",
          method: "POST",
          className: "bg-white p-6 rounded-lg shadow-md",
          children: [
            /* @__PURE__ */ jsxs5("section", { className: "mb-4", children: [
              /* @__PURE__ */ jsx6("div", { className: "mb-2", children: /* @__PURE__ */ jsx6(
                "label",
                {
                  htmlFor: "email",
                  className: "block text-gray-700 font-medium",
                  children: "Email"
                }
              ) }),
              /* @__PURE__ */ jsx6("div", { children: /* @__PURE__ */ jsx6(
                "input",
                {
                  name: "email",
                  id: "email",
                  type: "email",
                  className: "w-full p-2 border border-gray-300 rounded-md"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs5("section", { className: "mb-4", children: [
              /* @__PURE__ */ jsx6("div", { className: "mb-2", children: /* @__PURE__ */ jsx6(
                "label",
                {
                  htmlFor: "password",
                  className: "block text-gray-700 font-medium",
                  children: "Password"
                }
              ) }),
              /* @__PURE__ */ jsx6("div", { children: /* @__PURE__ */ jsx6(
                "input",
                {
                  name: "password",
                  id: "password",
                  type: "password",
                  className: "w-full p-2 border border-gray-300 rounded-md"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx6(
              "button",
              {
                type: "submit",
                className: "w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600",
                children: "Sign In"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx6("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxs5("p", { className: "text-gray-700", children: [
        "Don't have an account?",
        /* @__PURE__ */ jsx6(Link2, { to: "/signup", className: "text-blue-500 hover:underline", children: "\xA0Sign Up" })
      ] }) }),
      /* @__PURE__ */ jsx6("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxs5("p", { className: "text-gray-700", children: [
        "Don't want to register? Access the",
        /* @__PURE__ */ jsx6(Link2, { to: "/free-route", className: "text-blue-500 hover:underline", children: "\xA0Free Route" })
      ] }) })
    ] })
  ] }) });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-IWZRAIKI.js", imports: ["/build/_shared/chunk-NW6ZGYHF.js", "/build/_shared/chunk-4HXKWYDW.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-GK5BSZ7Y.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-YIBMNM74.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard": { id: "routes/dashboard", parentId: "root", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard-D3HG4GJ4.js", imports: ["/build/_shared/chunk-47DH3HYU.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/free-route": { id: "routes/free-route", parentId: "root", path: "free-route", index: void 0, caseSensitive: void 0, module: "/build/routes/free-route-ENE26CTZ.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-7AG2XVSR.js", imports: ["/build/_shared/chunk-4QFBNOIQ.js", "/build/_shared/chunk-47DH3HYU.js"], hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-GPTXG6BX.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/signup": { id: "routes/signup", parentId: "root", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/signup-V7EWECTV.js", imports: ["/build/_shared/chunk-4QFBNOIQ.js", "/build/_shared/chunk-47DH3HYU.js"], hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "345e8d1c", hmr: void 0, url: "/build/manifest-345E8D1C.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, unstable_singleFetch: !1, unstable_lazyRouteDiscovery: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/free-route": {
    id: "routes/free-route",
    parentId: "root",
    path: "free-route",
    index: void 0,
    caseSensitive: void 0,
    module: free_route_exports
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: signup_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
