import { MoodType } from "@/types/airQuality";
import { getDailyAdvice } from "@/utils/airQualityUtils";
import { cn } from "@/lib/utils";
import { Lightbulb, Shield, Wind, Users, Home } from "lucide-react";

interface DailyAdviceProps {
  mood: MoodType;
}

const adviceIcons = [
  { icon: Shield, label: "Wear a mask" },
  { icon: Wind, label: "Avoid outdoor exercise" },
  { icon: Users, label: "Protect vulnerable groups" },
  { icon: Home, label: "Stay indoors if possible" },
];

export function DailyAdvice({ mood }: DailyAdviceProps) {
  const moodStyles: Record<MoodType, { bg: string; border: string; iconBg: string }> = {
    happy: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", iconBg: "bg-emerald-500/20" },
    tired: { bg: "bg-amber-500/10", border: "border-amber-500/30", iconBg: "bg-amber-500/20" },
    sick: { bg: "bg-orange-500/10", border: "border-orange-500/30", iconBg: "bg-orange-500/20" },
    crying: { bg: "bg-red-500/10", border: "border-red-500/30", iconBg: "bg-red-500/20" },
  };

  const style = moodStyles[mood];

  // Determine which icons to show based on mood
  const getActiveIcons = () => {
    switch (mood) {
      case 'happy':
        return [0]; // Just mask is optional
      case 'tired':
        return [0, 1]; // Mask and avoid outdoor
      case 'sick':
        return [0, 1, 2]; // Mask, avoid outdoor, protect vulnerable
      case 'crying':
        return [0, 1, 2, 3]; // All precautions
      default:
        return [0];
    }
  };

  const activeIcons = getActiveIcons();

  return (
    <div className={cn(
      "glass-card p-8 animate-fade-in-up animate-delay-300",
    )}>
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <Lightbulb className="h-7 w-7 text-primary" />
          <div className="absolute inset-0 bg-primary/30 blur-lg" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-muted-foreground uppercase tracking-wider">
          Today's Advice
        </h3>
      </div>

      {/* Icon-based suggestions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {adviceIcons.map((item, index) => {
          const isActive = activeIcons.includes(index);
          return (
            <div 
              key={item.label}
              className={cn(
                "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-300",
                isActive 
                  ? `${style.bg} ${style.border}` 
                  : "bg-secondary/20 border-border/30 opacity-40"
              )}
            >
              <div className={cn(
                "p-3 rounded-xl",
                isActive ? style.iconBg : "bg-secondary/30"
              )}>
                <item.icon className={cn(
                  "h-6 w-6",
                  isActive ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <span className={cn(
                "text-sm text-center font-medium",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Text advice */}
      <div className={cn("p-5 rounded-xl border", style.bg, style.border)}>
        <p className="text-lg text-foreground/90 font-body leading-relaxed">
          {getDailyAdvice(mood)}
        </p>
      </div>
    </div>
  );
}
