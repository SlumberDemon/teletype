import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { useSpace } from "./hooks/use-space";

type Collection = {
  id: string;
  name: string;
  created_at: string;
  migrated?: boolean;
}

type CollectionResponse = {
  collections: Collection[]
}

export default function SearchCollections() {
  const { data, isLoading } = useSpace<CollectionResponse>("/collections");

  return (
    <List
      isLoading={isLoading}
      navigationTitle="Collections"
    >
      {data?.collections.map((collection) => (
        <CollectionList key={collection.id} collection={collection} />
      ))}
    </List>
  )
}

function CollectionList(props: { collection: Collection }) {
  return <List.Item
    key={props.collection.id}
    icon={Icon.HardDrive}
    title={props.collection.name}
    subtitle={props.collection.id}
    accessories={[
      { tag: { value: "migrated", color: "#ED3FA2" } },  // use props.collection.migrated // if its true show "migrated" // if its false show nothing
      { tag: new Date(props.collection.created_at) } // maybe change date format
    ]}
    actions={
      <ActionPanel>
        <ActionPanel.Section>
          <Action.Push icon={Icon.MagnifyingGlass} title="Browse Collection" target={<CollectionList collection={props.collection} />} />
          <Action.OpenInBrowser url={`https://deta.space/collections/${props.collection.id}`} />
        </ActionPanel.Section>
        <ActionPanel.Section>
          <Action.CopyToClipboard title="Copy Link" content={`https://deta.space/collections/${props.collection.id}`} shortcut={{ modifiers: ["cmd"], key: "." }} />
        </ActionPanel.Section>
      </ActionPanel>
    }
  />
}
