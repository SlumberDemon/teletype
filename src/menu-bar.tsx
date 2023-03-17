import { open, MenuBarExtra } from "@raycast/api";

export default function menu() {
    return (
        <MenuBarExtra icon="https://deta.space/assets/deta.7c76948e.svg" tooltip="Your Pull Requests">
            <MenuBarExtra.Item
                icon="https://deta.space/assets/deta.7c76948e.svg"
                title="Open Canvas"
                shortcut={{ modifiers: ["cmd"], key: "o" }}
                onAction={() => open("https://deta.space")}
            />
        </MenuBarExtra>
    );
}
