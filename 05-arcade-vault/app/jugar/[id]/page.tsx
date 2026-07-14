import { notFound } from "next/navigation";
import { GAMES } from "@/lib/games";
import { GamePlayer } from "@/app/_components/GamePlayer";

type JugarPageProps = {
  params: Promise<{ id: string }>;
};

export default async function JugarPage({ params }: JugarPageProps) {
  const { id } = await params;
  const game = GAMES.find((g) => g.id === id);

  if (!game) {
    notFound();
  }

  return <GamePlayer game={game} />;
}
