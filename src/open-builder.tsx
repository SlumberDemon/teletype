// Temp layout, not finished

import { useEffect, useState } from "react";
import { Action, ActionPanel, List } from "@raycast/api";

const items = ["Palettes"];

export default function SearchBuilder() {
  const [searchText, setSearchText] = useState("");
  const [filteredList, filterList] = useState(items);

  useEffect(() => {
    filterList(items.filter((item) => item.includes(searchText)));
  }, [searchText]);

  return (
    <List
      filtering={false}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search..."
      navigationTitle="Builder"
    >
      {filteredList.map((item) => (
        <List.Item
          key={item}
          title={item}
          subtitle="c4dc3643-1980-4e9d-9fcc-1074a86b2139"
          accessoryTitle="active" // status
          actions={
            <ActionPanel>
            <ActionPanel.Section>
              <Action.OpenInBrowser title="Open in Browser" url="https://deta.space" />
            </ActionPanel.Section>
            <ActionPanel.Section>
              <Action.CopyToClipboard
                title="Copy Url"
                content={`https://deta.space`}
                shortcut={{ modifiers: ["cmd"], key: "c" }}
              />
            </ActionPanel.Section>
            <ActionPanel.Section>
              <Action.CopyToClipboard
                title="Copy project id"
                content={`c4dc3643-1980-4e9d-9fcc-1074a86b2139`}
                shortcut={{ modifiers: ["cmd"], key: "i" }}
              />
            </ActionPanel.Section>
          </ActionPanel>
          }
        />
      ))}
    </List>
  );
}