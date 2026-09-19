import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Download, LogOut, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import type { Database } from "@/integrations/supabase/types";

type Participant = Database["public"]["Tables"]["participants"]["Row"];
type Status = Database["public"]["Enums"]["participant_status"];

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Workshop Admin | MEC Game Dev" },
    { name: "description", content: "Protected workshop participant administration for Madras Engineering College." },
    { property: "og:title", content: "Workshop Admin | MEC Game Dev" },
    { property: "og:description", content: "Protected workshop participant administration." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex,nofollow" },
  ] }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Participant[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");

  useEffect(() => {
    const load = async () => {
      const { data: { session: current } } = await supabase.auth.getSession();
      if (!current) { setLoading(false); return; }
      setSession(true);
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", current.user.id);
      const isAdmin = roles?.some((row) => row.role === "admin") ?? false;
      setAdmin(isAdmin);
      if (isAdmin) { const { data } = await supabase.from("participants").select("*").order("created_at", { ascending: false }); setRows(data ?? []); }
      setLoading(false);
    };
    void load();
  }, []);

  const login = async (e: FormEvent) => { e.preventDefault(); setError(""); const { error: signInError } = await supabase.auth.signInWithPassword({ email, password }); if (signInError) setError(signInError.message); else window.location.reload(); };
  const google = async () => { const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin }); if (result.error) setError(result.error.message); else if (!result.redirected) window.location.reload(); };
  const updateStatus = async (id: string, status: Status) => { const { error: updateError } = await supabase.from("participants").update({ status }).eq("id", id); if (!updateError) setRows((current) => current.map((row) => row.id === id ? { ...row, status } : row)); };
  const filtered = useMemo(() => rows.filter((r) => (filter === "all" || r.status === filter) && [r.registration_id,r.full_name,r.email,r.college].join(" ").toLowerCase().includes(query.toLowerCase())), [rows, filter, query]);
  const counts = (status: Status) => rows.filter((row) => row.status === status).length;
  const exportCsv = () => { const fields = ["registration_id","full_name","email","phone","college","department","year","status","created_at"] as const; const csv = [fields.join(","),...filtered.map((r)=>fields.map((f)=>`"${String(r[f]).replaceAll('"','""')}"`).join(","))].join("\n"); const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="mec-workshop-participants.csv";a.click();URL.revokeObjectURL(a.href); };

  if (loading) return <main className="admin-shell"><p className="eyebrow">Authenticating secure session…</p></main>;
  if (!session) return <main className="admin-shell"><form className="admin-login" onSubmit={login}><ShieldCheck /><p className="eyebrow">Restricted access</p><h1>WORKSHOP<br />CONTROL ROOM</h1><label>Email<input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} /></label><label>Password<input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} /></label>{error&&<p className="auth-error">{error}</p>}<Button type="submit" variant="cinematic" size="cinematic">Sign in</Button><Button type="button" variant="cinematicOutline" size="cinematic" onClick={google}>Continue with Google</Button><a href="/">Return to experience</a></form></main>;
  if (!admin) return <main className="admin-shell"><div className="admin-login"><ShieldCheck/><h1>ACCESS<br/>RESTRICTED</h1><p>This account does not have workshop administrator access.</p><Button onClick={()=>supabase.auth.signOut().then(()=>window.location.reload())}>Sign out</Button></div></main>;
  return <main className="admin-shell dashboard"><header><div><p className="eyebrow">MEC Game Dev · Admin</p><h1>PARTICIPANTS</h1></div><Button variant="ghost" onClick={()=>supabase.auth.signOut().then(()=>window.location.reload())}><LogOut/> Sign out</Button></header><section className="metric-grid"><div><span>Total participants</span><b>{rows.length}</b></div>{(["registered","confirmed","checked_in","cancelled"] as Status[]).map(s=><div key={s}><span>{s.replace("_"," ")}</span><b>{counts(s)}</b></div>)}</section><section className="table-tools"><label><Search/><input aria-label="Search participants" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search ID, name, email, college" /></label><select aria-label="Filter by status" value={filter} onChange={e=>setFilter(e.target.value as Status|"all")}><option value="all">All statuses</option>{(["registered","confirmed","checked_in","cancelled"] as Status[]).map(s=><option key={s}>{s}</option>)}</select><Button variant="cinematicOutline" onClick={exportCsv}><Download/> Export CSV</Button></section><div className="table-wrap"><table><thead><tr><th>Registration ID</th><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Department</th><th>Year</th><th>Status</th><th>Date</th></tr></thead><tbody>{filtered.map(row=><tr key={row.id}><td>{row.registration_id}</td><td>{row.full_name}</td><td>{row.email}</td><td>{row.phone}</td><td>{row.college}</td><td>{row.department}</td><td>{row.year}</td><td><select value={row.status} onChange={e=>void updateStatus(row.id,e.target.value as Status)}>{(["registered","confirmed","checked_in","cancelled"] as Status[]).map(s=><option key={s}>{s}</option>)}</select></td><td>{new Date(row.created_at).toLocaleDateString("en-IN")}</td></tr>)}</tbody></table>{filtered.length===0&&<p className="empty-state">No participant records to display.</p>}</div></main>;
}