import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const loader = new GLTFLoader();

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const tl = gsap.timeline({ defaults: { duration: 1.5, ease: 'power1' } },)

// demo
// Load a glTF resource
loader.load(
  // resource URL
  'caja.gltf',
  // called when the resource is loaded
  (gltf) => {
    scene.add(gltf.scene);

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

    /* gui.add(gltf.scene.rotation, 'x').min(0).max(9)
    gui.add(gltf.scene.rotation, 'y').min(0).max(9)
    gui.add(gltf.scene.position, 'z').min(0).max(9)
    gui.add(gltf.scene.scale, 'y').min(1).max(4)
    gui.add(gltf.scene.position, 'x').min(1).max(4) */

    const common = {
      start: "top center",
      end: "bottom center",
      scrub: true,
      //markers: true
    }

    const min = 0.6
    const rescale = { x: min, y: min, z: min }
    //tl.to(gltf.scene.position, { x: -2.5, })
    tl.to(gltf.scene.scale, { ...rescale }, '<')

    tl.play()


    gsap.to(gltf.scene.rotation, {
      x: 0.8, y: 0.8, z: 0.8,
      ease: "none",
      scrollTrigger: {
        trigger: "#demo-1",
        ...common
      }
    })

    gsap.to(gltf.scene.position, {
      x: -2.5,
      ease: "none",
      scrollTrigger: {
        trigger: "#demo-2",
        ...common
      }
    })

    gsap.to(gltf.scene.position, {
      x: 3,
      ease: "none",
      scrollTrigger: {
        trigger: "#demo-3",
        ...common
      }
    })

    gsap.to(gltf.scene.rotation, {
      z: -2.7,
      ease: "none",
      scrollTrigger: {
        trigger: "#demo-4",
        ...common
      }
    })

  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  // called when loading has errors
  function (error) {
    console.log('An error happened', error);
  }
);

/* 
// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xff0000)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere) */

// Lights

const pointLight = new THREE.AmbientLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {

  const elapsedTime = clock.getElapsedTime()

  // Update objects
  //sphere.rotation.y = .5 * elapsedTime

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()