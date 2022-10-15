import React, { useState } from 'react';
import "./Carousel.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// import 'font-awesome/css/font-awesome.min.css';

const Carousel = ({ children }) => {
    const [active, setActive] = useState(2);
    const count = React.Children.count(children);
    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);
    const [mouseStart, setMouseStart] = React.useState(0);
    const [mouseEnd, setMouseEnd] = React.useState(0);

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    }
    const handleMouseDown = (e) => {
        setMouseStart(e.clientX);
    }


    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }
    const handleMouseMove = (e) => {
        setMouseEnd(e.clientX);
    }

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 150) {
            setActive(i => i + 1)
        }

        if (touchStart - touchEnd < -150) {
            setActive(i => i - 1)
        }
    }
    const handleMouseUp = () => {
        if (mouseStart - mouseEnd > 150) {
            setActive(i => i + 1)
        }

        if (mouseStart - mouseEnd < -150) {
            setActive(i => i - 1)
        }
    }

    const MAX_VISIBILITY = 3;
    return (
        <div className='carousel'
            onMouseDown={mouseDownEvent => handleMouseDown(mouseDownEvent)}
            onMouseMove={mouseMoveEvent => handleMouseMove(mouseMoveEvent)}
            onMouseUp={() => handleMouseUp()}

            onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
            onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
            onTouchEnd={() => handleTouchEnd()}

        >
            {active > 0 &&
                <button className='nav left' onClick={() => setActive(i => i - 1)}>
                     <FontAwesomeIcon icon={faChevronLeft} />

                </button>}
            {React.Children.map(children, (child, i) => (
                <div className='card-container' style={{
                    '--active': i === active ? 1 : 0,
                    '--offset': (active - i) / 3.2,
                    '--direction': Math.sign(active - i),
                    '--abs-offset': Math.abs(active - i) / 3,
                    'pointerEvents': active === i ? 'auto' : 'none',
                    'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0.8' : '1',
                    'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
                }}>
                    {child}
                </div>
            ))}
            {active < count - 1 &&
             <button className='nav right' onClick={() => setActive(i => i + 1)}>
                 <FontAwesomeIcon icon={faChevronRight} />
                </button>}
        </div>
    );
};

export default Carousel;