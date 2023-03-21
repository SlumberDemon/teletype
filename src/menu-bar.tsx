import { open, MenuBarExtra } from "@raycast/api";

export default function menu() {
    return (
        <MenuBarExtra icon="https://deta.space/assets/deta.7c76948e.svg" tooltip="Your Pull Requests">
            <MenuBarExtra.Item
                title="Open Canvas"
                shortcut={{ modifiers: ["cmd"], key: "." }}
                onAction={() => open("https://deta.space")}
            />
            <MenuBarExtra.Section>
                <MenuBarExtra.Item
                    icon="https://deta.space/assets/legacy_cloud.43f2c117.webp"
                    title="Legacy Cloud"
                    shortcut={{ modifiers: ["cmd"], key: "l" }}
                    onAction={() => open("https://deta.space/legacy")}
                />
                <MenuBarExtra.Item
                    icon="https://deta.space/assets/builder.9b3437f3.webp"
                    title="Builder"
                    shortcut={{ modifiers: ["cmd"], key: "b" }}
                    onAction={() => open("https://deta.space/builder")}
                />
                <MenuBarExtra.Item
                    icon="https://deta.space/assets/collections.9c538cc2.png"
                    title="Collections"
                    shortcut={{ modifiers: ["cmd"], key: "c" }}
                    onAction={() => open("https://deta.space/collections")}
                />
                <MenuBarExtra.Item
                    icon="https://deta.space/assets/docs.36387e5a.webp"
                    title="Docs"
                    shortcut={{ modifiers: ["cmd"], key: "d" }}
                    onAction={() => open("https://deta.space/docs")}
                />
                <MenuBarExtra.Item
                    icon="https://deta.space/assets/manual.a2e80d80.webp"
                    title="Manual"
                    shortcut={{ modifiers: ["cmd"], key: "m" }}
                    onAction={() => open("https://deta.space/manual")}
                />
                <MenuBarExtra.Item
                    icon="https://deta.space/assets/discovery.b6035544.webp"
                    title="Discovery"
                    shortcut={{ modifiers: ["cmd"], key: "d" }}
                    onAction={() => open("https://deta.space/discovery")}
                />
            </MenuBarExtra.Section>
        </MenuBarExtra>
    );
}
