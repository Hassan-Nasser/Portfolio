import "./Modal.scss"
import { useContext, useEffect, useRef } from "react";
import Tag from "../Tag/Tag";
import { Scrollbars } from "react-custom-scrollbars-2";
import AppContext from "../AppContext";
import NoVideo from '../../images/no-video.png';
import GooglePlay from '../../images/google-play.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/fontawesome-free-solid';

const Modal = ({ project, closeModal }) => {

    const { isModal, setIsModal } = useContext(AppContext);
    const myContainer = useRef();
    const iframeContainer = useRef();

    useEffect(() => {
        // function disablePreventDefault(e) {
        //     e.stopPropagation();
        // }
        function disableScrollInIframe(e) {
            e.preventDefault();
        }
        // function x(e) {
        //     // e.preventDefault();
        //     e.stopPropagation();
        //     myContainer.current.focus();
        // }


        if (myContainer && myContainer.current) {
            // myContainer.current.addEventListener("wheel", disablePreventDefault, {passive:false});
            // myContainer.current.addEventListener("wheel", disablePreventDefault, false);
            // myContainer.current.focus();
        }
        if (iframeContainer && iframeContainer.current) {
            iframeContainer.current.contentWindow.addEventListener("wheel", disableScrollInIframe, { passive: false });
            iframeContainer.current.contentWindow.addEventListener("scroll", disableScrollInIframe, { passive: false });
        }
          return  iframeContainer.current.contentWindow.removeEventListener("wheel", disableScrollInIframe);
    }, []);

    return (
        <>
            <div className="modal__backdrop" onClick={() => { setIsModal(false); closeModal(); }}></div>
            <div className="modal__container">

                <div className="modal__title font-2" id="example-custom-modal-styling-title">{project.name}</div>
                <FontAwesomeIcon 
                    onClick={() => { setIsModal(false); closeModal(); }}
                    className="close-btn pointer" icon={faTimes} />
                <div className="video">
                    <iframe
                        ref={iframeContainer}
                        title={project.name}
                        src={project.url ? project.url : NoVideo}
                        frameBorder="0"
                        scrolling="no"
                        seamless="seamless"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <Tag className="tag" isModal={true} tags={project.tags} />

                {project.googlePlay && (

                    <a
                        className="google-play-link"
                        href={project.googlePlay}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="google-play-icon" style={{ backgroundImage: "url(" + GooglePlay + ")" }}></div>
                    </a>

                )}
                <div
                    // ref={myContainer}
                    style={{ width: "100%", height: "100px" }}>
                    <Scrollbars

                        autoHeight
                        autoHeightMax={100}
                        className="scroll-bar"
                        renderView={(props) => <div {...props} className="view" />}
                        renderTrackVertical={(props) => <div {...props} className="vtrack" />}
                        renderThumbVertical={(props) => <div {...props} className="vthumb" />}
                    >
                        <p className="noscroll"  >{project.description}</p>
                    </Scrollbars>
                </div>
            </div>

        </>
    );
};

export default Modal;
