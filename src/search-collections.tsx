import { Action, ActionPanel, Form, Icon, List, showToast, Toast, Clipboard, showHUD } from "@raycast/api";
import { spaceCient, useSpace } from "./hooks/use-space";
import { useForm, FormValidation } from "@raycast/utils";

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
          <Action.OpenInBrowser url={`https://deta.space/collections/${props.collection.id}`} />
        </ActionPanel.Section>
        <ActionPanel.Section>
          <Action.CopyToClipboard title="Copy Link" content={`https://deta.space/collections/${props.collection.id}`} shortcut={{ modifiers: ["cmd"], key: "." }} />
        </ActionPanel.Section>
        <ActionPanel.Section>
          <Action.Push icon={Icon.Key} title="Generate Data Key" target={<GenerateDataKeyForm collectionID={props.collection.id} />} />
        </ActionPanel.Section>
      </ActionPanel>
    }
  />
}

type KeyFormValue = {
  name: string;
}

type CreateKeyResponse = {
  name: string;
  created_at: string;
  value: string;
}

function GenerateDataKeyForm(props: { collectionID: string }) {
  const { handleSubmit, itemProps } = useForm<KeyFormValue>({
    async onSubmit(values) {
      try {
        const res = await spaceCient.post<CreateKeyResponse>(`/collections/${props.collectionID}/keys`, values)
        await Clipboard.copy(res.value)
        await showHUD(`Key ${values.name} generated and copied to clipboard`)
      } catch (err) {
        showToast(Toast.Style.Failure, "Failed to generate key", (err as Error).message)
      }
    },
    validation: {
      name: FormValidation.Required,
    }
  });

  return <Form actions={
    <ActionPanel>
      <Action.SubmitForm title="Generate Key" shortcut={{ modifiers: ["cmd", "shift"], key: "k" }} onSubmit={handleSubmit} />
    </ActionPanel>
  }>
    <Form.TextField title="Name" placeholder="key name" {...itemProps.name} />
  </Form>
}
