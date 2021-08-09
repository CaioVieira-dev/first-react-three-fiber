import { Canvas, useFrame } from '@react-three/fiber'
//import { Mesh } from 'three'
//import { useRef, useState } from 'react'
import { OrbitControls, Stars } from '@react-three/drei'
import { Physics, Debug, usePlane, useBox, useSphere } from '@react-three/cannon'

function Box(props: any) {
    const [ref, api] = useBox(() => ({ mass: -10, ...props, args: [1, 2, 1], fixedRotation: true }))

    useFrame(({ clock }) => {
        api.position.set(Math.sin(clock.getElapsedTime()) * 2, 2, 0)
    })

    return (
        <mesh receiveShadow castShadow ref={ref}>
            <boxGeometry args={[1, 2, 1]} />
            <meshNormalMaterial />
        </mesh>
    )
}

function Ball(props: any) {
    const [ref] = useSphere(() => ({ mass: 10, ...props, args: 1 }))
    return <mesh receiveShadow castShadow ref={ref}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshNormalMaterial />
    </mesh>
}


function Plane(props: any) {
    const [ref] = usePlane(() => ({ type: 'Static', ...props }))
    return (
        <mesh receiveShadow ref={ref} >
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="hsl(220,40%,40%)" />
        </mesh>
    )
}

export function DynamicPhysics() {

    return (
        <Canvas>
            <ambientLight intensity={0.2} />
            <directionalLight
                color="white"
                intensity={1}
                position={[2, 1, 4]} />
            <Physics iterations={6}>
                <Debug scale={1.1} color="black">


                    <Box position={[0, 2, 0]} />
                    <Ball position={[2, 1.5, 0]} />

                    <Plane rotation={[-Math.PI / 2, 0, 0]} />
                </Debug>
            </Physics>

            <OrbitControls />
            <Stars />
        </Canvas>)
}