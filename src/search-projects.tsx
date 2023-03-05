import { Action, ActionPanel, Icon, List, Color } from "@raycast/api";
import { useSpace } from "./hooks/use-space";
import OpenProject from "./builder/project";

type Project = {
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

type ProjectResponse = {
  apps: Project[]
}

export default function SearchProjects() {
  const { data, isLoading } = useSpace<ProjectResponse>("/apps");

  return (
    <List
      isLoading={isLoading}
      navigationTitle="Builder"
    >
      {data?.apps.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </List>
  );
}

function Project(props: { project: Project }) {
  return <List.Item
    key={props.project.id}
    icon={Icon.Hammer}
    title={props.project.name}
    subtitle={props.project.id}
    accessories={[
      { tag: { value: props.project.status, color: Color.Green } }
      // { tag: new Date(props.project.created_at) }
    ]}
    actions={
      <ActionPanel>
        <ActionPanel.Section>
          <Action.Push icon={Icon.AppWindowList} title="Open Project" target={<OpenProject project={props.project} />} />
          <Action.OpenInBrowser title="Open in Builder" url={`https://deta.space/builder/${props.project.id}`} />
        </ActionPanel.Section>
        <ActionPanel.Section>
          <Action.CopyToClipboard
            title="Copy Link"
            content={`https://deta.space/builder/${props.project.id}`}
            shortcut={{ modifiers: ["cmd"], key: "c" }}
          />
          <Action.CopyToClipboard
            title="Copy Project ID"
            content={props.project.id}
            shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
          />
        </ActionPanel.Section>
      </ActionPanel>
    }
  />
}
