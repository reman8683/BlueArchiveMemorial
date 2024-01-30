import React from "react";
import * as PIXI from 'pixi.js';
import {Spine} from "pixi-spine";
import {useEffect, useRef} from "react";

window.PIXI = PIXI;
const app = new PIXI.Application({
    width: 1280,
    height: 720
});

function smooth(target, current, speed) {
    let distX = target.x - current.x;
    let distY = target.y - current.y;

    current.x = current.x + (distX * speed);
    current.y = current.y + (distY * speed);

    return current;
}

export default function Memorial() {
    const canvasRef = useRef(null);
    const canvas = app.view;
    PIXI.Assets.load('./hoshino_swimsuit/Hoshino_swimsuit_home.skel').then(onAssetsLoaded);

    useEffect(() => {
        canvasRef.current?.appendChild(canvas);
        app.start();

        return () => {
            app.stop();
        };
    }, [canvas]);

    function onAssetsLoaded(memorialAsset) {
        app.stage.interactive = true;
        const memorial = new Spine(memorialAsset.spineData);

        let startAnimation = true;
        let isClicked = false;
        let mousePosition = {x: 0, y: 0};

        canvas.addEventListener('pointermove', function(e) {
            mousePosition = {x: e.x, y: e.y};
        });
        canvas.addEventListener('pointerdown', function(e) {
            isClicked = true;
        }, false);
        canvas.addEventListener('pointerup', function(e) {
            isClicked = false;
            if (!startAnimation) memorial.state.setAnimation(2, 'PatEnd_01_A', false);
        }, false);

        memorial.state.setAnimation(0, 'Start_Idle_01', false);
        memorial.state.tracks[0].listener = {
            complete() {
                memorial.state.setAnimation(1, 'Idle_01', true);
                startAnimation = false
            }
        }

        let eyePosition = {x: 0, y: 0};
        let smoothedEye = {x: 0, y: 0};

        let pointPosition = {x: 0, y: 0};
        let smoothedPoint = {x: 0, y: 0};

        const eyeBone = memorial.skeleton.findBone('Touch_Eye');
        const pointBone = memorial.skeleton.findBone('Touch_Point');

        let absolutePosition;
        app.ticker.add(() => {
            const cr = canvas.getBoundingClientRect();

            absolutePosition = {
                x: mousePosition.x - (cr.x + cr.width / 2),
                y: mousePosition.y - (cr.y + cr.height / 2)
            }

            if (!startAnimation) {
                smoothedEye = smooth(eyePosition, smoothedEye, 0.1);
                eyePosition = {
                    x: absolutePosition.x / 2,
                    y: absolutePosition.y / 2
                };

                eyeBone.y = -smoothedEye.x.valueOf() + 115;
                eyeBone.x = -smoothedEye.y.valueOf();

                smoothedPoint = smooth(pointPosition, smoothedPoint, 0.1);

                if (isClicked) {
                    memorial.state.setAnimation(2, 'Pat_01_A', false);

                    if (absolutePosition.y < 24*(absolutePosition.x-100)/5+180) { // spine 모델 깨짐 -> 마우스 최대 제한
                        pointPosition = {
                            x: (absolutePosition.x - 215) / 2.5,
                            y: (absolutePosition.y + 140) / 2.5
                        };
                    }
                }
                else {
                    pointPosition = {x: 0, y: 0};
                }

                pointBone.y = -smoothedPoint.x.valueOf() + 22.5;
                pointBone.x = -smoothedPoint.y.valueOf() + 250;
            }
        });

        memorial.x = app.screen.width / 2;
        memorial.y = app.screen.height;

        memorial.scale.set(0.4);
        app.stage.addChild(memorial);

        memorial.state.timeScale = 1;

        app.start();
    }

    return (
        <div className="shittim-screen" ref={canvasRef}/>
    );
}

