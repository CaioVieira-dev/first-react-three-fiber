import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import {
    Physics,
    usePlane,
    Debug,
    useSphere,
    useBox
} from '@react-three/cannon'


function Plane(props: any) {
    const [ref] = usePlane(() => ({ type: 'Static', ...props }))
    return (
        <mesh receiveShadow ref={ref}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="hsl(220,40%,40%)" />
        </mesh>
    )
}

function Marble(props: any) {
    const [ref] = useSphere(() => ({ mass: 10, ...props, args: 0.5 }))
    return (
        <mesh receiveShadow castShadow ref={ref}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshNormalMaterial />
        </mesh>
    )
}

function Track(props: any) {
    const [ref] = useBox(() => ({ mass: 100, ...props, args: [1, 2, 4] }))

    return (
        <mesh receiveShadow castShadow ref={ref}>
            <boxGeometry args={[1, 2, 4]} />
            <meshNormalMaterial />
        </mesh>
    )

}
function Block(props: any) {
    const [ref] = useBox(() => ({ mass: 100, ...props, args: [1, 0.5, 1] }))
    return (
        <mesh receiveShadow castShadow ref={ref}>
            <boxGeometry args={[1, 0.5, 1]} />
            <meshNormalMaterial />
        </mesh>
    )

}

export function MarbleMachine() {


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
            <Physics iterations={6}>

                <Debug scale={1.1} color="black">

                    <Marble position={[0, 6, 0]} />
                    <Track position={[0.75, 2, 0]} />
                    <Track position={[-0.75, 2, 0]} />
                    <Track position={[0.75, 1.5, -4]} />
                    <Track position={[-0.75, 1.5, -4]} />
                    <Track position={[0.75, 1.5, -4 - 4]} />
                    <Track position={[-0.75, 1.5, -4 - 4]} />
                    <Track position={[0.75, 1.5, -4 - 8]} />
                    <Track position={[-0.75, 1.5, -4 - 8]} />

                    <Block position={[0.75, 0.5, 2]} />
                    <Block position={[-0.75, 0.5, 2]} />
                    <Block position={[0.75, 0.5, -1.6]} />
                    <Block position={[-0.75, 0.5, -1.6]} />
                    <Block position={[0.75, 1.1, 2]} />
                    <Block position={[-0.75, 1.1, 2]} />

                    <Plane rotation={[(-Math.PI / 2), 0, 0]} />

                </Debug>
            </Physics>

            <OrbitControls />
        </Canvas>
    )
}