import { Color, List } from "@raycast/api";
import { useSpace } from "../hooks/use-space";

type Project = {
    id: string;
    name: string;
    status: string;
}


type Build = {
    id: string;
    tag: string;
    app_id: string;
    status: BuildStatus;
    created_at: string;
    updated_at: string;
}

type BuildStatus = "complete" | "pending" | "internal-error" | "failed"

type BuildsResponse = {
    builds: Build[]
}

export default function Build(props: { project: Project }) {
    const { data } = useSpace<BuildsResponse>(`/builds?app_id=${props.project.id}`)

    const getStatusColor = (status: BuildStatus) => {
        switch (status) {
            case "complete":
                return Color.Green
            case "failed":
            case "internal-error":
                return Color.Red
            case "pending":
                return Color.Yellow
        }
    }

    return <List.Item.Detail.Metadata>
        {data?.builds.map((build) =>
            <List.Item.Detail.Metadata.Label title={build.tag} key={build.id} text={{ value: build.status, color: getStatusColor(build.status) }} />
        )}
    </List.Item.Detail.Metadata>
}
