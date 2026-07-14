import { GAMES, CATS } from "@/lib/games";
import { Library } from "./_components/Library";

export default function Home() {
  return <Library games={GAMES} cats={CATS} />;
}
