import { Target, Crosshair, RefreshCw, Activity, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardsProps {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export function MetricsCards({ accuracy, precision, recall, f1Score }: MetricsCardsProps) {
  const metrics = [
    {
      label: "Accuracy",
      value: accuracy,
      icon: Target,
      color: "from-emerald-500 to-teal-500",
      glow: "emerald",
    },
    {
      label: "Precision",
      value: precision,
      icon: Crosshair,
      color: "from-blue-500 to-cyan-500",
      glow: "blue",
    },
    {
      label: "Recall",
      value: recall,
      icon: RefreshCw,
      color: "from-purple-500 to-pink-500",
      glow: "purple",
    },
    {
      label: "F1 Score",
      value: f1Score,
      icon: Activity,
      color: "from-orange-500 to-amber-500",
      glow: "orange",
    },
  ];

  return (
    <div className="glass-card p-8 animate-fade-in-up">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Cpu className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-xl font-semibold text-muted-foreground uppercase tracking-wider">
          Model Performance Metrics
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="relative group"
          >
            {/* Glow effect */}
            <div className={cn(
              "absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500",
              `bg-gradient-to-br ${metric.color}`
            )} />
            
            <div className="relative bg-secondary/40 rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${metric.color} mb-4`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-muted-foreground text-sm font-medium mb-2 uppercase tracking-wide">
                {metric.label}
              </p>
              <p className="text-4xl font-bold text-foreground font-heading">
                {(metric.value * 100).toFixed(1)}
                <span className="text-lg text-muted-foreground">%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
