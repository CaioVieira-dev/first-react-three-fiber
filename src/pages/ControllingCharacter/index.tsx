import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import {
    Physics,
    usePlane,
    Debug,
} from '@react-three/cannon'


import { GirlModel } from '../../components/GirlModel'

function Plane() {
    const [ref] = usePlane(() => ({ args: [10, 10], rotation: [-Math.PI / 2, 0, 0] }))
    return (
        <mesh ref={ref} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="hsl(200,40%,50%)" />
        </mesh>
    )
}

export function ControllingCharacter() {
    return (
        <Canvas shadows camera={{ position: [1, 2, 2], fov: 50 }}>
            <Physics iterations={6}>
                <Debug scale={1.1} color="black">

                    <Suspense fallback={null}>
                        <GirlModel />
                    </Suspense>
                    <Plane />
                </Debug>

            </Physics>
            <ambientLight intensity={0.3} />
            <directionalLight position={[-5, 3, 5]} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
            <OrbitControls />
        </Canvas>
    )
}