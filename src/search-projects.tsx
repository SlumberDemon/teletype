// Temp layout, not finished

import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { useSpace } from "./hooks";

type Project = {
  id: string;
  name: string;
  status: string;
}

type ProjectResponse = {
  apps: Project[]
}

export default function SearchProjects() {
  const { data, isLoading } = useSpace<ProjectResponse>("/apps");

  return (
    <List
      isLoading={isLoading}
    >
      {data?.apps.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </List>
  );
}

function Project(props: { project: Project }) {
  const projectUrl = `https://deta.space/builder/${props.project.id}`
  return <List.Item
    key={props.project.id}
    icon={Icon.Hammer}
    title={props.project.name}
    actions={
      <ActionPanel>
        <ActionPanel.Section>
          <Action.OpenInBrowser title="Open in Builder" url={projectUrl} />
        </ActionPanel.Section>
        <ActionPanel.Section>
          <Action.CopyToClipboard
            title="Copy Project Link"
            content={projectUrl}
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
