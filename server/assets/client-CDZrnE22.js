import { createClient } from "@supabase/supabase-js";
//#region src/integrations/supabase/client.ts
function createSupabaseClient() {
	return createClient("https://akvpzcymkroorafxuibg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrdnB6Y3lta3Jvb3JhZnh1aWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMjU4MjEsImV4cCI6MjA5NjcwMTgyMX0.fIIzylAG0H1L1dcNvncLn1NuNHAcIxKmLY5vmUNcnpw", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
