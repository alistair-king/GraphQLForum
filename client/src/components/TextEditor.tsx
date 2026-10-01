import React, { useState } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'

import { useAuthState } from '../state'

const ToolButton: React.FC<{
  onClick: () => void,
  active?: boolean,
  title: string,
  children: React.ReactNode
}> = ({
  onClick,
  active = false,
  title,
  children
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${active ? 'bg-gray-200 font-bold' : 'text-gray-700'}`}
  >
    {children}
  </button>
)

/**
 * Rich text editor built on TipTap. Produces plain HTML which is stored
 * and rendered by <Content />. Administrators get a raw HTML source view.
 */
export function TextEditor<TFieldValues extends FieldValues>({
  control,
  name,
  rules = {},
}: {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>
}) {
  const { isAdmin } = useAuthState()
  const [showHtml, setShowHtml] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <EditorWithToolbar
          onChange={onChange}
          value={(value as string) ?? ''}
          isAdmin={isAdmin}
          showHtml={showHtml}
          setShowHtml={setShowHtml}
        />
      )}
    />
  )
}

const EditorWithToolbar: React.FC<{
  onChange: (value: string) => void,
  value: string,
  isAdmin: boolean,
  showHtml: boolean,
  setShowHtml: (show: boolean) => void
}> = ({
  onChange,
  value,
  isAdmin,
  showHtml,
  setShowHtml
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
    ],
    content: value || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'forum-editor-input',
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border border-gray-200 rounded bg-white">
      <div className="flex flex-wrap gap-1 border-b border-gray-200 px-2 py-1 bg-gray-50 rounded-t">
        <ToolButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></ToolButton>
        <ToolButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></ToolButton>
        <ToolButton title="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></ToolButton>
        <ToolButton title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></ToolButton>
        <span className="mx-1 border-l border-gray-200" />
        <ToolButton title="Heading 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</ToolButton>
        <ToolButton title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolButton>
        <ToolButton title="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&ldquo;&rdquo;</ToolButton>
        <span className="mx-1 border-l border-gray-200" />
        <ToolButton title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>&bull; &bull;</ToolButton>
        <ToolButton title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1.</ToolButton>
        <span className="mx-1 border-l border-gray-200" />
        <ToolButton title="Align left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>&#8676;</ToolButton>
        <ToolButton title="Align center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>&#8544;</ToolButton>
        <ToolButton title="Align right" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>&#8677;</ToolButton>
        <span className="mx-1 border-l border-gray-200" />
        <ToolButton
          title="Insert image"
          onClick={() => {
            const url = window.prompt('Image URL')
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          }}
        >
          &#128247;
        </ToolButton>
        {isAdmin && (
          <ToolButton title="HTML source" active={showHtml} onClick={() => setShowHtml(!showHtml)}>
            {'</>'}
          </ToolButton>
        )}
      </div>

      {showHtml ? (
        <textarea
          className="w-full h-48 p-3 font-mono text-sm rounded-b focus:outline-none"
          value={editor.getHTML()}
          onChange={(event) => {
            editor.commands.setContent(event.target.value)
            onChange(event.target.value)
          }}
        />
      ) : (
        <EditorContent editor={editor} className="rounded-b" />
      )}
    </div>
  )
}
