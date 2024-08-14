import { createClient } from "@supabase/supabase-js";
import { getSession } from "./db.server";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "SUPABASE_URL is not defined. Please set it in your environment variables."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "SUPABASE_ANON_KEY is not defined. Please set it in your environment variables."
  );
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const hasAuthSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("access_token")) throw Error("No session");
  supabaseClient.auth.setSession(session.get("access_token"));
};
