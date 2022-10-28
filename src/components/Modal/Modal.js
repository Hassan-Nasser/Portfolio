import "./Modal.scss"
import { useState, useEffect, useContext } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import Tag from "../Tag/Tag";
import { Scrollbars } from "react-custom-scrollbars-2";
import ScrollArea from "react-scrollbar";
import AppContext from "../AppContext";

const Modal = ({ project, closeModal }) => {

    const { isModal, setIsModal } = useContext(AppContext);

    return (
        <>
            <div className="modal__backdrop" onClick={() => { console.log("Clicked"); setIsModal(false); closeModal(); }}></div>
            <div className="modal__container">

                <h3 className="modal__title" id="example-custom-modal-styling-title">{project.name}</h3>
                <div className="video image featured ">
                    <iframe
                        title={project.name}
                        src={project.url}
                        frameBorder="0"
                        scrolling="no"
                        seamless="seamless"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <Tag className="tag" isModal={true} tags={project.tags} />

                <Scrollbars
                    autoHeight
                    autoHeightMax={100}
                    renderView={(props) => <div {...props} className="view" />}
                    renderTrackVertical={(props) => <div {...props} className="vtrack" />}
                    renderThumbVertical={(props) => <div {...props} className="vthumb" />}
                >
                    <p >{project.description}</p>

                </Scrollbars>
                <div className="center padding-top-1">
                    <button type="button " className="btn btn-dark center" onClick={() => { setIsModal(false); closeModal(); }}>
                        Close
                    </button>
                </div>
            </div>

        </>
    );
};

export default Modal;
