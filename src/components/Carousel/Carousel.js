import React, { useState } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'https://cdn.skypack.dev/react-icons/ti';
import "./Carousel.scss";


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
            console.log("swipe left");
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

    const pervious = () => {
        setActive(i => {
            i = i - 1;
            if (i === 0)
                i = count - 1;
            return i;
        })
    }
    const next = () => {
        setActive(i => {
            i = i + 1;
            if (i === count-1)
                i = 0;
            return i;
        })
    }


    const MAX_VISIBILITY = 4;
    return (
        <div className='carousel'
            onMouseDown={mouseDownEvent => handleMouseDown(mouseDownEvent)}
            onMouseMove={mouseMoveEvent => handleMouseMove(mouseMoveEvent)}
            onMouseUp={() => handleMouseUp()}

            onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
            onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
            onTouchEnd={() => handleTouchEnd()}

        >
            {active > 0 && <button className='nav left' onClick={() => setActive(i => i - 1)}><TiChevronLeftOutline /></button>}
            {React.Children.map(children, (child, i) => (
                <div className='card-container' style={{
                    '--active': i === active ? 1 : 0,
                    '--offset': (active - i) / 2.3,
                    '--direction': Math.sign(active - i),
                    '--abs-offset': Math.abs(active - i) / 3,
                    'pointerEvents': active === i ? 'auto' : 'none',
                    'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
                    'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
                }}>
                    {child}
                </div>
            ))}
            {active < count - 1 && <button className='nav right' onClick={() => setActive(i => i + 1)}><TiChevronRightOutline /></button>}
        </div>
    );
};

export default Carousel;