import { useStorageEstimate } from "../useStorageEstimate";
import { formatSize } from "../util";

export function SettingsPage() {
    return (
        <div>
            <h2>App Settings</h2>

            <section>
                <p>
                    <small>
                        <strong>Info</strong>: In the future, there might be
                        more app settings. For the moment, you can only see how
                        much space Fitness Zettel uses on your device.
                    </small>
                </p>
            </section>

            <StorageEstimationSection />
        </div>
    );
}

/**
 * @param {{progress: number}} props progress ranging 0-1
 */
function ProgressBar({ progress }: { progress: number }) {
    if (progress < 0 || progress > 1) {
        throw new Error(
            "Progress value for ProgressBar is supposed to range from 0-1 (inclusive)"
        );
    }
    return (
        <div
            style={{
                display: "flex",
                backgroundColor: "var(--button-bg-gray)",
                marginTop: 8,
                height: 22,
                borderRadius: 8,
                overflow: "hidden",
            }}>
            <div
                style={{
                    backgroundColor: "var(--button-bg-green)",
                    flex: progress,
                }}></div>
        </div>
    );
}

function StorageEstimationSection() {
    const storageEstimate = useStorageEstimate();
    const usedPercentage0To1 =
        (storageEstimate?.usage ?? 0) / (storageEstimate?.quota ?? 100);
    return (
        <section>
            <h3>Storage usage estimation</h3>
            {storageEstimate && storageEstimate.quota && storageEstimate.usage && (
                <div>
                    <p>
                        Fitness Zettel uses approximately{" "}
                        {(usedPercentage0To1 * 100).toFixed(2)}%
                    </p>
                    <small>
                        ({formatSize(storageEstimate.usage)} of{" "}
                        {formatSize(storageEstimate.quota)})
                    </small>
                    <ProgressBar progress={usedPercentage0To1} />
                </div>
            )}
        </section>
    );
}
