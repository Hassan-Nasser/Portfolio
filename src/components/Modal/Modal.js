import "./Modal.scss"
import { useState, useEffect, useContext } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import Tag from "../Tag/Tag";
import { Scrollbars } from "react-custom-scrollbars";
import AppContext from "../AppContext";

const Modal = ({ project, closeModal }) => {

    const { isModal, setIsModal } = useContext(AppContext);

    return (
        <div onClick={() => closeModal()} className="modal__backdrop">
            <div className="modal__container">

                <h3 className="modal__title">{project.name}</h3>
                <div className="video image featured">
                    <iframe
                        title="myFrame"
                        src={project.url}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <Tag className="tag" tags={project.tags} />
                <Scrollbars
                    style={{ height: 100 }}
                // autoHide
                >
                    <p className="description">{project.description}</p>

                </Scrollbars>
                <button type="button" onClick={() => { setIsModal(false); closeModal(); }}>
                    Close
                </button>

            </div>
        </div>
    );
};

export default Modal;
