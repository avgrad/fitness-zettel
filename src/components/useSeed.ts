import { useCallback, useState } from "react";

function randomSeed() {
    return Math.ceil(Number.MAX_SAFE_INTEGER * Math.random());
}

export function useSeed(): [number, () => void] {
    const [seed, setSeed] = useState(randomSeed());
    const reseed = useCallback(() => setSeed(randomSeed), []);
    return [seed, reseed];
}
