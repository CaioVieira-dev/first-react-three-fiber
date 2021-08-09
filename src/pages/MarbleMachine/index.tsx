import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import {
    Physics,
    usePlane,
    Debug,
    useSphere,
    useCompoundBody
} from '@react-three/cannon'
import { useState } from 'react'



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
    const [ref] = useSphere(() => ({ mass: 10, ...props, args: 0.6 }))
    return (
        <mesh receiveShadow castShadow ref={ref}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshNormalMaterial />
        </mesh>
    )
}

function Track1(props: any) {
    const [ref] = useCompoundBody(() => ({
        mass: 0,
        ...props,
        shapes: [
            { type: 'Box', position: [0.9, 0, 0], rotation: [0, 0, 0], args: [1, 2, 4] },
            { type: 'Box', position: [-0.9, 0, 0], rotation: [0, 0, 0], args: [1, 2, 4] },
        ]
    }))

    return (
        <group ref={ref}>
            <mesh position={[0.9, 0, 0]} receiveShadow castShadow >
                <boxGeometry args={[1, 2, 4]} />
                <meshNormalMaterial />
            </mesh>
            <mesh position={[-0.9, 0, 0]} receiveShadow castShadow >
                <boxGeometry args={[1, 2, 4]} />
                <meshNormalMaterial />
            </mesh>

        </group>
    )

}

function Track2(props: any) {
    const [ref] = useCompoundBody(() => ({
        mass: 0,
        ...props,
        shapes: [
            { type: 'Box', position: [0, 0, 0.9], rotation: [0, -Math.PI / 2, 0], args: [1, 2, 4] },
            { type: 'Box', position: [0, 0, -0.9], rotation: [0, -Math.PI / 2, 0], args: [1, 2, 4] },
        ]
    }))

    return (
        <group ref={ref}>
            <mesh rotation={[0, -Math.PI / 2, 0]} position={[0, 0, 0.9]} receiveShadow castShadow >
                <boxGeometry args={[1, 2, 4]} />
                <meshNormalMaterial />
            </mesh>
            <mesh rotation={[0, -Math.PI / 2, 0]} position={[0, 0, -0.9]} receiveShadow castShadow >
                <boxGeometry args={[1, 2, 4]} />
                <meshNormalMaterial />
            </mesh>

        </group>
    )

}
function Lift(props: any) {
    const [ref, api] = useCompoundBody(() => ({
        mass: 0,
        ...props,
        shapes: [
            { type: 'Box', position: [0.9, 1.3, 0], rotation: [-Math.PI / 4, 0, 0], args: [1, 1.8, 1.8] },
            { type: 'Box', position: [0.9, 0, 0], rotation: [0, 0, 0], args: [1, 2.5, 2.5] },
            { type: 'Box', position: [-0.9, 1.3, 0], rotation: [-Math.PI / 4, 0, 0], args: [1, 1.8, 1.8] },
            { type: 'Box', position: [-0.9, 0, 0], rotation: [0, 0, 0], args: [1, 2.5, 2.5] }
        ]
    }))

    useFrame(({ clock }) => {
        const x = props.position[0]
        const y = props.position[1] + (Math.sin(clock.getElapsedTime()) * 2)
        const z = props.position[2]

        api.position.set(x, y, z)

    })

    return (
        <group ref={ref}>
            <group position={[0.9, 0, 0]}>
                <mesh position={[0, 1.3, 0]} rotation={[-Math.PI / 4, 0, 0]}>
                    <boxGeometry args={[1, 1.8, 1.8]} />
                    <meshNormalMaterial />
                </mesh>
                <mesh>
                    <boxGeometry args={[1, 2.5, 2.5]} />
                    <meshNormalMaterial />
                </mesh>
            </group>
            <group position={[-0.9, 0, 0]}>
                <mesh position={[0, 1.3, 0]} rotation={[-Math.PI / 4, 0, 0]}>
                    <boxGeometry args={[1, 1.8, 1.8]} />
                    <meshNormalMaterial />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1, 2.5, 2.5]} />
                    <meshNormalMaterial />
                </mesh>
            </group>
        </group>
    )
}

function Course() {

    return (
        <>
            <Track1 position={[0, 14, -2.6]} rotation={[0.9, 0, 0]} />
            <Track1 position={[0, 12, -1]} rotation={[0.9, 0, 0]} />


            <Track1 position={[0, 10, 1]} rotation={[0, 0, 0]} />


            <Track1 position={[0, 4, 6]} rotation={[0.2, 0, 0]} />


            <Lift position={[0, 3, 8]} />

            <Track1 position={[0, 4.1, 10]} rotation={[-Math.PI / 2 + 0.2, 0, 0]} />

            <Track1 position={[0, 4.5, 13]} rotation={[0.2, 0, 0]} />

            <Track1 position={[0, 4.5, 18]} rotation={[-Math.PI / 2, 0, 0]} />

            <Track2 position={[0, 1.7, 16]} rotation={[0, 0, 0.3]} />

            <Track2 position={[-3, 1, 16]} rotation={[0, 0, 0.2]} />

            <Lift position={[-4, 1, 16]} rotation={[0, -Math.PI / 2, 0]} />

            <Track2 position={[-6, 2, 16]} rotation={[0, 0, -Math.PI / 2 + .1]} />

            <Track2 position={[-8, 1.8, 16]} rotation={[0, 0, -Math.PI / 2 + .1]} />

            <Lift position={[-8, 3, 16]} rotation={[0, -Math.PI / 2, 0]} />

            <Track2 position={[-10, 4, 16]} rotation={[0, 0, -Math.PI / 2 + .1]} />

            <Track2 position={[-12, 3.8, 16]} rotation={[0, 0, -Math.PI / 2 + .1]} />

            <Lift position={[-12, 5, 16]} rotation={[0, -Math.PI / 2, 0]} />

            <Track2 position={[-14, 6, 16]} rotation={[0, 0, -Math.PI / 2 + .1]} />

            <Track2 position={[-18, 9, 16]} rotation={[0, 0, -Math.PI / 2 + .1]} />

            <Track1 position={[-16, 5, 16]} rotation={[-0.2, 0, 0]} />

            <Lift position={[-16, 4.8, 14.6]} />

            <Track1 position={[-16, 5, 12.7]} rotation={[-Math.PI / 2 - 0.2, 0, 0]} />

            <Track1 position={[-16, 4.7, 11]} rotation={[-Math.PI / 2 - 0.1, 0, 0]} />

            <Lift position={[-16, 5.9, 11]} />

            <Track1 position={[-16, 7, 9]} rotation={[-Math.PI / 2 - 0.2, 0, 0]} />

            <Track1 position={[-16, 6.7, 7]} rotation={[-Math.PI / 2 - 0.1, 0, 0]} />

            <Lift position={[-16, 8, 7.4]} />

            <Track1 position={[-16, 9, 5.5]} rotation={[-Math.PI / 2 - 0.2, 0, 0]} />

            <Track1 position={[-16, 8.7, 4]} rotation={[-Math.PI / 2 - 0.1, 0, 0]} />

            <Lift position={[-16, 10, 4]} />

            <Track1 position={[-16, 11, 2]} rotation={[-Math.PI / 2 - 0.2, 0, 0]} />

            <Track1 position={[-16, 10.7, 0]} rotation={[-Math.PI / 2 - 0.1, 0, 0]} />

            <Track1 position={[-16, 13, -4]} rotation={[-Math.PI / 2, 0, 0]} />

            <Track2 position={[-16, 10, -2]} rotation={[0, 0, -0.2]} />

            <Track2 position={[-13, 8.4, -2]} rotation={[0, 0, -Math.PI / 2 - 0.1]} />

            <Lift position={[-13, 9.7, -2]} rotation={[0, -Math.PI / 2, 0]} />

            <Track2 position={[-11, 11, -2]} rotation={[0, 0, -Math.PI / 2 - 0.1]} />

            <Track2 position={[-9, 10.8, -2]} rotation={[0, 0, -Math.PI / 2 - 0.1]} />

            <Lift position={[-9.2, 12, -2]} rotation={[0, -Math.PI / 2, 0]} />

            <Track2 position={[-7, 13, -2]} rotation={[0, 0, -Math.PI / 2 - 0.1]} />

            <Lift position={[-5, 13, -2]} rotation={[0, -Math.PI / 2, 0]} />

            <Track2 position={[-5, 12.8, -2]} rotation={[0, 0, -Math.PI / 2 - 0.1]} />

            <Track2 position={[-3, 14.4, -2]} rotation={[0, 0, -Math.PI / 2 - 0.1]} />
            <Track2 position={[-2.5, 14.35, -2]} rotation={[0, 0, -Math.PI / 2 - 0.1]} />
        </>

    )
}


export function MarbleMachine() {
    const [marbles, setMarbles] = useState(1)

    return (<>
        <button onClick={() => setMarbles(marbles + 1)}>Adicionar</button>
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


                    {new Array(marbles).fill(null).map((_, index) => <Marble key={`o${index}`} position={[0, 15, 0]} />)}
                    <Course />
                    <Plane rotation={[(-Math.PI / 2), 0, 0]} />

                </Debug>
            </Physics>

            <OrbitControls />
        </Canvas>
    </>
    )
}