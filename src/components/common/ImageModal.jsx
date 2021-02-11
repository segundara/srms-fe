import React from 'react';
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const ImageModal = ({ profileImage, setModalForImage, updateProfileImage, saveImg }) => {
    return (
        <div>
            <Modal
                size="sm"
                show={profileImage}
                onHide={() => setModalForImage(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Update Profile Image
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex flex-column" onSubmit={updateProfileImage}>
                        <Row>
                            <Col md={6}>
                                <label>Image</label>
                                <br></br>
                                <input
                                    type="file"
                                    id="imageFile"
                                    profile="file"
                                    onChange={saveImg}
                                    accept="imageFile/*"
                                />
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center">
                            <Button
                                className="align-self-center mr-4"
                                variant="warning"
                                type="submit"
                            >
                                Update Photo
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ImageModal
