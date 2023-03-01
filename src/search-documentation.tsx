import { ActionPanel, List, Action } from "@raycast/api";
import Doc from "./documentation/doc";

export default function Command() {
  return (
    <List navigationTitle="Docs">
      {Object.entries(Doc).map(([section, items]) => (
        <List.Section title={section} key={section}>
          {items.map((item) => {
            return (
              <List.Item
                key={item.url}
                title={item.title}
                actions={
                  <ActionPanel title={item.url}>
                    <Action.OpenInBrowser url={item.url} />
                    <Action.CopyToClipboard content={item.url} title="Copy URL" />
                  </ActionPanel>
                }
              />
            );
          })}
        </List.Section>
      ))}
    </List>
  );
}