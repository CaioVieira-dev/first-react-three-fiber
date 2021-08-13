
import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import model from '../assets/girl.glb'

type ActionName = 'Hiphop' | 'Idle' | 'Run' | 'Tpose' | 'Walk'
type GLTFAction = Record<ActionName, THREE.AnimationAction>

type GLTFResult = GLTF & {
    nodes: {
        Ch03: THREE.SkinnedMesh
        mixamorigHips: THREE.Bone
    }
    materials: {
        Ch03_Body: THREE.MeshStandardMaterial
    }
    animations: GLTFAction[];

}



export function GirlModel(props: JSX.IntrinsicElements['group']) {
    const group = useRef<THREE.Group>()
    const { nodes, materials, animations } = useGLTF(model) as GLTFResult

    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        if (actions.Hiphop) {
            actions.Hiphop.play();

        }
    }, [])

    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
                <primitive object={nodes.mixamorigHips} />
                <skinnedMesh
                    geometry={nodes.Ch03.geometry}
                    material={materials.Ch03_Body}
                    skeleton={nodes.Ch03.skeleton}
                    castShadow
                    receiveShadow
                />
            </group>
        </group>
    )
}

