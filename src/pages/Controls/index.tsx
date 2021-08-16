import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Physics, Debug, usePlane, useBox, BoxProps } from '@react-three/cannon'
import { useEffect, useRef } from 'react'

function Plane(props: any) {
    const [ref] = usePlane(() => ({ type: 'Static', ...props, friction: 1 }))
    return (
        <mesh receiveShadow ref={ref}>
            <planeGeometry args={[8, 8]} />
            <meshStandardMaterial color="hsl(200,100%,70%)" />
        </mesh>
    )
}
function Box(props: BoxProps) {
    const Dir = useRef<"front" | "back" | 'left' | 'right' | 'stop'>('stop')
    const curPos = useRef([0, 0, 0])
    const [ref, api] = useBox(() => ({

        mass: 1,
        ...props,
        position: [0, 0, 0], rotation: [0, 0, 0], args: [1, 1, 1], fixedRotation: true
    }
    ))
    useEffect(() => {
        function keyBinding(e: KeyboardEvent) {
            if (e.code === "KeyA") {
                Dir.current = 'left';
            }
            if (e.code === 'KeyD') {
                Dir.current = 'right';

            }
            if (e.code === 'KeyW') {
                Dir.current = 'front';

            }
            if (e.code === 'KeyS') {
                Dir.current = 'back';

            }
            if (e.code === 'Space') {
                api.velocity.set(0, 10, 0)
            }
        }
        function stop() {
            Dir.current = 'stop'
        }

        document.addEventListener('keydown', keyBinding)
        document.addEventListener('keyup', stop)
        api.position.subscribe(p => curPos.current = p) //sync position variable
        return () => {
            document.removeEventListener('keypress', keyBinding)
            document.removeEventListener('keyup', stop)
        }
    }, [api.position, api.velocity])

    useFrame(() => {
        switch (Dir.current) {
            case "front":
                curPos.current[0] += 0.1;
                api.position.set(curPos.current[0], curPos.current[1], curPos.current[2])
                break;
            case "back":
                curPos.current[0] -= 0.1;
                api.position.set(curPos.current[0], curPos.current[1], curPos.current[2])
                break;
            case "right":
                curPos.current[2] += 0.1;
                api.position.set(curPos.current[0], curPos.current[1], curPos.current[2])
                break;
            case "left":
                curPos.current[2] -= 0.1;
                api.position.set(curPos.current[0], curPos.current[1], curPos.current[2])
                break;

        }

    })
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
            <Physics iterations={6} gravity={[0, -10, 0]} >
                <Debug scale={1.1} color="black">
                    <Plane rotation={[-Math.PI / 2, 0, 0]} />
                    <Box position={[1.5, 2, 1]} />

                </Debug>
            </Physics>
            <OrbitControls />
            <Stars />
        </Canvas>
    )

}