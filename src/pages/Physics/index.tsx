import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics, Debug, usePlane, useCompoundBody } from '@react-three/cannon'

function Plane(props: any) {
    const [ref] = usePlane(() => ({ type: 'Static', ...props }))
    return (
        <mesh receiveShadow ref={ref}>
            <planeGeometry args={[8, 8]} />
            <meshStandardMaterial color="hsl(200,100%,70%)" />
        </mesh>
    )
}
function CompoundBody(props: any) {
    const [ref] = useCompoundBody(() => ({
        mass: 10,
        ...props,
        shapes: [
            { type: 'Box', position: [0, 0, 0], rotation: [0, 0, 0], args: [1, 1, 1] },
            { type: 'Sphere', position: [1, 0, 0], rotation: [0, 0, 0], args: [0.65] }
        ]
    }))
    return (
        <group ref={ref}>
            <mesh receiveShadow castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshNormalMaterial />
            </mesh>
            <mesh receiveShadow castShadow position={[1, 0, 0]}>
                <sphereGeometry args={[0.65, 16, 16]} />
                <meshNormalMaterial />
            </mesh>
        </group>
    )
}


export function PhysicsPage() {
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
                    <CompoundBody position={[1.5, 5, 0.5]} rotation={[1.25, 0, 0]} />
                    <CompoundBody position={[2.5, 3, 0.25]} rotation={[1.25, -1.25, 0]} />
                </Debug>
            </Physics>
            <OrbitControls />
        </Canvas>
    )

}