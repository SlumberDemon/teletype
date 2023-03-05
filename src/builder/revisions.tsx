import { List } from "@raycast/api"
import { useSpace } from "../hooks/use-space";

type Project = {
    id: string;
    name: string;
    status: string;
}

type Revision = {
    id: string;
    tag: string;
    app_id: string;
    app_name: string;
    created_at: string;
    updated_at: string;
}

type RevisionsResponse = {
    revisions: Revision[]
}

export default function Revision(props: { project: Project }) {
    const { data } = useSpace<RevisionsResponse>(`/apps/${props.project.id}/revisions`)

    return <List.Item.Detail.Metadata>
        {data?.revisions.map((revision) =>
            <List.Item.Detail.Metadata.Label title={revision.tag} key={revision.id} />
        )}
    </List.Item.Detail.Metadata>
}