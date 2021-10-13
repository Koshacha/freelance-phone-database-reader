import { Button, Modal } from "react-bootstrap";

const BlocklistModal = (props) => {
    const { shown, title, children, closeHandle, submitHandle } = props;

    return (
        <>
            <Modal
                show={shown}
                onHide={closeHandle}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeHandle}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={submitHandle}>Сохранить</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BlocklistModal;