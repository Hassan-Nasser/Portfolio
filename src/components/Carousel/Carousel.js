import React, { useState } from 'react';
import "./Carousel.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Carousel = ({ children }) => {
    const [active, setActive] = useState(2);
    const count = React.Children.count(children);
    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);
    const [mouseStart, setMouseStart] = React.useState(0);
    const [mouseEnd, setMouseEnd] = React.useState(0);
    const [items, setItems] = React.useState(React.Children.toArray(children));


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
    const pervious = () => {
        let newActive = active;
        newActive--;
        setActive(newActive < 0 ? count - 1 : newActive);
    }
    const next = () => {
        let newActive = active;
        setActive((newActive + 1) % count);
    }
    // const generateItems = () => {
    //     var items = []
    //     var level
    //     for (var i = active - 2; i < active + 3; i++) {
    //         var index = i
    //         if (i < 0) {
    //             index = count + i
    //         } else if (i >= count) {
    //             index = i % count
    //         }
    //         level = active - i
    //         items.push(<Item
    //             key={index} id={this.state.items[index]}
    //             level={level} />)
    //     }
    //     return items
    // }


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
                <button className='nav left' onClick={() => pervious()}>
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
                <button className='nav right' onClick={() => next()}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>}
        </div>
    );
};

export default Carousel;
