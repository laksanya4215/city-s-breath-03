import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Building2 } from "lucide-react";

interface CitySelectorProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export function CitySelector({ cities, selectedCity, onCityChange }: CitySelectorProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <label className="block text-sm font-medium text-muted-foreground mb-3 text-center">
        Select Your City
      </label>
      <div className="relative">
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="w-full h-16 text-lg glass-card-glow border-primary/30 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Building2 className="h-6 w-6 text-primary" />
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-md" />
              </div>
              <SelectValue placeholder="Choose a city..." />
            </div>
          </SelectTrigger>
          <SelectContent className="glass-card border-border/50 max-h-80">
            {cities.map((city) => (
              <SelectItem 
                key={city} 
                value={city} 
                className="text-base py-3 hover:bg-primary/10 focus:bg-primary/10 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary/70" />
                  {city}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
