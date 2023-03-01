import { ActionPanel, Action, List } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useState } from "react";

type SearchResult = {
  id: string;
  name: string;
  path: string;
  url: string;
  anchor: string;
  fragments: string;
};

type SearchSection = {
  title: string;
  results: SearchResult[];
};

const searchEndpoint = "https://teletype.deta.dev/search";

export default function SearchDocs() {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useFetch(`${searchEndpoint}?q=${encodeURIComponent(searchText)}`, {
    parseResponse: parseFetchResponse,
    keepPreviousData: true,
  });

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchText={searchText}
      navigationTitle="Docs"
      searchBarPlaceholder="Search Docs..."
      throttle
    >
      {data?.map((section) => (
        <List.Section key={section.title} title={section.title}>
          {section.results.map((searchResult) => (
            <SearchListItem key={searchResult.id} searchResult={searchResult} />
          ))}
        </List.Section>
      ))}
    </List>
  );
}

function SearchListItem({ searchResult }: { searchResult: SearchResult }) {
  return (
    <List.Item
      id={searchResult.id}
      title={searchResult.name}
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
    throw new Error("message" in json ? json.message : response.statusText);
  }

  const sections: Record<string, SearchSection> = {};
  for (const result of json.results) {
    const sectionTitle = result.fragments.split(" > ").slice(0, -1).join(" > ");
    if (!sections[sectionTitle]) {
      sections[sectionTitle] = {
        title: sectionTitle,
        results: [result],
      };
    } else {
      sections[sectionTitle].results.push(result);
    }
  }

  return Object.values(sections);
}
