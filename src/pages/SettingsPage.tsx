import { useLocation } from "wouter";
import { RoughButton } from "../components/RoughButton";
import { RoughHr } from "../components/RoughHr";
import { Backup, exportData, importData } from "../data/backup";
import { promptAndReadFile, saveAsFile } from "../download";
import { useStorageEstimate } from "../useStorageEstimate";
import { formatSize } from "../util";

const HrMargin = "40px 0";

export function SettingsPage() {
    return (
        <div>
            <h2>App Settings</h2>

            <ExportDataSection />

            <RoughHr style={{ margin: HrMargin }} />

            <ImportDataSection />

            <RoughHr style={{ margin: HrMargin }} />

            <StorageEstimationSection />
        </div>
    );
}

function ExportDataSection() {
    return (
        <section>
            <h3>
                Export Backup{" "}
                <small
                    style={{
                        color: "var(--button-bg-red)",
                    }}>
                    (experimental)
                </small>
            </h3>
            <p>
                Export your data to a file, as a backup or to continue on a
                different device.
            </p>
            <p>Data on this device remains intact.</p>
            <RoughButton
                onClick={async () => {
                    const backup = await exportData();

                    const filename =
                        "FitnessZettel_BACKUP_" +
                        new Date().toISOString() +
                        ".json";

                    const fileContent = JSON.stringify(backup);
                    saveAsFile(fileContent, filename);
                }}>
                Export
            </RoughButton>
        </section>
    );
}

function ImportDataSection() {
    const [_, setLocation] = useLocation();
    return (
        <section>
            <h3>
                Import Backup{" "}
                <small
                    style={{
                        color: "var(--button-bg-red)",
                    }}>
                    (experimental)
                </small>
            </h3>
            <p>Import your data from a previously exported backup.</p>
            <p>
                You should make sure you save a backup of your current data
                first, in case something goes wrong.
            </p>
            <p
                style={{
                    color: "var(--button-bg-red)",
                    textTransform: "uppercase",
                }}>
                Fitness-Zettel Data on this device will be lost!
            </p>
            <RoughButton
                onClick={async () => {
                    try {
                        const fileContent = await promptAndReadFile();
                        if (fileContent.trim() === "") {
                            alert("backup file did not contain any data.");
                            return;
                        }

                        const backup = JSON.parse(fileContent) as Backup;

                        const importSuccessful = await importData(backup);
                        if (importSuccessful) {
                            alert("Backup imported successfully!");
                            setLocation("/");
                        } else {
                            alert(
                                "something unexpected happend, backup import failed."
                            );
                        }
                    } catch (err) {
                        alert(
                            "something unexpected happend, backup import failed.\n" +
                                err
                        );
                    }
                }}>
                Import
            </RoughButton>
        </section>
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
