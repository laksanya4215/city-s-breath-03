import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface CitySelectorProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export function CitySelector({ cities, selectedCity, onCityChange }: CitySelectorProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        Select Your City
      </label>
      <Select value={selectedCity} onValueChange={onCityChange}>
        <SelectTrigger className="w-full h-14 text-lg glass-card border-2 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <SelectValue placeholder="Choose a city..." />
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {cities.map((city) => (
            <SelectItem key={city} value={city} className="text-base py-3">
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
