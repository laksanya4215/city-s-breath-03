import { MoodType } from "@/types/airQuality";
import { cn } from "@/lib/utils";
import { MessageCircle, Building2 } from "lucide-react";

interface CityMessageProps {
  message: string;
  mood: MoodType;
}

export function CityMessage({ message, mood }: CityMessageProps) {
  const moodStyles: Record<MoodType, { bg: string; border: string; accent: string }> = {
    happy: { bg: "bg-emerald-500/5", border: "border-l-emerald-500", accent: "text-emerald-400" },
    tired: { bg: "bg-amber-500/5", border: "border-l-amber-500", accent: "text-amber-400" },
    sick: { bg: "bg-orange-500/5", border: "border-l-orange-500", accent: "text-orange-400" },
    crying: { bg: "bg-red-500/5", border: "border-l-red-500", accent: "text-red-400" },
  };

  const style = moodStyles[mood];
  const paragraphs = message.split('\n\n');

  // City mascot emoji based on mood
  const cityEmoji = {
    happy: "🏙️",
    tired: "😷",
    sick: "🤒",
    crying: "😢",
  }[mood];

  return (
    <div className={cn(
      "glass-card p-8 border-l-4 animate-fade-in-up animate-delay-100",
      style.border,
      style.bg
    )}>
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <MessageCircle className={cn("h-7 w-7", style.accent)} />
          <div className={cn("absolute inset-0 blur-lg opacity-50", style.accent.replace('text-', 'bg-'))} />
        </div>
        <h3 className="font-heading text-xl font-semibold text-muted-foreground uppercase tracking-wider">
          A Message From Your City
        </h3>
      </div>

      {/* City mascot */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative flex-shrink-0">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border",
            style.bg,
            mood === 'happy' ? "border-emerald-500/30" : 
            mood === 'tired' ? "border-amber-500/30" :
            mood === 'sick' ? "border-orange-500/30" : "border-red-500/30"
          )}>
            {cityEmoji}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
            <Building2 className={cn("h-3 w-3", style.accent)} />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="space-y-4 text-lg text-foreground/90 leading-relaxed font-body">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-wrap">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
