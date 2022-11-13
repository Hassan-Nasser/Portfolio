import "./Modal.scss"
import { useContext, useEffect, useRef } from "react";
import Tag from "../Tag/Tag";
import { Scrollbars } from "react-custom-scrollbars-2";
import AppContext from "../AppContext";
import NoVideo from '../../images/no-video.png';
import GooglePlay from '../../images/google-play.png';


const Modal = ({ project, closeModal }) => {

    const { isModal, setIsModal } = useContext(AppContext);
    const myContainer = useRef();

    useEffect(() => {
        function disablePreventDefault(e) {
            e.stopPropagation();
        }


        if (myContainer && myContainer.current) {
            myContainer.current.addEventListener("wheel", disablePreventDefault, false);
        }
    }, []);

    return (
        <>
            <div className="modal__backdrop" onClick={() => { setIsModal(false); closeModal(); }}></div>
            <div className="modal__container">

                <h3 className="modal__title" id="example-custom-modal-styling-title">{project.name}</h3>
                <div className="video image featured ">
                    <iframe
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
                        <img className="google-play-icon"  style={{ backgroundImage: "url(" + GooglePlay + ")" }} />
                    </a>

                )}

              <Scrollbars
                    autoHeight
                    autoHeightMax={100}
                    className="scroll-bar"
                    renderView={(props) => <div {...props} className="view" />}
                    renderTrackVertical={(props) => <div {...props} className="vtrack" />}
                    renderThumbVertical={(props) => <div {...props} className="vthumb" />}
                >
                    <p ref={myContainer} >{project.description}</p>
                </Scrollbars>
                <hr className="modal-hr" />
                <div className="center padding-top-1 center">
                    <button type="button " className="btn btn-danger margin-1" onClick={() => { setIsModal(false); closeModal(); }}>
                        Close
                    </button>
                </div>
            </div>

        </>
    );
};

export default Modal;
