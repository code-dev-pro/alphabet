import { useEffect, useState,useRef } from "react";
import { TweenLite, gsap } from "gsap";
import { Draggable } from "gsap/all";
import Const from "../Const";
gsap.registerPlugin(Draggable);

var path;
var pathLength;
var startPoint;
var startAngle;

const Letter = () => {
   const refDrag = useRef(null);
    // get and set mounted component
  const [isMounted, updateMonted] = useState(false);

    const pointModifier = (point) => {
        var p = closestPoint(path, pathLength, point);
    
        TweenLite.set(".draggable", {
          rotation: p.rotation,
        });
    
        return p.point;
      };
      const closestPoint = (pathNode, pathLength, point) => {
        var precision = 8,
          best,
          bestLength,
          bestDistance = Infinity;
    
        // linear scan for coarse approximation
        for (
          var scan, scanLength = 0, scanDistance;
          scanLength <= pathLength;
          scanLength += precision
        ) {
          if (
            (scanDistance = distance2(
              (scan = pathNode.getPointAtLength(scanLength))
            )) < bestDistance
          ) {
            best = scan;
            bestLength = scanLength;
            bestDistance = scanDistance;
          }
        }
    
        // binary search for precise estimate
        precision /= 2;
        while (precision > 0.5) {
          var before,
            after,
            beforeLength,
            afterLength,
            beforeDistance,
            afterDistance;
          if (
            (beforeLength = bestLength - precision) >= 0 &&
            (beforeDistance = distance2(
              (before = pathNode.getPointAtLength(beforeLength))
            )) < bestDistance
          ) {
            best = before;
            bestLength = beforeLength;
            bestDistance = beforeDistance;
          } else if (
            (afterLength = bestLength + precision) <= pathLength &&
            (afterDistance = distance2(
              (after = pathNode.getPointAtLength(afterLength))
            )) < bestDistance
          ) {
            best = after;
            bestLength = afterLength;
            bestDistance = afterDistance;
          } else {
            precision /= 2;
          }
        }
    
        var len2 = bestLength + (bestLength === pathLength ? -0.1 : 0.1);
        var rotation = getRotation(best, pathNode.getPointAtLength(len2));
    
        return {
          point: best,
          rotation: rotation * Const.DEG,
          // distance: Math.sqrt(bestDistance),
        };
    
        function distance2(p) {
          var dx = p.x - point.x,
            dy = p.y - point.y;
          return dx * dx + dy * dy;
        }
      };
      const getRotation = (p1, p2) => {
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        return Math.atan2(dy, dx);
      };
    
      const initDrag = () => {
        console.log(refDrag.current);
    
        path = document.querySelector("#path");
    
        pathLength = path.getTotalLength() || 0;
        startPoint = path.getPointAtLength(0);
        startAngle = getRotation(startPoint, path.getPointAtLength(0.1));
        TweenLite.set(".draggable", {
          transformOrigin: "center",
          rotation: startAngle + "_rad",
          xPercent: -50,
          yPercent: -50,
          x: startPoint.x,
          y: startPoint.y,
        });
    
        if (refDrag.current) {
          const draggable = Draggable.create(".draggable", {
            liveSnap: {
              points: pointModifier,
            },
          });
        }
      };

      useEffect(() => {
        if (isMounted) {
           initDrag();
        }
        updateMonted(true);
        return () => {};
      }, [isMounted]);

    return (
        <div className="LetterA">
        <svg width="139.65" height="158.26" viewBox="0 0 139.65 158.26">
          <defs>
            <linearGradient
              id="linear-gradient"
              x1="13.89"
              y1="91.13"
              x2="153.53"
              y2="91.13"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#22a7f0" />
              <stop offset="1" stop-color="#4eb9f3" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-2"
              x1="28.13"
              y1="91.13"
              x2="139.29"
              y2="91.13"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#f1f2f2" />
              <stop offset="1" stop-color="#d1d3d4" />
            </linearGradient>
          </defs>

          <g id="Calque_1" data-name="Calque 1">
            <g id="A">
              <path
                className="cls-1"
                d="M41,170.26a25.68,25.68,0,0,1-11-2.47c-13.64-6.38-19.8-23.25-13.74-37.62L59,28.92a26.55,26.55,0,0,1,49.48,0L151.2,130.17c6.06,14.37-.1,31.24-13.74,37.62a25.66,25.66,0,0,1-11,2.46,27.07,27.07,0,0,1-24.75-16.93L94.61,136.5H72.8l-7.1,16.83A27.08,27.08,0,0,1,41,170.26Z"
                transform="translate(-13.89 -12)"
              />
              <path
                className="cls-2"
                d="M138.18,136.27,95.43,35A12.57,12.57,0,0,0,72,35L29.24,136.27a13.79,13.79,0,0,0,6.51,17.82,12.58,12.58,0,0,0,16.93-6.86L63.54,121.5h40.34l10.86,25.73a12.81,12.81,0,0,0,11.73,8,12.24,12.24,0,0,0,5.2-1.16A13.79,13.79,0,0,0,138.18,136.27ZM74.94,94.5l8.77-20.76L92.48,94.5Z"
                transform="translate(-13.89 -12)"
              />
            </g>
          </g>
          <g id="drag" ref={refDrag} className="draggable">
            <circle className="oval" cx="15" cy="15" r="15" />
            <polygon className="arrow" points="10,10 25,15 10,20" />
          </g>
         {/*  <path
            id="path2"
            className="path2"
            d="M159 70c-50.386 35.428-74.284 72.547-71.691 111.355 2.592 38.81 31.514 76.92 86.765 114.333L447.7 84.137l-9.812 263.996"
          /> */}
          <g id="Calque_2" data-name="Calque 2">
            <line
              id="path"
              className="cls-3 path"
              x1="20.38"
              y1="141"
              x2="69.09"
              y2="15.3"
            />
            <line
              className="cls-3 path"
              x1="37.34"
              y1="96.44"
              x2="99.38"
              y2="96.27"
            />
            <line
              className="cls-3 path"
              x1="69.09"
              y1="15.3"
              x2="116.31"
              y2="142.5"
            />
          </g>
        </svg>
      </div>
    )
}

export default Letter