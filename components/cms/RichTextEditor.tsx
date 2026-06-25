"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Code2,
  Link2,
  ImageIcon,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
  Upload,
  X,
  Link2Off,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  token: string;
}

export function RichTextEditor({ value, onChange, token }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const lastSyncedValueRef = useRef(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: { class: "blog-img" },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Underline,
      Placeholder.configure({ placeholder: "Start writing your blog post..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      lastSyncedValueRef.current = html;
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && value !== lastSyncedValueRef.current) {
      lastSyncedValueRef.current = value;
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  const insertLink = useCallback(() => {
    if (!editor || !linkUrl.trim()) return;
    editor.chain().focus().setLink({ href: linkUrl.trim() }).run();
    setLinkUrl("");
    setShowLinkInput(false);
  }, [editor, linkUrl]);

  const insertImageUrl = useCallback(() => {
    if (!editor || !imageUrl.trim()) return;
    editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
    setImageUrl("");
    setShowImageInput(false);
  }, [editor, imageUrl]);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !editor) return;

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/cms/upload", {
          method: "POST",
          headers: { "x-cms-token": token },
          body: formData,
        });
        const data = (await response.json()) as { url?: string; error?: string };
        if (data.url) {
          editor.chain().focus().setImage({ src: data.url }).run();
        }
      } catch {
        /* silent */
      } finally {
        setUploading(false);
        if (event.target) event.target.value = "";
      }
    },
    [editor, token],
  );

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-[var(--border-color)] bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-[var(--border-color)] bg-slate/60 px-2 py-1.5">
        <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo2 size={14} />
        </Btn>
        <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo2 size={14} />
        </Btn>
        <Sep />

        <Btn title="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 size={14} />
        </Btn>
        <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 size={14} />
        </Btn>
        <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 size={14} />
        </Btn>
        <Sep />

        <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={14} />
        </Btn>
        <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={14} />
        </Btn>
        <Btn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={14} />
        </Btn>
        <Btn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough size={14} />
        </Btn>
        <Sep />

        <Btn title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft size={14} />
        </Btn>
        <Btn title="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter size={14} />
        </Btn>
        <Btn title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight size={14} />
        </Btn>
        <Sep />

        <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={14} />
        </Btn>
        <Btn title="Ordered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={14} />
        </Btn>
        <Sep />

        <Btn title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={14} />
        </Btn>
        <Btn title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
          <Code size={14} />
        </Btn>
        <Btn title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <Code2 size={14} />
        </Btn>
        <Btn title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus size={14} />
        </Btn>
        <Sep />

        <Btn
          title={editor.isActive("link") ? "Remove link" : "Insert link"}
          active={editor.isActive("link")}
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
            } else {
              setShowLinkInput((v) => !v);
              setShowImageInput(false);
            }
          }}
        >
          {editor.isActive("link") ? <Link2Off size={14} /> : <Link2 size={14} />}
        </Btn>
        <Btn
          title="Insert image by URL"
          onClick={() => {
            setShowImageInput((v) => !v);
            setShowLinkInput(false);
          }}
        >
          <ImageIcon size={14} />
        </Btn>
        <Btn title="Upload image" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
          <Upload size={14} />
        </Btn>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
      </div>

      {/* Link URL bar */}
      {showLinkInput && (
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] bg-slate/40 px-3 py-2">
          <input
            autoFocus
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && insertLink()}
            placeholder="https://example.com"
            className="flex-1 rounded border border-[var(--border-color)] bg-white px-2 py-1 text-sm text-ink outline-none focus:border-indigo/60"
          />
          <button
            type="button"
            onClick={insertLink}
            className="rounded bg-indigo px-3 py-1 text-xs font-semibold text-white transition-colors hover:opacity-90"
          >
            Insert
          </button>
          <button
            type="button"
            onClick={() => { setShowLinkInput(false); setLinkUrl(""); }}
            className="text-muted hover:text-ink"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Image URL bar */}
      {showImageInput && (
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] bg-slate/40 px-3 py-2">
          <input
            autoFocus
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && insertImageUrl()}
            placeholder="https://example.com/image.jpg"
            className="flex-1 rounded border border-[var(--border-color)] bg-white px-2 py-1 text-sm text-ink outline-none focus:border-indigo/60"
          />
          <button
            type="button"
            onClick={insertImageUrl}
            className="rounded bg-indigo px-3 py-1 text-xs font-semibold text-white transition-colors hover:opacity-90"
          >
            Insert
          </button>
          <button
            type="button"
            onClick={() => { setShowImageInput(false); setImageUrl(""); }}
            className="text-muted hover:text-ink"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Editor */}
      <EditorContent editor={editor} className="tiptap-editor" />
    </div>
  );
}

function Btn({
  children,
  active = false,
  disabled = false,
  onClick,
  title,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  title?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-7 w-7 items-center justify-center rounded transition-colors disabled:opacity-40 ${
        active ? "bg-indigo text-white" : "text-muted hover:bg-slate-light hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="mx-1 h-5 w-px bg-[var(--border-color)]" />;
}
