export function saveAsFile(content: string, filename: string) {
    const a = document.createElement("a");
    a.setAttribute(
        "href",
        "data:application/json;charset:UTF-8," + encodeURIComponent(content)
    );
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
}

export async function promptAndReadFile(): Promise<string> {
    const input = document.createElement("input") as HTMLInputElement;
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".json");

    return new Promise((resolve, reject) => {
        input.addEventListener(
            "change",
            function () {
                const fr = new FileReader();
                fr.onload = function () {
                    if (typeof fr.result == "string") {
                        resolve(fr.result);
                    } else {
                        reject("file could not be read.");
                    }
                };

                if (input?.files?.[0]) {
                    fr.readAsText(input.files[0]);
                } else {
                    reject("no file selected");
                }
            },
            { once: true }
        );
        input.click();
    });
}
