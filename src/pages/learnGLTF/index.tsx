import { Canvas } from '@react-three/fiber'
import { useRef, useEffect, Suspense } from 'react'
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'



type ActionName = 'idle'
type GLTFAction = Record<ActionName, THREE.AnimationAction>
type GLTFResult = GLTF & {
    nodes: {
        Body: THREE.SkinnedMesh
        Head_Hands: THREE.SkinnedMesh
        Lower_Armor: THREE.SkinnedMesh
        Hips: THREE.Bone
    }
    materials: {
        ['Knight_MAT.001']: THREE.MeshStandardMaterial
    }
    animations: GLTFAction[]
}



function Model(props: JSX.IntrinsicElements['group']) {
    const group = useRef<THREE.Group>()
    const { nodes, animations } = useGLTF('/idle.glb') as GLTFResult
    const { actions } = useAnimations(animations, group)
    useEffect(() => {
        if (actions.idle) {
            actions.idle.play();
        }

    }, [actions.idle])
    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
                <primitive object={nodes.Hips} />
                <skinnedMesh
                    geometry={nodes.Body.geometry}
                    material={nodes.Body.material}
                    skeleton={nodes.Body.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Head_Hands.geometry}
                    material={nodes.Head_Hands.material}
                    skeleton={nodes.Head_Hands.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Lower_Armor.geometry}
                    material={nodes.Lower_Armor.material}
                    skeleton={nodes.Lower_Armor.skeleton}
                />
            </group>
        </group>
    )
}


export function MyFirstGLTF() {

    return (
        <Canvas>
            <Suspense fallback={null}>
                <Model />
            </Suspense>
            <ambientLight intensity={0.4} />
            <directionalLight position={[0, 10, -5]} color="white" intensity={1} />
            <OrbitControls />
        </Canvas>
    )
}


//useGLTF.preload('/idle.glb')