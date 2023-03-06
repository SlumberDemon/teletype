import { List, Icon, Image, Color, ActionPanel, Action } from "@raycast/api"
import { useSpace } from "../hooks/use-space";

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

export default function Release(props: { project: Project }) {
    const { data } = useSpace<ReleaseResponse>(`/releases?app_id=${props.project.id}`)

    return <List navigationTitle={`${props.project.name} | Releases`}>
        {
            data?.releases.map((release) =>
                <List.Item title={release.name} subtitle={release.version} key={release.id} icon={release.icon_url ? { source: release.icon_url, mask: Image.Mask.RoundedRectangle } : Icon.PlusTopRightSquare} accessories={[
                    {
                        tag: {
                            value: release.latest === true ? "Latest" : null, color: release.latest === true ? Color.Green : Color.Red
                        }
                    } // release.latest
                ]}
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
            )
        }
    </List >
}