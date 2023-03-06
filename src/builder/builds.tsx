import { Color, List } from "@raycast/api";
import { parseISO } from "date-fns";
import { useSpace } from "../hooks/use-space";

type Project = {
  id: string;
  name: string;
  status: string;
};

type Build = {
  id: string;
  tag: string;
  app_id: string;
  status: BuildStatus;
  created_at: string;
  updated_at: string;
};

type BuildStatus = "complete" | "pending" | "internal-error" | "failed";

type BuildsResponse = {
  builds: Build[];
};

export default function BuildList(props: { project: Project }) {
  const { data, isLoading } = useSpace<BuildsResponse>(`/builds?app_id=${props.project.id}`);

  return (
    <List isLoading={isLoading} navigationTitle={props.project.name}>
      {data?.builds
        .sort((a, b) => parseISO(b.created_at).getTime() - parseISO(a.created_at).getTime())
        .map((build) => (
          <Build key={build.id} build={build} />
        ))}
    </List>
  );
}

function Build({ build }: { build: Build }) {
  const getStatusColor = (status: BuildStatus) => {
    switch (status) {
      case "complete":
        return Color.Green;
      case "failed":
      case "internal-error":
        return Color.Red;
      case "pending":
        return Color.Yellow;
    }
  };

  return (
    <List.Item
      title={build.tag}
      subtitle={build.id}
      accessories={[
        {
          tag: { value: build.status, color: getStatusColor(build.status) },
        },
        {
          date: parseISO(build.created_at),
        },
      ]}
    />
  );
}
