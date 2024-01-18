import { useCallback, useMemo, useState } from "react"
import * as React from "react"

import Modal from 'react-bootstrap/Modal';

export default function useModal() {
  const [modalContent, setModalContent] = useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClose = useCallback(() => {
    setModalContent(null)
  }, [])

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null
    }
    const { title, content } = modalContent
    return (
      <Modal
        onClose={onClose}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {content}
        </Modal.Body>

      </Modal>
    )
  }, [modalContent, onClose])

  const showModal = useCallback(
    (
      title,
      // eslint-disable-next-line no-shadow
      getContent,
      closeOnClickOutside = false
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        title
      })
    },
    [onClose]
  )

  return [modal, showModal]
}
