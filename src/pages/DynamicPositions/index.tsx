import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'

function UpAndDown() {
    const myMesh = useRef<THREE.Mesh>(null);



    useFrame(({ clock }) => {
        myMesh.current!.position.y = Math.sin(clock.getElapsedTime()) * 2

    });

    return (
        <mesh ref={myMesh}>
            <boxBufferGeometry />
            <meshPhongMaterial color="royalblue" />
        </mesh>
    );
}

export function DynamicPositions() {
    return (
        <Canvas>
            <UpAndDown />
            <ambientLight intensity={0.1} />
            <directionalLight />
        </Canvas>
    )
}