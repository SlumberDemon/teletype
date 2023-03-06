import { List } from "@raycast/api"
import { useSpace } from "../hooks/use-space";
import { parseISO } from "date-fns"

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

export default function RevisionList(props: { project: Project }) {
    const { data, isLoading } = useSpace<RevisionsResponse>(`/apps/${props.project.id}/revisions`)

    return <List isLoading={isLoading} navigationTitle={props.project.name}>
        {data?.revisions.sort((a, b) => {
            return parseISO(b.updated_at).getTime() - parseISO(a.updated_at).getTime()
        }).map((revision) =>
            <List.Item key={revision.id} title={revision.tag} subtitle={revision.id} accessories={[{ date: parseISO(revision.created_at) }]} />
        )}
    </List>
}
