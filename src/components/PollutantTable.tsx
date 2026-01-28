import { PollutantPercentage } from "@/types/airQuality";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PollutantTableProps {
  data: PollutantPercentage[];
}

export function PollutantTable({ data }: PollutantTableProps) {
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in-up">
      <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
        Detailed Pollutant Levels
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Pollutant</TableHead>
              <TableHead className="font-semibold">Full Name</TableHead>
              <TableHead className="text-right font-semibold">Level (µg/m³)</TableHead>
              <TableHead className="text-right font-semibold">Contribution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((pollutant) => (
              <TableRow key={pollutant.name}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: pollutant.color }}
                    />
                    <span className="font-medium">{pollutant.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {pollutant.fullName}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {pollutant.value.toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {pollutant.percentage.toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
