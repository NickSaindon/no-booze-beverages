import {
  AutoEmbedOption,
  LexicalAutoEmbedPlugin,
  URL_MATCHER
} from "@lexical/react/LexicalAutoEmbedPlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useMemo, useState } from "react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import Modal from 'react-bootstrap/Modal';

// import useModal from "../../hooks/useModal"
import Button from 'react-bootstrap/Button';

// import Button from "../../ui/Button"
// import { DialogActions } from "../../ui/Dialog"
// import { INSERT_FIGMA_COMMAND } from "../FigmaPlugin"
// import { INSERT_TWEET_COMMAND } from "../TwitterPlugin"
import { INSERT_YOUTUBE_COMMAND } from "@/utils/plugins/YouTubePlugin"

// EmbedConfig: {
//   contentName;
//   // Icon for display.
//   icon;
//   // An example of a matching url https://twitter.com/jack/status/20
//   exampleUrl;
//   // For extra searching.
//   keywords;
//   // Embed a Figma Project.
//   description;
// }

export const YoutubeEmbedConfig = {
  contentName: "Youtube Video",

  exampleUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",

  // Icon for display.
  icon: <i className="icon bi bi-youtube" />,

  insertNode: function (editor, result) {},

  keywords: ["youtube", "video"],

  // Determine if a given URL is a match and return url data.
  parseUrl: function (url) {},

  type: "youtube-video"
}

// export const TwitterEmbedConfig = {
//   // e.g. Tweet or Google Map.
//   contentName: "Tweet",

//   exampleUrl: "https://twitter.com/jack/status/20",

//   // Icon for display.
//   icon: <i className="icon tweet" />,

//   // Create the Lexical embed node from the url data.
//   insertNode: (editor, result) => {
//     editor.dispatchCommand(INSERT_TWEET_COMMAND, result.id)
//   },

//   // For extra searching.
//   keywords: ["tweet", "twitter"],

//   // Determine if a given URL is a match and return url data.
//   parseUrl: text => {
//     const match = /^https:\/\/(twitter|x)\.com\/(#!\/)?(\w+)\/status(es)*\/(\d+)/.exec(
//       text
//     )

//     if (match != null) {
//       return {
//         id: match[5],
//         url: match[1]
//       }
//     }

//     return null
//   },

//   type: "tweet"
// }

// export const FigmaEmbedConfig = {
//   contentName: "Figma Document",

//   exampleUrl: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File",

//   icon: <i className="icon figma" />,

//   insertNode: (editor, result) => {
//     editor.dispatchCommand(INSERT_FIGMA_COMMAND, result.id)
//   },

//   keywords: ["figma", "figma.com", "mock-up"],

//   // Determine if a given URL is a match and return url data.
//   parseUrl: text => {
//     const match = /https:\/\/([\w.-]+\.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/.exec(
//       text
//     )

//     if (match != null) {
//       return {
//         id: match[3],
//         url: match[0]
//       }
//     }

//     return null
//   },

//   type: "figma"
// }

export const EmbedConfigs = [
  YoutubeEmbedConfig,
]

function AutoEmbedMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option
}) {
  let className = "item"
  if (isSelected) {
    className += " selected"
  }
  return (
    <li
      key={option.key}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={"typeahead-item-" + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <span className="text">{option.title}</span>
    </li>
  )
}

function AutoEmbedMenu({
  options,
  selectedItemIndex,
  onOptionClick,
  onOptionMouseEnter
}) {
  return (
    <div className="typeahead-popover">
      <ul>
        {options.map((option, i) => (
          <AutoEmbedMenuItem
            index={i}
            isSelected={selectedItemIndex === i}
            onClick={() => onOptionClick(option, i)}
            onMouseEnter={() => onOptionMouseEnter(i)}
            key={option.key}
            option={option}
          />
        ))}
      </ul>
    </div>
  )
}

const debounce = (callback, delay) => {
  let timeoutId
  return text => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(async () => {
      await callback(text)
    }, delay)
  }
}

export function AutoEmbedDialog({ onClose }) {
  const [text, setText] = useState("")
  const [editor] = useLexicalComposerContext()
  const [embedResult, setEmbedResult] = useState(null)
  const embedConfig = EmbedConfigs;

  embedConfig.insertNode = async (editor, result) => {
      editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, result.id)
  }

  embedConfig.parseUrl = async (url) => {
    const match = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(
      url
    )

    const id = match ? (match?.[2].length === 11 ? match[2] : null) : null

    if (id != null) {
      return {
        id,
        url
      }
    }

    return null
  }

  const validateText = useMemo(
    () =>
      debounce(inputText => {
        if (embedConfig != null && inputText != null) {
          Promise.resolve(embedConfig.parseUrl(inputText)).then(parseResult => {
            setEmbedResult(parseResult)
          }, 10000)
        } else if (embedResult != null) {
          setEmbedResult(null)
        }
      }),
    [embedConfig, embedResult]
  )


  const onClick = () => {
    if (embedResult != null) {
      embedConfig.insertNode(editor, embedResult)
      onClose()
    }
  }

  const youtubePlaceholder = embedConfig[0].exampleUrl;
  const youtubeType = embedConfig[0].type;

  return (
    <div>
        <div className="Input__wrapper">
        <div className="mb-3">
        <label htmlFor="embedVideo" className="form-label">Image URL</label>
        <input
          type="text"
          className="form-control"
          placeholder={youtubePlaceholder}
          value={text}
          id="emberVideo"
          data-test-id={`${youtubeType}-embed-modal-url`}
          onChange={(e) => {
            const { value } = e.target;
            setText(value);
            validateText(value);
          }}
        />
        </div>
      </div>
      <div className="d-grid gap-2">
          <Button
            disabled={!embedResult}
            onClick={onClick}
            data-test-id={`${embedConfig[0].type}-embed-modal-submit-btn`}
          >
            Embed
          </Button>
        </div>
    </div>
  )
}

export default function AutoEmbedPlugin() {
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const handleCloseYoutubeModal = () => setShowYoutubeModal(false);
  const handleShowYoutubeModal = () => setShowYoutubeModal(true);
  const embedConfig = EmbedConfigs;
  const youtubeContentName = embedConfig[0].contentName

  const getMenuOptions = (activeEmbedConfig, embedFn, dismissFn) => {
    return [
      new AutoEmbedOption("Dismiss", {
        onSelect: dismissFn
      }),
      new AutoEmbedOption(`Embed ${activeEmbedConfig.contentName}`, {
        onSelect: embedFn
      })
    ]
  }

  return (
    <>
      <Modal show={showYoutubeModal} onHide={handleCloseYoutubeModal}>
      <Modal.Header closeButton>
      <Modal.Title>{`Embed ${youtubeContentName}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AutoEmbedDialog embedConfig={embedConfig} onClose={handleCloseYoutubeModal} />
      </Modal.Body>
  </Modal>
      <LexicalAutoEmbedPlugin
        embedConfigs={EmbedConfigs}
        onOpenEmbedModalForConfig={handleShowYoutubeModal}
        getMenuOptions={getMenuOptions}
        menuRenderFn={(
          anchorElementRef,
          {
            selectedIndex,
            options,
            selectOptionAndCleanUp,
            setHighlightedIndex
          }
        ) =>
          anchorElementRef.current
            ? ReactDOM.createPortal(
                <div
                  className="typeahead-popover auto-embed-menu"
                  style={{
                    marginLeft: anchorElementRef.current.style.width,
                    width: 200
                  }}
                >
                  <AutoEmbedMenu
                    options={options}
                    selectedItemIndex={selectedIndex}
                    onOptionClick={(option, index) => {
                      setHighlightedIndex(index)
                      selectOptionAndCleanUp(option)
                    }}
                    onOptionMouseEnter={index => {
                      setHighlightedIndex(index)
                    }}
                  />
                </div>,
                anchorElementRef.current
              )
            : null
        }
      />
    </>
  )
}