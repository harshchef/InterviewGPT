import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-d-scene',
  template: '<div id="threeDContainer"></div>',
  styleUrls: ['./three-d-scene.component.css']
})
export class ThreeDSceneComponent implements OnInit, AfterViewInit {
  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initThreeJS();
  }

  initThreeJS() {
    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threeDContainer')?.appendChild(renderer.domElement);

    // Create geometry and material
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  }
}
