import { MoodType } from "@/types/airQuality";
import { getDailyAdvice } from "@/utils/airQualityUtils";
import { cn } from "@/lib/utils";

interface DailyAdviceProps {
  mood: MoodType;
}

export function DailyAdvice({ mood }: DailyAdviceProps) {
  const bgColors: Record<MoodType, string> = {
    happy: "bg-mood-happy/10 border-mood-happy/30",
    tired: "bg-mood-tired/10 border-mood-tired/30",
    sick: "bg-mood-sick/10 border-mood-sick/30",
    crying: "bg-mood-crying/10 border-mood-crying/30",
  };

  return (
    <div className={cn(
      "rounded-2xl p-6 border-2 animate-fade-in-up animate-delay-300",
      bgColors[mood]
    )}>
      <h3 className="font-heading text-xl font-bold text-foreground mb-3">
        Today's Advice
      </h3>
      <p className="text-lg text-foreground/90 font-body">
        {getDailyAdvice(mood)}
      </p>
    </div>
  );
}
