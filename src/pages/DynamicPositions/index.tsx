import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef, useState } from 'react'

function UpAndDown(props: any) {
    const myMesh = useRef<THREE.Mesh>(null);
    const time = useRef(0)



    useFrame(({ clock }) => {
        if (!props.stop) {
            time.current += 0.03
            myMesh.current!.position.y = Math.sin(time.current) * 2
        }


    });

    return (
        <mesh ref={myMesh}>
            <boxBufferGeometry />
            <meshPhongMaterial color="royalblue" />
        </mesh>
    );
}


export function DynamicPositions() {
    const [stop, setStop] = useState(false)
    return (<>
        <button onClick={() => setStop(!stop)}>parar</button>
        <Canvas>
            <UpAndDown stop={stop} />
            <ambientLight intensity={0.1} />
            <directionalLight />
        </Canvas>
    </>
    )
}