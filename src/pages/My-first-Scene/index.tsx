import { Canvas } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei'


export function MyFirstScene() {
    return (
        <Canvas>
            <ambientLight intensity={0.2} />
            <directionalLight
                color="white"
                intensity={1}
                position={[2, 1, 4]} />
            <mesh>
                <boxGeometry args={[2, 2, 2]} />
                <meshLambertMaterial color="lightblue" />
            </mesh>
            <OrbitControls />
        </Canvas>
    )
}