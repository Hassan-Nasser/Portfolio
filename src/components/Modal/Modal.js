import "./Modal.scss"
import { useState,useEffect } from "react";

const Modal = ({ onRequestClose }) => {

    useEffect(() => {
        function onKeyDown(event) {
            if (event.keyCode === 27) {
                // Close the modal when the Escape key is pressed
                onRequestClose();
            }
        }

        // Prevent scolling
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);

        // Clear things up when unmounting this component
        return () => {
            document.body.style.overflow = "visible";
            document.removeEventListener("keydown", onKeyDown);
        };
    });

    return (
        <div className="modal__backdrop">
            <div className="modal__container">
                <h3 className="modal__title">I'm a modal!</h3>
                <p>
                    When this modal is open, we disable scrolling the <code>body</code> using{" "}
                    <code>overflow: hidden</code>. This allows users to scroll the modal
                    without losing their position on the page.
                </p>
                <p>
                    To close this modal, press the button below or use the Escape key on desktop.
                </p>
                <button type="button" onClick={()=>onRequestClose()}>
                    Close this modal
                </button>
                <div className="placeholder" />
                <div className="placeholder" />
                <div className="placeholder medium" />
                <div className="placeholder" />
            </div>
        </div>
    );
};

export default Modal;

// const App = () => {
//     const [isModalOpen, setModalIsOpen] = useState(false);

//     console.log(useState("hello")[1])
//     const toggleModal = () => {
//         setModalIsOpen(!isModalOpen);
//     };

//     return (
//         <main>
//             {isModalOpen && <Modal onRequestClose={toggleModal} />}
//             <h1>React modal</h1>
//             <p>
//                 This Pen shows an example of a controlled modal component built using React hooks, specifically <code>useState()</code> and <code>useEffect()</code>.
//             </p>
//             <p>Hit the button below to show the modal.</p>
//             <button onClick={toggleModal} type="button">
//                 Show the modal
//             </button>
//             <p>You'll find some great documentation about the <a target="_blank" href="https://reactjs.org/docs/hooks-state.html">state hooks</a> and the <a target="_blank" href="https://reactjs.org/docs/hooks-effect.html">effect hooks</a> in the official React documentation.</p>
//             <p>The placeholders below take up vertical space in order to demonstrate that the <code>body</code> cannot be scrolled while the modal is open.</p>
//             <div className="placeholder" />
//             <div className="placeholder large" />
//             <div className="placeholder medium" />
//             <div className="placeholder" />
//         </main>
//     );
// };

