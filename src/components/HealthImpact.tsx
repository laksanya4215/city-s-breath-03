import { MoodType } from "@/types/airQuality";
import { getHealthImpact } from "@/utils/airQualityUtils";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthImpactProps {
  mood: MoodType;
}

export function HealthImpact({ mood }: HealthImpactProps) {
  const iconColors: Record<MoodType, string> = {
    happy: "text-mood-happy",
    tired: "text-mood-tired",
    sick: "text-mood-sick",
    crying: "text-mood-crying",
  };

  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-in-up animate-delay-200">
      <div className="flex items-center gap-3 mb-4">
        <Heart className={cn("h-7 w-7", iconColors[mood])} />
        <h3 className="font-heading text-2xl font-bold text-foreground">
          What This Means For Your Health
        </h3>
      </div>
      <p className="text-lg text-foreground/90 leading-relaxed font-body">
        {getHealthImpact(mood)}
      </p>
    </div>
  );
}
