import { MoodType } from "@/types/airQuality";
import { getHealthImpact } from "@/utils/airQualityUtils";
import { AlertTriangle, Heart, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthImpactProps {
  mood: MoodType;
}

export function HealthImpact({ mood }: HealthImpactProps) {
  const moodStyles: Record<MoodType, { icon: typeof Heart; color: string; glow: string }> = {
    happy: { icon: Heart, color: "text-emerald-400", glow: "shadow-emerald-500/30" },
    tired: { icon: AlertTriangle, color: "text-amber-400", glow: "shadow-amber-500/30" },
    sick: { icon: ShieldAlert, color: "text-orange-400", glow: "shadow-orange-500/30" },
    crying: { icon: ShieldAlert, color: "text-red-400", glow: "shadow-red-500/30" },
  };

  const style = moodStyles[mood];
  const Icon = style.icon;

  return (
    <div className="glass-card p-8 animate-fade-in-up animate-delay-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <Icon className={cn("h-8 w-8", style.color)} />
          <div className={cn("absolute inset-0 blur-lg opacity-50", style.color.replace('text-', 'bg-'))} />
        </div>
        <h3 className="font-heading text-xl font-semibold text-muted-foreground uppercase tracking-wider">
          What This Means For Your Health
        </h3>
      </div>
      <div className={cn(
        "p-6 rounded-xl border",
        mood === 'happy' && "bg-emerald-500/10 border-emerald-500/30",
        mood === 'tired' && "bg-amber-500/10 border-amber-500/30",
        mood === 'sick' && "bg-orange-500/10 border-orange-500/30",
        mood === 'crying' && "bg-red-500/10 border-red-500/30"
      )}>
        <p className="text-lg text-foreground/90 leading-relaxed font-body">
          {getHealthImpact(mood)}
        </p>
      </div>
    </div>
  );
}
