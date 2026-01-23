import { MoodType } from "@/types/airQuality";
import { getMoodEmoji, getMoodLabel, getAQICategory } from "@/utils/airQualityUtils";
import { cn } from "@/lib/utils";

interface MoodDisplayProps {
  mood: MoodType;
  aqi: number;
  cityName: string;
}

export function MoodDisplay({ mood, aqi, cityName }: MoodDisplayProps) {
  const moodColors: Record<MoodType, string> = {
    happy: "mood-card-happy",
    tired: "mood-card-tired",
    sick: "mood-card-sick",
    crying: "mood-card-crying",
  };

  const textColors: Record<MoodType, string> = {
    happy: "text-mood-happy",
    tired: "text-mood-tired",
    sick: "text-mood-sick",
    crying: "text-mood-crying",
  };

  return (
    <div className={cn("rounded-2xl p-8 animate-fade-in-up", moodColors[mood])}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="text-8xl animate-float pulse-glow">
          {getMoodEmoji(mood)}
        </div>
        
        <div className="text-center md:text-left flex-1">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            {cityName} is feeling <span className={textColors[mood]}>{getMoodLabel(mood)}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Current Air Quality Index
          </p>
        </div>
        
        <div className="text-center">
          <div className={cn("text-6xl font-bold font-heading", textColors[mood])}>
            {Math.round(aqi)}
          </div>
          <div className={cn("text-lg font-semibold mt-1", textColors[mood])}>
            {getAQICategory(aqi)}
          </div>
        </div>
      </div>
    </div>
  );
}
