import { Action, ActionPanel, Icon, List, Color } from "@raycast/api";
import { useSpace } from "./hooks/use-space";
import RevisionList from "./builder/revisions";
import Release from "./builder/releases";
import BuildList from "./builder/builds";
import { Project } from "./types/types";

type ProjectResponse = {
  apps: Project[];
};

export default function SearchProjects() {
  const { data, isLoading } = useSpace<ProjectResponse>("/apps");

  return (
    <List isLoading={isLoading} navigationTitle="Builder">
      {data?.apps.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </List>
  );
}

function Project(props: { project: Project }) {
  return (
    <List.Item
      key={props.project.id}
      icon={Icon.Hammer}
      title={props.project.name}
      subtitle={props.project.id}
      accessories={[
        { tag: { value: props.project.status, color: Color.Green } },
        // { tag: new Date(props.project.created_at) }
      ]}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.OpenInBrowser title="Open in Builder" url={`https://deta.space/builder/${props.project.id}`} />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action.Push icon={Icon.Hammer} title="View Builds" target={<BuildList project={props.project} />} shortcut={{ modifiers: ["cmd"], key: "b" }} />
            <Action.Push icon={Icon.List} title="View Revisions" target={<RevisionList project={props.project} />} shortcut={{ modifiers: ["cmd"], key: "r" }} />
            <Action.Push icon={Icon.Globe} title="View Releases" target={<Release project={props.project} />} shortcut={{ modifiers: ["cmd", "shift"], key: "r" }} />
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
  );
}
