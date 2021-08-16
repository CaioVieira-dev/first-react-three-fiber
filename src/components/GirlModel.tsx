
import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useCompoundBody } from '@react-three/cannon'

import model from '../assets/girl.glb'
import { useFrame } from '@react-three/fiber'
import { mergeRefs } from '../utils/mergeRef'

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
    const state = useRef<'Hiphop' | 'Idle' | 'Run' | 'Tpose' | 'Walk'>('Idle')
    const position = useRef<[x: number, y: number, z: number]>([0, .8, 0])
    const { nodes, materials, animations } = useGLTF(model) as GLTFResult

    const { actions } = useAnimations(animations, group)
    const [ref, api] = useCompoundBody(() => ({
        mass: 0,
        shapes: [{
            type: 'Box', position: [0, 0, 0],
            args: [.5, 1.4, .2],

        }]
    }))

    useEffect(() => {
        console.log("useEffect")
        function keypressEvents(e: KeyboardEvent) {
            console.log(e.key)

            if (e.key === "w") {
                state.current = 'Walk'
            }
            if (e.key === "W") {
                state.current = 'Run'
            }
            if (e.key === "t") {
                state.current = 'Tpose'
            }
            if (e.key === "h") {
                state.current = 'Hiphop'
            }

        }
        function keyupEvents(e: KeyboardEvent) {
            if (e.key === "w" || e.key === "t" || e.key === "h") {
                state.current = 'Idle'
            }
        }
        document.addEventListener("keypress", keypressEvents)
        document.addEventListener("keyup", keyupEvents)

        return () => {
            document.removeEventListener("keypress", keypressEvents)
            document.removeEventListener("keyup", keyupEvents)
        }
    }, [])
    function stopAllButOne(notStop: 'Hiphop' | 'Idle' | 'Run' | 'Tpose' | 'Walk') {
        const animations = ['Hiphop', 'Idle', 'Run', 'Tpose', 'Walk']
        if (actions) {
            for (let i = 0; i < animations.length; i++) {
                if (animations[i] === notStop) {
                    continue;
                }
                //@ts-expect-error
                actions[animations[i]].stop();
            }
        }
    }
    useFrame(() => {
        //console.log(clock.getElapsedTime());
        //'Hiphop' | 'Idle' | 'Run' | 'Tpose' | 'Walk'
        if (actions.Idle &&
            actions.Hiphop &&
            actions.Run &&
            actions.Tpose &&
            actions.Walk) {

            switch (state.current) {
                case 'Idle':
                    stopAllButOne('Idle');
                    actions.Idle.play();
                    break;
                case 'Run':
                    stopAllButOne('Run');
                    actions.Run.play();
                    position.current[2] = position.current[2] + 0.1;
                    break;
                case 'Tpose':
                    stopAllButOne('Tpose');
                    actions.Tpose.play();
                    break;
                case 'Walk':
                    stopAllButOne('Walk');
                    actions.Walk.play();
                    position.current[2] = position.current[2] + 0.03;
                    break;
                case 'Hiphop':
                    stopAllButOne('Hiphop');
                    actions.Hiphop.play();
                    break;
            }
            api.position.set(position.current[0], position.current[1], position.current[2])

        }
    })

    return (
        <group
            ref={mergeRefs(group, ref)}
            {...props}
            dispose={null}
        >
            <group rotation={[Math.PI / 2, 0, 0]} position={[0, -.73, 0]} scale={[0.01, 0.01, 0.01]}>
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

