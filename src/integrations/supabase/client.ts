// Supabase integration removed — this is a harmless stub to avoid runtime errors.
// If any part of the app still imports `supabase`, it will receive this stub that
// throws a clear error when used.

type AnyFn = (...args: any[]) => any;

const throwRemoved = (name = "supabase") => () => {
  throw new Error(`${name} integration has been removed. The app is now frontend-only.`);
};

export const supabase = {
  from: throwRemoved("supabase.from"),
  auth: {
    signIn: throwRemoved("supabase.auth.signIn") as AnyFn,
    signOut: throwRemoved("supabase.auth.signOut") as AnyFn,
    onAuthStateChange: throwRemoved("supabase.auth.onAuthStateChange") as AnyFn,
  },
  rpc: throwRemoved("supabase.rpc") as AnyFn,
  storage: {
    from: throwRemoved("supabase.storage.from") as AnyFn,
  },
};
