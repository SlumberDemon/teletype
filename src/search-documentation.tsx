import { ActionPanel, Action, List } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useState } from "react";
import { URLSearchParams } from "node:url";

export default function SearchDocs() {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useFetch(
    "https://teletype.deta.dev/search?" +
      new URLSearchParams({ q: searchText.length === 0 ? "Getting started" : searchText }),
    {
      parseResponse: parseFetchResponse,
    }
  );

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      navigationTitle="Docs"
      searchBarPlaceholder="Search..."
      throttle
    >
      <List.Section title="Results" subtitle={data?.length + ""}>
        {data?.map((searchResult) => (
          <SearchListItem key={searchResult.id} searchResult={searchResult} />
        ))}
      </List.Section>
    </List>
  );
}

function SearchListItem({ searchResult }: { searchResult: SearchResult }) {
  return (
    <List.Item
      id={searchResult.id}
      title={searchResult.name}
      subtitle={searchResult.path}
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
            path: string;
            url: string;
            anchor: string;
            id: string;
            fragments: string;
        }[];
      }
    | { code: string; message: string };

  if (!response.ok || "message" in json) {
    throw new Error("message" in json ? json.message : response.statusText)

  }

  return json.results.map((result) => {
    return {
      id: result.id,
      name: result.name,
      path: result.path,
      url: result.url,
      anchor: result.anchor,
      fragments: result.fragments
    } as SearchResult;
  });
}

interface SearchResult {
  id: string
  name: string;
  path: string;
  url: string;
  anchor: string;
  fragments: string;
}
