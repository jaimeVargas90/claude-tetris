import { notFound } from "next/navigation";
import { GAMES, seededScores } from "@/lib/games";
import { GameDetail } from "@/app/_components/GameDetail";

type DetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DetallePage({ params }: DetailPageProps) {
  const { id } = await params;
  const game = GAMES.find((g) => g.id === id);

  if (!game) {
    notFound();
  }

  const scores = seededScores(id.length * 17 + 3, 10);

  return <GameDetail game={game} scores={scores} />;
}
