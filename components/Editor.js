import { useEffect, useState } from "react";
import { useSettings } from "@/utils/context/SettingsContext";
import { useSharedHistoryContext } from "@/utils/context/SharedHistoryContext"
import useLexicalEditable from "@lexical/react/useLexicalEditable"


/* Lexical Design System */
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HashtagNode } from "@lexical/hashtag";

import { TRANSFORMERS } from "@lexical/markdown";
import { ImageNode } from "@/utils/nodes/ImageNode";
import { YouTubeNode } from "@/utils/nodes/YouTubeNode";
import { KeywordNode } from "@/utils/nodes/KeywordNode";

/* Lexical Plugins Local */
import ToolbarPlugin from "@/utils/plugins/ToolbarPlugin";
import DragDropPaste from "@/utils/plugins/DragDropPastePlugin";
import AutoLinkPlugin from "@/utils/plugins/AutoLinkPlugin";
import ImagesPlugin from '@/utils/plugins/ImagesPlugin';
import YouTubePlugin from '@/utils/plugins/YouTubePlugin';
import AutoEmbedPlugin from '@/utils/plugins/AutoEmbedPlugin';
import CodeHighlightPlugin from "@/utils/plugins/CodeHighlightPlugin";
import OnChangePlugin from "@/utils/plugins/onChangePlugin";
import InitialStatePlugin from "@/utils/plugins/InitialStatePlugin";
import MentionsPlugin from "@/utils/plugins/MentionsPlugin";
import EmojisPlugin from "@/utils/plugins/EmojisPlugin";
import KeywordsPlugin from "@/utils/plugins/KeywordsPlugin";
import DraggableBlockPlugin from "@/utils/plugins/DraggableBlockPlugin";

/* Lexical Plugins Remote */
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import {HorizontalRulePlugin} from '@lexical/react/LexicalHorizontalRulePlugin';
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin"

/* Lexical Others */
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ExampleTheme from "@/utils/theme/EditorTheme";
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from "@lexical/html";

import { $createParagraphNode, $createTextNode, $insertNodes, $getRoot } from "lexical";
import {$generateNodesFromDOM} from '@lexical/html';
import { textDailyStandup } from "@/utils/text-daily-standup";

import parse from 'html-react-parser';

function Placeholder() {
    return <div className="editor-placeholder">Enter some rich text...</div>;
}

const Editor = ({onChange, value}) => {
    const { historyState } = useSharedHistoryContext()

    const [isLinkEditMode, setIsLinkEditMode] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    const [floatingAnchorElem, setFloatingAnchorElem] = useState(null)

    const onRef = (_floatingAnchorElem) => {
        if (floatingAnchorElem !== null) {
        setFloatingAnchorElem(floatingAnchorElem)
        }
    }

    const editorConfig = {
        namespace: 'RichTextEditor',
        theme: ExampleTheme,
        onError(error) {
            throw error;
        },
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            KeywordNode,
            HashtagNode,
            ImageNode,
            YouTubeNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode
        ],
    };

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null
    return (
        <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
            <ToolbarPlugin />
            <div className="editor-inner" >
                <RichTextPlugin
                    contentEditable={<ContentEditable ref={onRef} className="editor-scroller" />}
                    placeholder={<Placeholder />}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <DragDropPaste />
                <AutoEmbedPlugin />
                <ListPlugin />
                <HistoryPlugin />
                <CodeHighlightPlugin />
                <YouTubePlugin />
                <LinkPlugin />
                <TabIndentationPlugin />
                <ImagesPlugin />
                <AutoLinkPlugin />
                <MentionsPlugin />
                <EmojisPlugin />
                <HashtagPlugin />
                <KeywordsPlugin />
                <DraggableBlockPlugin />
                <HorizontalRulePlugin />
                <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                {floatingAnchorElem && (
                  <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
                )}
                <OnChangePlugin onChange={onChange} />
                <InitialStatePlugin htmlString={value} />
                {floatingAnchorElem && (
                    <>
                        <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                        <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
                        <FloatingLinkEditorPlugin
                        anchorElem={floatingAnchorElem}
                        isLinkEditMode={isLinkEditMode}
                        setIsLinkEditMode={setIsLinkEditMode}
                        />
                        <FloatingTextFormatToolbarPlugin
                        anchorElem={floatingAnchorElem}
                        />
                    </>
                    )}
            </div>
        </div>
    </LexicalComposer>
      )  
}

export default Editor;