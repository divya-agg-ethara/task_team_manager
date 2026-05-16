import { TeamDetailPage } from "@/components/teams/team-detail-page";

export const metadata = {
  title: "Team",
};

export default function TeamDetailRoute({
  params,
}: {
  params: { teamId: string };
}) {
  return <TeamDetailPage teamId={params.teamId} />;
}
