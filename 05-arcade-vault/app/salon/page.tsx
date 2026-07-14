import { GAMES } from "@/lib/games";
import { HallOfFame } from "@/app/_components/HallOfFame";

export default function SalonPage() {
  return <HallOfFame games={GAMES} />;
}
