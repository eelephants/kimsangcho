import React, { useCallback, useRef, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import * as THREE from 'three';
import BodyclassLogo from '../../assets/bodyclass_logo.png';

const BoxGeometry = ({ width, height, position }) => {
  const canvasRef = useRef();

  useEffect(() => {
    init();

    return () => {
      cancelAnimationFrame(canvasRef.current.animate);
    };
  }, []);

  const onMouseOverEvent = (event) => {
    cancelAnimationFrame(canvasRef.current.animate);
  };

  const onMouseLeaveEvent = (event) => {
    requestAnimationFrame(canvasRef.current.animateFunc);
  };

  const init = useCallback(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      30,
      canvasRef.current.offsetWidth / canvasRef.current.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer.setSize(
      canvasRef.current.offsetWidth,
      canvasRef.current.offsetHeight
    );
    canvasRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const loader = new THREE.TextureLoader();

    const materials = [
      new THREE.MeshBasicMaterial({
        map: loader.load(BodyclassLogo),
      }),
      new THREE.MeshBasicMaterial({
        color: '#ddd',
      }),
      new THREE.MeshBasicMaterial({
        color: '#000',
      }),
      new THREE.MeshBasicMaterial({
        color: '#605FE8',
      }),
      new THREE.MeshBasicMaterial({
        color: '#48E885',
      }),
      new THREE.MeshBasicMaterial({
        color: '#E8C93C',
      }),
    ];

    const cube = new THREE.Mesh(geometry, materials);

    scene.add(cube);
    renderer.render(scene, camera);

    const animate = function () {
      canvasRef.current.animateFunc = animate;
      canvasRef.current.animate = requestAnimationFrame(animate);
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
        background: 'transparents',
      }}
    >
      <div
        css={canvasWrapperStyle}
        ref={canvasRef}
        onMouseEnter={onMouseOverEvent}
        onMouseLeave={onMouseLeaveEvent}
      ></div>
    </div>
  );
};

const canvasWrapperStyle = css`
  width: 100%;
  height: 100%;
`;

export default BoxGeometry;
