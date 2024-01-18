import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useModal from '@/utils/hooks/useModal';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  $getSelection,
  $INTERNAL_isPointSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getNodeByKey,
  $isElementNode,
  $isRootOrShadowRoot
} from "lexical";
import {INSERT_EMBED_COMMAND} from '@lexical/react/LexicalAutoEmbedPlugin';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {$isTableNode} from '@lexical/table';
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $wrapNodes,
  $isAtNodeEnd,
  $patchStyleText,
} from "@lexical/selection";
import { 
    $getNearestNodeOfType, 
    $findMatchingParent, 
    mergeRegister 
} from "@lexical/utils";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode
} from "@lexical/list";
import { createPortal } from "react-dom";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode
} from "@lexical/rich-text";
import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages
} from "@lexical/code";
import {INSERT_HORIZONTAL_RULE_COMMAND} from '@lexical/react/LexicalHorizontalRuleNode';

import {
    InsertImageDialog,
  } from "@/utils/plugins/ImagesPlugin";
import {EmbedConfigs} from '@/utils/plugins/AutoEmbedPlugin';
import DropdownColorPicker from '@/utils/ui/DropdownColorPicker';

const LowPriority = 1;

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol"
]);

const blockBoostrapNames = {
    code: "Code Block",
    h1: "bi bi-type-h1",
    h2: "bi bi-type-h2",
    h3: "bi bi-type-h3",
    h4: "bi bi-type-h4",
    h5: "bi bi-type-h5",
    ol: "bi bi-list-ol",
    paragraph: "bi bi-text-paragraph",
    quote: "bi bi-chat-right-quote",
    ul: "bi bi-list-ul"
}

const blockTypeToBlockName = {
  code: "Code Block",
  h1: "Large Heading",
  h2: "Small Heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  ul: "Bulleted List"
};

const FONT_SIZE_OPTIONS = [
    ['10px', '10px'],
    ['11px', '11px'],
    ['12px', '12px'],
    ['13px', '13px'],
    ['14px', '14px'],
    ['15px', '15px'],
    ['16px', '16px'],
    ['17px', '17px'],
    ['18px', '18px'],
    ['19px', '19px'],
    ['20px', '20px'],
];

const ELEMENT_FORMAT_OPTIONS = {
    center: {
        icon: 'bi bi-text-center',
        iconRTL: 'center-align',
        name: 'Center Align',
      },
      end: {
        icon: 'bi bi-justify-right',
        iconRTL: 'left-align',
        name: 'End Align',
      },
      justify: {
        icon: 'bi bi-justify',
        iconRTL: 'justify-align',
        name: 'Justify Align',
      },
      left: {
        icon: 'bi bi-text-left',
        iconRTL: 'left-align',
        name: 'Left Align',
      },
      right: {
        icon: 'bi bi-text-right',
        iconRTL: 'left-align',
        name: 'Right Align',
      },
      start: {
        icon: 'bi bi-justify-left',
        iconRTL: 'right-align',
        name: 'Start Align',
      },
}

function dropDownActiveClass(active) {
    if (active) return 'active dropdown-item-active';
    else return '';
  }

function Divider() {
  return <div className="divider" />;
}

function positionEditorElement(editor, rect) {
  if (rect === null) {
    editor.style.opacity = "0";
    editor.style.top = "-1000px";
    editor.style.left = "-1000px";
  } else {
    editor.style.opacity = "1";
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = `${
      rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
    }px`;
  }
}

function FloatingLinkEditor({ editor }) {
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState(null);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl("");
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0);
      let rect;
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }

    //   if (!mouseDownRef.current) {
    //     positionEditorElement(editorElem, rect);
    //   }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== "link-input") {
    //   positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl("");
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LowPriority
      )
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div ref={editorRef} className="link-editor">
      {isEditMode ? (
        <input
          ref={inputRef}
          className="link-input"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (lastSelection !== null) {
                if (linkUrl !== "") {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                }
                setEditMode(false);
              }
            } else if (event.key === "Escape") {
              event.preventDefault();
              setEditMode(false);
            }
          }}
        />
      ) : (
        <>
          <div className="link-input">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
            <div
              className="link-edit"
              role="button"
              tabIndex={0}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setEditMode(true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

function Select({ onChange, className, options, value }) {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden={true} value="" />
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function getSelectedNode(selection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

function BlockOptionsDropdownList({
  editor,
  blockType,
  toolbarRef,
  setShowBlockOptionsDropDown
}) {
  const dropDownRef = useRef(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const dropDown = dropDownRef.current;

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect();
      dropDown.style.top = `${top + 0}px`;
      dropDown.style.left = `${left}px`;
    }
  }, [dropDownRef, toolbarRef]);

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const toolbar = toolbarRef.current;

    if (dropDown !== null && toolbar !== null) {
      const handle = (event) => {
        const target = event.target;

        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false);
        }
      };
      document.addEventListener("click", handle, {passive: true});

      return () => {
        document.removeEventListener("click", handle);
      };
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

  const formatParagraph = () => {
    if (blockType !== "paragraph bi bi-text-paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatLargeHeading = () => {
    if (blockType !== "h1") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h1"));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatSmallHeading = () => {
    if (blockType !== "h2") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h2"));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  return (
    <>
        <Dropdown.Item onClick={formatParagraph}>
            <span className="icon paragraph bi bi-text-paragraph" />
            <span className="text">Normal</span>
            {blockType === "paragraph" && <span className="active" />}
        </Dropdown.Item>
        <Dropdown.Item onClick={formatLargeHeading}>
            <span className="icon large-heading bi bi-type-h1" />
            <span className="text">Large Heading</span>
            {blockType === "h1" && <span className="active" />}
        </Dropdown.Item>
        <Dropdown.Item onClick={formatSmallHeading}>
            <span className="icon small-heading bi bi-type-h2" />
            <span className="text">Small Heading</span>
            {blockType === "h2" && <span className="active" />}
        </Dropdown.Item>

        <Dropdown.Item onClick={formatBulletList}>
            <span className="icon bullet-list bi bi-list-ul" />
            <span className="text">Bullet List</span>
            {blockType === "ul" && <span className="active" />}
        </Dropdown.Item>
        <Dropdown.Item onClick={formatNumberedList}>
            <span className="icon numbered-list bi bi-list-ol" />
            <span className="text">Numbered List</span>
            {blockType === "ol" && <span className="active" />}
        </Dropdown.Item>
        <Dropdown.Item onClick={formatQuote}>
            <span className="icon quote bi bi-chat-right-quote" />
            <span className="text">Quote</span>
            {blockType === "quote" && <span className="active" />}
        </Dropdown.Item>
        <Dropdown.Item className="item" onClick={formatCode}>
            <span className="icon code bi bi-code" />
            <span className="text">Code Block</span>
            {blockType === "code" && <span className="active" />}
        </Dropdown.Item>
    </>
  );
}

function FontDropdown({
    editor,
    value,
    style
}) {
  const handleClick = useCallback(
    (option) => {
        editor.update(() => {
        const selection = $getSelection();
        if ($INTERNAL_isPointSelection(selection)) {
            $patchStyleText(selection, {
            [style]: option,
            });
        }
        });
    },
    [editor, style],
  );

  return (
    <Dropdown>
    <Dropdown.Toggle variant="link" id="dropdown-basic">
      {value}
    </Dropdown.Toggle>
        <Dropdown.Menu>
        {(style === 'font-size' ? FONT_SIZE_OPTIONS : null).map(
          ([option, text]) => (
            <Dropdown.Item
              className={`item ${dropDownActiveClass(value === option)} ${
                style === 'font-size' ? 'fontsize-item' : ''
              }`}
              onClick={() => handleClick(option)}
              key={option}
            >
                <span className="text">{text}</span>
            </Dropdown.Item>   
          ))}
        </Dropdown.Menu>
    </Dropdown>
  )
}

function ElementFormatDropdown({
    editor,
    value,
    isRTL,
    disabled = false,
  }) {
    const formatOption = ELEMENT_FORMAT_OPTIONS[value || 'left'];

    return (
    <Dropdown>
        <Dropdown.Toggle variant="link" id="dropdown-basic">
          <i className={`icon ${
        isRTL ? formatOption.iconRTL : formatOption.icon
      }`} />
          <span className="text">{formatOption.name}</span>   
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item 
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
            }}
            className="item"
          >
            <i className="icon bi bi-text-left" />
            <span className="text">Left Align</span>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
            }}
            className="item"
          >
            <i className="icon bi bi-text-center" />
            <span className="text">Center Align</span>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
            }}
            className="item"
          >
            <i className="icon bi bi-text-right" />
            <span className="text">Right Align</span>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
            }}
            className="item"
          >
            <i className="icon bi bi-justify" />
            <span className="text">Justify Align</span>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'start');
            }}
            className="item"
          >
            <i 
              className={`icon ${
                isRTL
                  ? ELEMENT_FORMAT_OPTIONS.start.iconRTL
                  : ELEMENT_FORMAT_OPTIONS.start.icon
              }`}
            
            />
            <span className="text">Start Align</span>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'end');
            }}
            className="item"
          >
            <i 
              className={`icon ${
                isRTL
                ? ELEMENT_FORMAT_OPTIONS.end.iconRTL
                : ELEMENT_FORMAT_OPTIONS.end.icon
              }`}
            />
            <span className="text">End Align</span>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
            }}
            className="item"
          >
            <i className={'icon ' + (isRTL ? 'bi bi-text-indent-left' : 'bi bi-text-indent-right')} />
            <span className="text">Outdent</span>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
            }}
            className="item"
          >
            <i className={'icon ' + (isRTL ? 'bi bi-text-indent-right' : 'bi bi-text-indent-left')} />
            <span className="text">Indent</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      );

  }

  export function FillURL() {
    const srcfile = prompt("Enter the URL of the image:", "");
  
    return srcfile;
  }
  

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [modal, showModal] = useModal();


  // Newly Added States
  const [rootType, setRootType] = useState('root');
  const [fontSize, setFontSize] = useState('15px');
  const [fontColor, setFontColor] = useState('#000');
  const [bgColor, setBgColor] = useState('#fff');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [elementFormat, setElementFormat] = useState('left');
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());

  const [showImageModal, setShowImageModal] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);

  const handleCloseImageModal = () => setShowImageModal(false);
  const handleShowImageModal = () => setShowImageModal(true);
  const handleShowYoutubeModal = () => setShowYoutubeModal(true);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
            const parent = e.getParent();
            return parent !== null && $isRootOrShadowRoot(parent);
          });

        if (element === null) {
          element = anchorNode.getTopLevelElementOrThrow();
        }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsSubscript(selection.hasFormat('subscript'));
      setIsSuperscript(selection.hasFormat('superscript'));
      setIsCode(selection.hasFormat('code'));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      // Table Node
      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        setRootType('table');
      } else {
        setRootType('root');
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }

      let matchingParent;

      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
        );
      }

      setElementFormat(
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
          ? node.getFormatType()
          : parent?.getFormatType() || 'left',
      );
    }

    
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [$updateToolbar, activeEditor, editor]);

  const applyStyleText = useCallback(
    (styles, skipHistoryStack) => {
      activeEditor.update(
        () => {
          const selection = $getSelection()
          if ($INTERNAL_isPointSelection(selection)) {
            $patchStyleText(selection, styles)
          }
        },
        skipHistoryStack ? { tag: "historic" } : {}
      )
    },
    [activeEditor]
  )

  const codeLanguges = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (e) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
          }
        }
      });
    },
    [editor, selectedElementKey]
  );

  const onFontColorSelect = useCallback(
    (value, skipHistoryStack) => {
      applyStyleText({ color: value }, skipHistoryStack)
    },
    [applyStyleText]
  )
  
  const onBgColorSelect = useCallback(
    (value, skipHistoryStack) => {
      applyStyleText({ "background-color": value }, skipHistoryStack)
    },
    [applyStyleText]
  )

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      <Button
        variant="link"
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="format undo bi bi-arrow-counterclockwise" />
      </Button>
      <Button
        variant="link"
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <i className="format redo bi bi-arrow-clockwise" />
      </Button>
      {supportedBlockTypes.has(blockType) && (
      <Dropdown>
        <Dropdown.Toggle variant="link" id="dropdown-basic">
            <span className={"icon block-type " + blockType + " " + blockBoostrapNames[blockType]} />
            <span className="text">{blockTypeToBlockName[blockType]}</span>        
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <BlockOptionsDropdownList
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarRef}
                setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />
        </Dropdown.Menu>
        </Dropdown>
      )}
      <Divider />
      <FontDropdown
        style={'font-size'}
        value={fontSize}
        editor={editor}
      />
      {blockType === "code" ? (
        <>
          <Select
            className="toolbar-item code-language"
            onChange={onCodeLanguageSelect}
            options={codeLanguges}
            value={codeLanguage}
          />
          <i className="chevron-down inside bi bi-chevron-down" />
        </>
      ) : (
        <>

          <Button
            variant="link"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            }}
            className={"toolbar-item spaced " + (isBold ? "active" : "")}
            aria-label="Format Bold"
          >
            <i className="format bold bi bi-type-bold" />
          </Button>
          <Button
            variant="link"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            }}
            className={"toolbar-item spaced " + (isItalic ? "active" : "")}
            aria-label="Format Italics"
          >
            <i className="format italic bi bi-type-italic" />
          </Button>
          <Button
            variant="link"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
            }}
            className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
            aria-label="Format Underline"
          >
            <i className="format underline bi bi-type-underline" />
          </Button>
          <Button
            variant="link"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
            }}
            className={
              "toolbar-item spaced " + (isStrikethrough ? "active" : "")
            }
            aria-label="Format Strikethrough"
          >
            <i className="format strikethrough bi bi-type-strikethrough" />
          </Button>
          <Button
            variant="link"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
            }}
            className={"toolbar-item spaced " + (isCode ? "active" : "")}
            aria-label="Insert Code"
          >
            <i className="format code bi bi-code-slash" />
          </Button>
          <Button
            variant="link"
            onClick={insertLink}
            className={"toolbar-item spaced " + (isLink ? "active" : "")}
            aria-label="Insert Link"
          >
            <i className="format link bi bi-link" />
          </Button>
          <Divider />
          <DropdownColorPicker
            color={fontColor}
            onChange={onFontColorSelect}
          />
          {isLink &&
            createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
          <Divider />

          <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic">
              <i className="icon bi bi-plus-lg" />
              <span className="text">Insert</span>            
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    activeEditor.dispatchCommand(
                    INSERT_HORIZONTAL_RULE_COMMAND,
                    undefined,
                    );
                  }}
                  className="item"
                >
                  <i className="icon bi bi-hr" />
                  <span className="text">Horizontal Rule</span>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleShowImageModal}
                >
                  <i className="icon bi bi-card-image" />
                  <span className="text">Insert Image</span>
                </Dropdown.Item>
                {/* <Dropdown.Item
                  onClick={handleShowYoutubeModal}
                >
                    Insert Image
                </Dropdown.Item> */}
                {EmbedConfigs.map((embedConfig) => (
                <Dropdown.Item
                    key={embedConfig.type}
                    onClick={() => {
                    activeEditor.dispatchCommand(
                        INSERT_EMBED_COMMAND,
                        embedConfig.type,
                        handleShowYoutubeModal
                    );
                    }}
                >
                {embedConfig.icon}
                <span className="text">{embedConfig.contentName}</span>
                </Dropdown.Item>
                ))}
            </Dropdown.Menu>
            </Dropdown>
          <Divider />
          <ElementFormatDropdown
                value={elementFormat}
                editor={editor}
                isRTL={isRTL}
            />
            <Modal show={showImageModal} onHide={handleCloseImageModal}>
                <Modal.Header closeButton>
                <Modal.Title>Insert Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InsertImageDialog
                        activeEditor={activeEditor}
                        onClose={handleCloseImageModal}
                      />
                </Modal.Body>
            </Modal>
            {/* <Modal show={showYoutubeModal} onHide={handleCloseYoutubeModal}>
                <Modal.Header closeButton>
                <Modal.Title>Insert Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AutoEmbedDialog />
                </Modal.Body>
            </Modal> */}
        </>
      )}
    </div>
  );
}