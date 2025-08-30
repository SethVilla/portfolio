"use client";

// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
import TextSplash from './components/splash-screens/TextSplash';
import { HomePage } from './components/home-page/HomePage';

export default function Home() {

  // useEffect(() => {
  //   const canvas = document.querySelector('canvas');
  //   const scene = new THREE.Scene();
  //   const geometry = new THREE.BoxGeometry(1, 1, 1);
  //   const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
  //   const mesh = new THREE.Mesh(geometry, material);
  //   scene.add(mesh);
  //   const sizes = {
  //     width: window.innerWidth,
  //     height: window.innerHeight
  //   }
  //   const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  //   camera.position.z = 5;
  //   scene.add(camera);

  //   const renderer = new THREE.WebGLRenderer({
  //     canvas,
  //     antialias: true
  //   });
  //   renderer.setSize(sizes.width, sizes.height);
  //   renderer.render(scene, camera);

  //   console.log(THREE);
  // }, []);

  return (
    < >
      <TextSplash 
        title="Human" 
        subtitle="Lost in their imagination"
        duration={1000}
        onComplete={() => console.log('Splash screen completed')}
      />
      <HomePage />
    </>
  );
}
