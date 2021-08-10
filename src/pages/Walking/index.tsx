import { Canvas, useFrame } from "@react-three/fiber";

import * as THREE from 'three'
import { useRef, Suspense, useEffect } from 'react'
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type ActionName = 'idle' | 'walk' | 'walkback'
type GLTFAction = Record<ActionName, THREE.AnimationAction>

type GLTFResult = GLTF & {
    nodes: {
        Body: THREE.SkinnedMesh
        Head_Hands: THREE.SkinnedMesh
        Lower_Armor: THREE.SkinnedMesh
        Hips: THREE.Bone
    }
    materials: {
        Knight_MAT: THREE.MeshStandardMaterial
    }
    animations: GLTFAction[]
}



function Model(props: JSX.IntrinsicElements['group']) {
    const group = useRef<THREE.Group>()
    const state = useRef<"idle" | "walk" | "walkback">("idle");
    const { nodes, animations } = useGLTF('/walkingModel.glb') as GLTFResult
    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        function pressingEvent(e: KeyboardEvent) {
            if (e.key === "w") {
                state.current = "walk"
            }
            if (e.key === "s") {
                state.current = "walkback"
            }
        }
        function keyUpEvent(e: KeyboardEvent) {
            if (e.key === "w" || e.key === "s") {
                state.current = "idle"
            }
        }
        document.addEventListener("keypress", pressingEvent)
        document.addEventListener("keyup", keyUpEvent)
        return () => {
            document.removeEventListener("keypress", pressingEvent)
            document.removeEventListener("keyup", keyUpEvent)
        }
    }, [])

    useFrame(() => {
        if (actions.idle && actions.walk && actions.walkback) {
            switch (state.current) {
                case "idle":
                    actions.walkback.stop();
                    actions.walk.stop();
                    actions.idle.play();
                    break;
                case "walk":
                    actions.walkback.stop();
                    actions.idle.stop();
                    actions.walk.play();
                    break;
                case "walkback":
                    actions.walk.stop();
                    actions.idle.stop();
                    actions.walkback.play();
                    break;
            }
        }
    })

    return (
        <group ref={group} {...props} dispose={null} >
            <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
                <primitive object={nodes.Hips} />
                <skinnedMesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Body.geometry}
                    material={nodes.Body.material}
                    skeleton={nodes.Body.skeleton}
                />
                <skinnedMesh
                    castShadow
                    receiveShadow

                    geometry={nodes.Head_Hands.geometry}
                    material={nodes.Head_Hands.material}
                    skeleton={nodes.Head_Hands.skeleton}
                />
                <skinnedMesh
                    castShadow
                    receiveShadow

                    geometry={nodes.Lower_Armor.geometry}
                    material={nodes.Lower_Armor.material}
                    skeleton={nodes.Lower_Armor.skeleton}
                />
            </group>
        </group>
    )
}

function Plane() {

    return (
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="hsl(200,40%,50%)" />
        </mesh>
    )
}

export function Walking() {

    return (
        <Canvas shadows camera={{ position: [1, 1.5, 2.5], fov: 50 }}>
            <Suspense fallback={null}>
                <Model />
            </Suspense>
            <Plane />
            <ambientLight />
            <directionalLight position={[-5, 5, 5]} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

            <OrbitControls />
        </Canvas>
    )
}