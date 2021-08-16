import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Physics, Debug, usePlane, useBox } from '@react-three/cannon'

function Plane(props: any) {
    const [ref] = usePlane(() => ({ type: 'Static', ...props }))
    return (
        <mesh receiveShadow ref={ref}>
            <planeGeometry args={[8, 8]} />
            <meshStandardMaterial color="hsl(200,100%,70%)" />
        </mesh>
    )
}
function Box(props: any) {
    const [ref, api] = useBox(() => ({
        mass: 10,
        ...props,
        position: [0, 0, 0], rotation: [0, 0, 0], args: [1, 1, 1]
    }
    ))



    return (
        <mesh ref={ref} receiveShadow castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshNormalMaterial />
        </mesh>
    )
}


export function Controls() {
    return (
        <Canvas
            dpr={[1, 2]}
            shadows
            gl={{ alpha: false }}
            camera={{ position: [-2, 1, -7], fov: 50 }} >
            <hemisphereLight intensity={1} />
            <spotLight
                position={[5, 5, 5]}
                angle={0.75}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize-width={1028}
                shadow-mapSize-height={1028} />
            <Physics iterations={6} >
                <Debug scale={1.1} color="black">
                    <Plane rotation={[-Math.PI / 2, 0, 0]} />
                    <Box position={[1.5, 5, 0.5]} rotation={[1.25, 0, 0]} />

                </Debug>
            </Physics>
            <OrbitControls />
            <Stars />
        </Canvas>
    )

}