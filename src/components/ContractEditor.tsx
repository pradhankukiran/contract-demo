import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { RiskHighlight } from './extensions/RiskHighlight';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Undo,
  Redo,
  Quote,
  Minus,
  Highlighter,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface ContractEditorProps {
  content: string;
  onChange?: (content: string) => void;
  editable?: boolean;
  placeholder?: string;
  className?: string;
}

export const ContractEditor = ({
  content,
  onChange,
  editable = true,
  placeholder = 'Start drafting your contract...',
  className,
}: ContractEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      RiskHighlight,
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[400px] px-8 py-6',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const MenuButton = ({
    onClick,
    active,
    disabled,
    children,
    title,
  }: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'h-8 w-8 p-0',
        active && 'bg-muted text-foreground',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {children}
    </Button>
  );

  return (
    <div className={cn('flex flex-col rounded-xl bg-card shadow-lg border border-border', className)}>
      {editable && (
        <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/50 px-4 py-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="h-4 w-4" />
          </MenuButton>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </MenuButton>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </MenuButton>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <MenuButton
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
            active={editor.isActive('highlight')}
            title="Highlight"
          >
            <Highlighter className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            disabled={!editor.can().chain().focus().setHorizontalRule().run()}
            title="Horizontal Line"
          >
            <Minus className="h-4 w-4" />
          </MenuButton>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <MenuButton
            onClick={() => editor.chain().focus().setRiskHighlight('critical').run()}
            active={editor.isActive('riskHighlight', { level: 'critical' })}
            title="Mark as Critical Risk"
          >
            <AlertCircle className="h-4 w-4 text-destructive" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().setRiskHighlight('high').run()}
            active={editor.isActive('riskHighlight', { level: 'high' })}
            title="Mark as High Risk"
          >
            <AlertTriangle className="h-4 w-4 text-high" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().setRiskHighlight('medium').run()}
            active={editor.isActive('riskHighlight', { level: 'medium' })}
            title="Mark as Medium Risk"
          >
            <Info className="h-4 w-4 text-medium" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().setRiskHighlight('low').run()}
            active={editor.isActive('riskHighlight', { level: 'low' })}
            title="Mark as Low Risk"
          >
            <CheckCircle2 className="h-4 w-4 text-low" />
          </MenuButton>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="h-4 w-4" />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="h-4 w-4" />
          </MenuButton>
        </div>
      )}

      <EditorContent editor={editor} className="contract-editor" />
    </div>
  );
};
