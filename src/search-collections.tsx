// Temp layout idea/guide
// Collections endpoint: https://deta.space/api/v0/collections // needs auth

import { useEffect, useState } from "react";
import { Action, ActionPanel, List, Color } from "@raycast/api";

const items = ["Test-"];

export default function Command() {
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
      navigationTitle="Collections"
    >
      {filteredList.map((item) => (
        <List.Item
          key={item}
          title={item}
          subtitle="c4dc3643-1980-4e9d-9fcc-1074a86b2139"
          accessories={[
            { tag: { value: "migrated", color: Color.Magenta } }, // if migrated: True, show this, else don't show // also maybe use #0885C2 for colour because that what deta builder uses
            { tag: new Date("2021-09-30T11:15:54Z") } // created_at // maybe change date format, it currently only shows the year
          ]}
          actions={
            <ActionPanel>
            <ActionPanel.Section>
              <Action.OpenInBrowser title="Open in Browser" url="https://deta.space/collections/{idhere}" />
            </ActionPanel.Section>
            <ActionPanel.Section>
              <Action.CopyToClipboard
                title="Copy Link"
                content={`https://deta.space/collections/{idhere}`}
                shortcut={{ modifiers: ["cmd"], key: "." }}
              />
            </ActionPanel.Section>
          </ActionPanel>
          }
        />
      ))}
    </List>
  );
}