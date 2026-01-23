import { MoodType } from "@/types/airQuality";
import { cn } from "@/lib/utils";

interface CityMessageProps {
  message: string;
  mood: MoodType;
}

export function CityMessage({ message, mood }: CityMessageProps) {
  const borderColors: Record<MoodType, string> = {
    happy: "border-l-mood-happy",
    tired: "border-l-mood-tired",
    sick: "border-l-mood-sick",
    crying: "border-l-mood-crying",
  };

  const paragraphs = message.split('\n\n');

  return (
    <div className={cn(
      "glass-card rounded-2xl p-8 border-l-4 animate-fade-in-up animate-delay-100",
      borderColors[mood]
    )}>
      <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
        A Message From Your City
      </h3>
      <div className="space-y-4 text-lg text-foreground/90 leading-relaxed font-body">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="whitespace-pre-wrap">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
