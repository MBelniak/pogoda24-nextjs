import React from 'react';

export const canvasWidth = 1000;
export const canvasHeight = 666;
export const Canvas = () => {
    return (
        <div
            style={{
                boxShadow: '0 0 15px black',
                textAlign: 'center',
                margin: 'auto',
                width: canvasWidth,
                height: canvasHeight
            }}>
            <canvas id="canvas" width={canvasWidth} height={canvasHeight} />
        </div>
    );
};
