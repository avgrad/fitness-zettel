import { useEffect, useState } from "react";

export function useStorageEstimate() {
    const [state, setState] = useState<StorageEstimate>();

    useEffect(() => {
        navigator.storage.estimate().then(setState);
    }, [setState]);

    return state;
}
