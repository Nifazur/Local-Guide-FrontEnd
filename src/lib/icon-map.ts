import {
  UtensilsCrossed,
  Building2,
  Palette,
  Mountain,
  Leaf,
  Music,
  Camera,
  Footprints,
  Music2,
  ShoppingBag,
  LucideIcon,
} from "lucide-react";

// Map icon names to actual Lucide components
export const ICON_MAP: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Building2,
  Palette,
  Mountain,
  Leaf,
  Music,
  Camera,
  Footprints,
  Music2,
  ShoppingBag,
};

// Helper function to get icon component by name
export const getIconComponent = (iconName: string): LucideIcon => {
  return ICON_MAP[iconName] || Mountain; // Default to Mountain if not found
};