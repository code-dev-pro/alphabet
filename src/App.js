import "./App.css";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "./Hooks/useWindowSize";
import { TimelineMax, TweenLite, Power4, gsap } from "gsap";
import { Draggable } from "gsap/all";
import Const from "./Const";
import Letter from "./Letters";
gsap.registerPlugin(Draggable);

let ripple = {
  alpha: 0,
  radius: 0,
  x: 0,
  y: 0,
};

function App() {
  // Set dom ref
  const ref = useRef(null);
  const refCancas = useRef(null);

  // Get Window Size
  const size = useWindowSize();
  // get and set active letter
  const [letterActive, updateLetterActive] = useState(1);
  // get and set mounted component
  const [isMounted, updateMonted] = useState(false);
  // get and set background animation
  const [isAnimated, updateAnimated] = useState(false);

  const update = (index) => {
    refCancas.current.getContext("2d").clearRect(0, 0, size.width, size.height);
    refCancas.current.getContext("2d").beginPath();
    refCancas.current
      .getContext("2d")
      .arc(0, 0, ripple.radius, 0, 2 * Math.PI, false);
    refCancas.current.getContext("2d").fillStyle = Const.COLORS[index];
    refCancas.current.getContext("2d").fill();
  };

  const playAnimation = (index) => {
    if (isAnimated) {
      return;
    }
    let targetRadius = Math.sqrt(
      (size.width - 0) ** 2 + (size.height - 0) ** 2
    );
    updateAnimated(true);
    // Reset ripple
    TweenLite.set(ripple, { radius: 0 });
    var tl = new TimelineMax({
      onUpdate: update,
      onUpdateParams: [index],
      onComplete: () => {
        updateAnimated(false);
        document.body.style.backgroundColor = Const.COLORS[index];
      },
    })
      .to(ripple, 0.5, { alpha: 1, radius: targetRadius, ease: Power4.easeOut })
      .to(ripple, 0.3, { alpha: 0 }, "+=0.2");
  };

  const activeThemeChange = (index) => {
    ref.current.childNodes.forEach((el, i) => {
      el.childNodes[0].classList.remove("is-prev");
      el.childNodes[0].classList.remove("is-next");
      el.childNodes[0].classList.remove("is-active");

      if (i < index) {
        el.childNodes[0].classList.add("is-prev");
      } else if (i > index) {
        el.childNodes[0].classList.add("is-next");
      } else {
        el.childNodes[0].classList.add("is-active");
      }
    });
  };

  return (
    <div className="App">
      <canvas
        ref={refCancas}
        className="backgrounAnimate"
        width={size.width}
        height={size.height}
      ></canvas>
      <Letter />
      <ul
        onMouseLeave={() => activeThemeChange(letterActive)}
        ref={ref}
        className="App__Menu_Letters"
      >
        {Const.LETTERS.map((letter, index) => {
          return (
            <li
              key={index}
              className="App__Menu__Letter"
              onMouseEnter={() => {
                activeThemeChange(index);
              }}
            >
              <div
                onClick={() => {
                  updateLetterActive(index);
                  playAnimation(index);
                }}
                className={`App__Menu_Letter__Inner`}
                style={{ background: `${Const.COLORS[index]}` }}
              >
                <div className="App__Letter">
                  {" "}
                  <h3>{Const.LETTERS[index]}</h3>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
