import React, { useCallback, useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import * as THREE from 'three';

export const Canvas = ({ width, height, position }) => {
  const canvasRef = useRef();

  useEffect(() => {
    init();
  }, []);

  const init = useCallback(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    console.log();
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      canvasRef.current.offsetWidth,
      canvasRef.current.offsetHeight
    );
    // document.body.appendChild(renderer.domElement);
    canvasRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div
      css={{
        width,
        height,
        position,
        border: '1px solid red',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div css={canvasWrapperStyle} ref={canvasRef}></div>
    </div>
  );
};

const canvasWrapperStyle = css`
  width: 100%;
  height: 100%;
`;
