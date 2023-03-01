import { ActionPanel, Action, List, Image } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useState } from "react";
import { URLSearchParams } from "node:url";

export default function SearchDiscovery() {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useFetch(
    "https://teletype.deta.dev/discovery?" +
      new URLSearchParams({ q: searchText.length === 0 ? "~" : searchText }),
    {
      parseResponse: parseFetchResponse,
    }
  );

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search space apps..."
      throttle
    >
      <List.Section title="Results" subtitle={data?.length + ""}>
        {data?.map((searchResult) => (
          <SearchListItem key={searchResult.name} searchResult={searchResult} />
        ))}
      </List.Section>
    </List>
  );
}

function SearchListItem({ searchResult }: { searchResult: SearchResult }) {
  return (
    <List.Item
      title={searchResult.name}
      subtitle={searchResult.description}
      accessoryTitle={searchResult.username}
      icon={{ source: `${searchResult.icon}`, mask: Image.Mask.RoundedRectangle }}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.OpenInBrowser title="Open in Browser" url={searchResult.url} />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action.CopyToClipboard
              title="Copy Url"
              content={`${searchResult.url}`}
              shortcut={{ modifiers: ["cmd"], key: "." }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

async function parseFetchResponse(response: Response) {
  const json = (await response.json()) as
    | {
        results: {
            name: string;
            description: string;
            username: string;
            link: string;
            icon: string;
        }[];
      }
    | { code: string; message: string };

  if (!response.ok || "message" in json) {
    throw new Error("message" in json ? json.message : response.statusText)

  }

  return json.results.map((result) => {
    return {
      name: result.name,
      description: result.description,
      username: result.username,
      url: result.link,
      icon: result.icon,
    } as SearchResult;
  });
}

interface SearchResult {
  name: string;
  description: string;
  username: string;
  url: string;
  icon: string;
}
