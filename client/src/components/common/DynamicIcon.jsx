import {
  Award,
  Building2,
  CalendarDays,
  Gavel,
  Globe,
  GraduationCap,
  HardHat,
  Home,
  Landmark,
  Scale,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react'

// Content files store icon names as text; this maps a name to the icon component.
export const ICONS = {
  Award,
  Building2,
  CalendarDays,
  Gavel,
  Globe,
  GraduationCap,
  HardHat,
  Home,
  Landmark,
  Scale,
  ShieldCheck,
  Users,
  Zap,
}

export default function DynamicIcon({ name, ...props }) {
  const Icon = ICONS[name] || Scale
  return <Icon {...props} />
}
