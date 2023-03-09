import { Action, MenuBarExtra } from "@raycast/api";

export default function Command() {
    return (
        <MenuBarExtra icon="https://deta.space/assets/deta.7c76948e.svg" tooltip="Your Pull Requests">
            <MenuBarExtra.Item
                title="Open Canvas"
                shortcut={{ modifiers: ["cmd"], key: "o" }}
                onAction={() => {
                    <Action.OpenInBrowser url="https://deta.space" /> // Doesn't work lol
                }}
            />
        </MenuBarExtra>
    );
}
