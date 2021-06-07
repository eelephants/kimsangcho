import React, { useCallback, useRef, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import * as THREE from 'three';
import BodyclassLogo from '../../assets/bodyclass_logo.png';

const BoxGeometry = ({ width, height, position }) => {
  const canvasRef = useRef();
  const canvasFuncRef = useRef();

  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [cubes, setCubes] = useState('');

  useEffect(() => {
    init();
    return () => {
      if (canvasRef) {
        cancelAnimationFrame(canvasRef.current);
      }
    };
  }, []);

  const onMouseDownEvent = (event) => {
    setIsDragging(true);
  };

  const onMouseUpEvent = (event) => {
    setIsDragging(false);
  };

  const onMouseMoveEvent = (event) => {
    const deltaMove = {
      x: event.nativeEvent.offsetX - previousMousePosition.x || 0,
      y: event.nativeEvent.offsetY - previousMousePosition.y || 0,
    };

    if (isDragging) {
      const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          toRadians(deltaMove.y * 1),
          toRadians(deltaMove.x * 1),
          0,
          'XYZ'
        )
      );
      cubes.quaternion.multiplyQuaternions(
        deltaRotationQuaternion,
        cubes.quaternion
      );
    }

    setPreviousMousePosition({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    });
  };

  const requestAnimationCustomFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  const onMouseEnterEvent = (event) => {
    cancelAnimationFrame(canvasRef.current);
  };

  const onMouseLeaveEvent = (event) => {
    requestAnimationFrame(canvasFuncRef.current);
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

    setCubes(cube);
    scene.add(cube);
    renderer.render(scene, camera);

    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      canvasRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    canvasFuncRef.current = animate;

    animate();

    const animates = () => {
      renderer.render(scene, camera);

      requestAnimationCustomFrame(animates);
    };

    animates();
  }, []);

  const requestAnimationFrame = (() => {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  const toRadians = (angle) => {
    return angle * (Math.PI / 180);
  };

  const toDegrees = (angle) => {
    return angle * (180 / Math.PI);
  };

  return (
    <div
      css={{
        width,
        height,
        position,
        border: '1px solid red',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'transparents',
        zIndex: '500',
      }}
    >
      <div
        css={canvasWrapperStyle}
        ref={canvasRef}
        onMouseEnter={onMouseEnterEvent}
        onMouseLeave={onMouseLeaveEvent}
        onMouseMove={onMouseMoveEvent}
        onMouseDown={onMouseDownEvent}
        onMouseUp={onMouseUpEvent}
      ></div>
    </div>
  );
};

const canvasWrapperStyle = css`
  width: 100%;
  height: 100%;
  transform: 'translate(-50%, -50%)';
  canvas {
    width: 100%;
    height: 100%;
  }
`;

export default BoxGeometry;
