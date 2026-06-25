"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, FilePlus, Loader2, Save, Trash2 } from "lucide-react";
import type { BlogPost, BlogPostInput } from "@/lib/blog";

type CmsResponse = {
  posts?: BlogPost[];
  post?: BlogPost;
  error?: string;
};

const emptyPost: BlogPostInput = {
  slug: "",
  title: "",
  excerpt: "",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5 min read",
  tag: "Insights",
  author: "Palentrix",
  body: "",
  published: true,
};

export function BlogAdmin() {
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [draft, setDraft] = useState<BlogPostInput>(emptyPost);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [posts],
  );

  useEffect(() => {
    const savedToken = window.localStorage.getItem("palentrix-cms-token") || "";
    setToken(savedToken);
    if (savedToken) {
      void loadPosts(savedToken);
    }
  }, []);

  async function cmsFetch(path: string, init: RequestInit = {}, tokenOverride = token) {
    const response = await fetch(path, {
      ...init,
      headers: {
        "content-type": "application/json",
        "x-cms-token": tokenOverride,
        ...(init.headers || {}),
      },
    });
    const data = (await response.json()) as CmsResponse;
    if (!response.ok) throw new Error(data.error || "CMS request failed.");
    return data;
  }

  async function loadPosts(tokenOverride = token) {
    setLoading(true);
    setMessage("");
    try {
      const data = await cmsFetch("/api/cms/blog", {}, tokenOverride);
      setPosts(data.posts || []);
      window.localStorage.setItem("palentrix-cms-token", tokenOverride);
      setMessage("CMS connected.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "CMS connection failed.");
    } finally {
      setLoading(false);
    }
  }

  function selectPost(post: BlogPost) {
    setSelectedSlug(post.slug);
    setDraft({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      tag: post.tag,
      author: post.author,
      body: post.body,
      published: post.published,
    });
    setMessage("");
  }

  function newPost() {
    setSelectedSlug("");
    setDraft({ ...emptyPost, date: new Date().toISOString().slice(0, 10) });
    setMessage("");
  }

  async function savePost() {
    setLoading(true);
    setMessage("");
    try {
      const path = selectedSlug ? `/api/cms/blog/${selectedSlug}` : "/api/cms/blog";
      const method = selectedSlug ? "PUT" : "POST";
      const data = await cmsFetch(path, {
        method,
        body: JSON.stringify(draft),
      });
      if (data.post) {
        setSelectedSlug(data.post.slug);
        await loadPosts();
        setMessage("Post saved.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setLoading(false);
    }
  }

  async function deletePost() {
    if (!selectedSlug) return;
    setLoading(true);
    setMessage("");
    try {
      await cmsFetch(`/api/cms/blog/${selectedSlug}`, { method: "DELETE" });
      newPost();
      await loadPosts();
      setMessage("Post deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-md border border-[var(--border-color)] bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-indigo/60";
  const labelClass = "block font-mono text-[11px] uppercase tracking-wider text-muted mb-2";

  return (
    <main className="min-h-screen bg-void px-6 pb-16 pt-28 text-ink">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 border-b border-[var(--border-color)] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-indigo">
              Palentrix CMS
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Blog editor</h1>
          </div>
          <div className="flex w-full flex-col gap-3 md:w-[420px]">
            <label>
              <span className={labelClass}>Admin token</span>
              <input
                value={token}
                onChange={(event) => setToken(event.target.value)}
                type="password"
                className={inputClass}
              />
            </label>
            <button
              onClick={() => loadPosts()}
              disabled={loading || !token}
              className="inline-flex items-center justify-center gap-2 rounded-md btn-teal px-4 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              Connect
            </button>
          </div>
        </div>

        {message && (
          <div className="mt-6 rounded-md border border-[var(--border-color)] bg-slate px-4 py-3 text-sm text-muted">
            {message}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="rb-panel rounded-2xl p-4">
            <button
              onClick={newPost}
              className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-indigo/50 px-4 py-2.5 text-sm font-semibold text-indigo transition-colors hover:bg-indigo hover:text-white"
            >
              <FilePlus size={16} />
              New post
            </button>
            <div className="space-y-2">
              {sortedPosts.map((post) => (
                <button
                  key={post.slug}
                  onClick={() => selectPost(post)}
                  className={`w-full rounded-md border p-4 text-left transition-colors ${
                    selectedSlug === post.slug
                      ? "border-teal/70 bg-teal/10"
                      : "border-[var(--border-color)] bg-void/50 hover:border-indigo/50"
                  }`}
                >
                  <div className="text-sm font-semibold">{post.title}</div>
                  <div className="mt-2 flex items-center gap-2 font-mono text-[11px] text-muted">
                    <span>{post.dateLabel}</span>
                    <span>{post.published ? "Published" : "Draft"}</span>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <section className="rb-panel rounded-2xl p-5 md:p-7">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Title" value={draft.title} onChange={(value) => setDraft({ ...draft, title: value })} />
              <Field label="Slug" value={draft.slug} onChange={(value) => setDraft({ ...draft, slug: value })} />
              <Field label="Date" type="date" value={draft.date} onChange={(value) => setDraft({ ...draft, date: value })} />
              <Field label="Read time" value={draft.readTime} onChange={(value) => setDraft({ ...draft, readTime: value })} />
              <Field label="Tag" value={draft.tag} onChange={(value) => setDraft({ ...draft, tag: value })} />
              <Field label="Author" value={draft.author} onChange={(value) => setDraft({ ...draft, author: value })} />
            </div>

            <label className="mt-5 block">
              <span className={labelClass}>Excerpt</span>
              <textarea
                value={draft.excerpt}
                onChange={(event) => setDraft({ ...draft, excerpt: event.target.value })}
                rows={3}
                className={inputClass}
              />
            </label>

            <label className="mt-5 flex items-center gap-3 text-sm text-muted">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(event) => setDraft({ ...draft, published: event.target.checked })}
                className="h-4 w-4 accent-teal"
              />
              Published
            </label>

            <label className="mt-5 block">
              <span className={labelClass}>Markdown body</span>
              <textarea
                value={draft.body}
                onChange={(event) => setDraft({ ...draft, body: event.target.value })}
                rows={18}
                className={`${inputClass} font-mono leading-relaxed`}
              />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                onClick={savePost}
                disabled={loading || !token || !draft.title || !draft.body}
                className="inline-flex items-center justify-center gap-2 rounded-md btn-teal px-5 py-3 text-sm font-semibold disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save post
              </button>
              <button
                onClick={deletePost}
                disabled={loading || !selectedSlug}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-red-400/40 px-5 py-3 text-sm font-semibold text-red-200 transition-colors hover:bg-red-500/10 disabled:opacity-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-2">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        className="w-full rounded-md border border-[var(--border-color)] bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-indigo/60"
      />
    </label>
  );
}
