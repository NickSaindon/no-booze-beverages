import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$wrapNodeInElement, mergeRegister} from '@lexical/utils';
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  LexicalCommand,
  LexicalEditor,
} from 'lexical';
import {useEffect, useRef, useState} from 'react';
import Button from 'react-bootstrap/Button';

// import {CAN_USE_DOM} from 'shared/canUseDOM';

// import landscapeImage from '../../images/landscape.jpg';
// import yellowFlowerImage from '../../images/yellow-flower.jpg';
import {
  $createImageNode,
  $isImageNode,
  ImageNode,
  ImagePayload,
} from '@/utils/nodes/ImageNode';

const getDOMSelection = targetWindow =>
  CAN_USE_DOM ? (targetWindow || window).getSelection() : null;

export const INSERT_IMAGE_COMMAND = createCommand("INSERT_IMAGE_COMMAND");

export function InsertImageUriDialogBody({onClick}) {
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");
  
  const isDisabled = src === '';

  return (
    <>
      <div className="mb-3">
        <label for="imageURL" className="form-label">Image URL</label>
        <input 
          type="text"
          className="form-control" 
          id="imageURL" 
          onChange={(e) => setSrc(e.target.value)}
          value={src}
          placeholder="i.e. https://source.unsplash.com/random" 
          data-test-id="image-modal-url-input"
        />
      </div>
      <div className="mb-3">
        <label for="altText" className="form-label">Alt Text</label>
        <input 
          type="text"
          className="form-control" 
          id="altText" 
          placeholder="Random image" 
          onChange={(e) => setAltText(e.target.value)}
          value={altText}
          data-test-id="image-modal-alt-text-input"
        />
      </div>
      <div className="d-grid gap-2">
        <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => onClick({src, altText})}
        >
            Confirm
        </button>
      </div>

    </>
  )
}

export function InsertImageDialog({activeEditor, onClose}) {
    const [mode, setMode] = useState(null)
    const hasModifier = useRef(false)
  
    useEffect(() => {
      hasModifier.current = false
      const handler = e => {
        hasModifier.current = e.altKey
      }
      document.addEventListener("keydown", handler, {passive: true})
      return () => {
        document.removeEventListener("keydown", handler)
      }
    }, [activeEditor])
  
    const onClick = payload => {
      activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)
      onClose()
    }

  return (
    <>
      {!mode && (
        <div className="d-grid gap-2">
          <Button 
            variant="primary" 
            size="lg"
            data-test-id="image-modal-option-url"
            onClick={() => setMode("url")}
          >
            URL          
          </Button>
        </div>
      )}
      {mode === "url" && <InsertImageUriDialogBody onClick={onClick} />}
    </>
  )
}

export default function ImagesPlugin({ captionsEnabled }) {
    const [editor] = useLexicalComposerContext()
  
    useEffect(() => {
    //   if (!editor.hasNodes([ImageNode])) {
    //     throw new Error("ImagesPlugin: ImageNode not registered on editor")
    //   }
  
      return mergeRegister(
        editor.registerCommand(
          INSERT_IMAGE_COMMAND,
          payload => {
            const imageNode = $createImageNode(payload)
            $insertNodes([imageNode])
            if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
              $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd()
            }
  
            return true
          },
          COMMAND_PRIORITY_EDITOR
        ),
        editor.registerCommand(
          DRAGSTART_COMMAND,
          event => {
            return onDragStart(event)
          },
          COMMAND_PRIORITY_HIGH
        ),
        editor.registerCommand(
          DRAGOVER_COMMAND,
          event => {
            return onDragover(event)
          },
          COMMAND_PRIORITY_LOW
        ),
        editor.registerCommand(
          DROP_COMMAND,
          event => {
            return onDrop(event, editor)
          },
          COMMAND_PRIORITY_HIGH
        )
      )
    }, [captionsEnabled, editor])
  
    return null
  }



function onDragStart(event) {
    const TRANSPARENT_IMAGE =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  const img = document.createElement('img');
  img.src = TRANSPARENT_IMAGE;

  const node = getImageNodeInSelection()
  if (!node) {
    return false
  }
  const dataTransfer = event.dataTransfer
  if (!dataTransfer) {
    return false
  }
  dataTransfer.setData("text/plain", "_")
  dataTransfer.setDragImage(img, 0, 0)
  dataTransfer.setData(
    "application/x-lexical-drag",
    JSON.stringify({
      data: {
        altText: node.__altText,
        caption: node.__caption,
        height: node.__height,
        key: node.getKey(),
        maxWidth: node.__maxWidth,
        showCaption: node.__showCaption,
        src: node.__src,
        width: node.__width
      },
      type: "image"
    })
  )

  return true
}

function onDragover(event) {
    const TRANSPARENT_IMAGE =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  const img = document.createElement('img');
  img.src = TRANSPARENT_IMAGE;

  const node = getImageNodeInSelection()
  if (!node) {
    return false
  }
  if (!canDropImage(event)) {
    event.preventDefault()
  }
  return true
}

function onDrop(event, editor) {
    const TRANSPARENT_IMAGE =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  const img = document.createElement('img');
  img.src = TRANSPARENT_IMAGE;

  const node = getImageNodeInSelection()
  if (!node) {
    return false
  }
  const data = getDragImageData(event)
  if (!data) {
    return false
  }
  event.preventDefault()
  if (canDropImage(event)) {
    const range = getDragSelection(event)
    node.remove()
    const rangeSelection = $createRangeSelection()
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range)
    }
    $setSelection(rangeSelection)
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data)
  }
  return true
}

function getImageNodeInSelection() {
  const selection = $getSelection()
  if (!$isNodeSelection(selection)) {
    return null
  }
  const nodes = selection.getNodes()
  const node = nodes[0]
  return $isImageNode(node) ? node : null
}

function getDragImageData(event) {
  const dragData = event.dataTransfer?.getData("application/x-lexical-drag")
  if (!dragData) {
    return null
  }
  const { type, data } = JSON.parse(dragData)
  if (type !== "image") {
    return null
  }

  return data
}

function canDropImage(event) {
  const target = event.target
  return !!(
    target &&
    target instanceof HTMLElement &&
    !target.closest("code, span.editor-image") &&
    target.parentElement &&
    target.parentElement.closest("div.ContentEditable__root")
  )
}

function getDragSelection(event) {
  let range
  const target = event.target
  const targetWindow =
    target == null
      ? null
      : target.nodeType === 9
      ? target.defaultView
      : target.ownerDocument.defaultView
  const domSelection = getDOMSelection(targetWindow)
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY)
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0)
    range = domSelection.getRangeAt(0)
  } else {
    throw Error(`Cannot get the selection when dragging`)
  }

  return range
}