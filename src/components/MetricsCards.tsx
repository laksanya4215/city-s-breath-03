import { Target, Crosshair, RefreshCw, Activity } from "lucide-react";

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
    },
    {
      label: "Precision",
      value: precision,
      icon: Crosshair,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Recall",
      value: recall,
      icon: RefreshCw,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "F1 Score",
      value: f1Score,
      icon: Activity,
      color: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="glass-card rounded-2xl p-5 text-center"
        >
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${metric.color} mb-3`}>
            <metric.icon className="h-6 w-6 text-white" />
          </div>
          <p className="text-muted-foreground text-sm font-medium mb-1">{metric.label}</p>
          <p className="text-3xl font-bold text-foreground">
            {(metric.value * 100).toFixed(1)}%
          </p>
        </div>
      ))}
    </div>
  );
}
