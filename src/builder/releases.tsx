import { List, Icon, Image, Color, ActionPanel, Action } from "@raycast/api"
import { useSpace } from "../hooks/use-space";
import { parseISO } from "date-fns"

type Project = {
    id: string;
    name: string;
    status: string;
}

type Release = {
    id: string;
    name: string;
    short_description: string;
    release_alias: string;
    version: string;
    icon_url: string;
    status: string;
    latest: boolean;
    released_at: string;
    discovery: {
        canonical_url: string;
        stats: {
            total_installs: string;
            release_installs: string
        }
    }
}
type ReleaseResponse = {
    releases: Release[]
}

export default function ReleaseList(props: { project: Project }) {
    const { data, isLoading } = useSpace<ReleaseResponse>(`/releases?app_id=${props.project.id}`)

    return <List navigationTitle={props.project.name} isLoading={isLoading}>
        {
            data?.releases.sort((a, b) => {
                return parseISO(b.released_at).getTime() - parseISO(a.released_at).getTime()
            }).map((release) =>
                <Release key={release.id} release={release} />
            )
        }
    </List >
}

function Release({ release }: { release: Release }) {
    const accessories = []
    if (release.latest) {
        accessories.push({ tag: { value: "Latest", color: Color.Green } })
    }
    accessories.push({ date: parseISO(release.released_at) })

    const icon = release.icon_url ? { source: release.icon_url, mask: Image.Mask.RoundedRectangle } : Icon.PlusTopRightSquare

    return <List.Item title={release.name} subtitle={release.version} icon={icon} accessories={accessories}
        actions={
            <ActionPanel>
                <ActionPanel.Section>
                    <Action.OpenInBrowser title="Open Discovery Page" url={release.discovery.canonical_url} />
                </ActionPanel.Section>
                <ActionPanel.Section>
                    <Action.CopyToClipboard title="Copy Discovery Link" content={release.discovery.canonical_url} shortcut={{ modifiers: ["cmd"], key: "." }} />
                </ActionPanel.Section>
            </ActionPanel>
        }
    />
}
