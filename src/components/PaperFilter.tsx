export interface PaperFilterProps {
    filterId: string;
    lightAzimuth?: number;
    lightElevation?: number;
    lightSurfaceScale?: number;
    baseFrequency?: number;
    octaves?: number;
    seed?: number;
}

export function PaperFilter({
    filterId,
    lightAzimuth = 45,
    lightElevation = 60,
    lightSurfaceScale = 2,
    baseFrequency = 0.02,
    octaves = 5,
    seed = 1,
}: PaperFilterProps) {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0"
                height="0"
                id="papersvg">
                <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency={baseFrequency}
                        result="noise"
                        seed={seed}
                        numOctaves={octaves}
                    />

                    <feDiffuseLighting
                        in="noise"
                        lightingColor="white"
                        result="paperTexture"
                        surfaceScale={lightSurfaceScale}>
                        <feDistantLight
                            azimuth={lightAzimuth}
                            elevation={lightElevation}
                        />
                    </feDiffuseLighting>

                    <feMerge>
                        <feMergeNode in="paperTexture"></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
            </svg>

            <div className="paper-bg"></div>
        </>
    );
}
