import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  HelpCircle,
  Timer,
} from "lucide-react"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const KycStatuses = [
  {
    value: "pending",
    label: "pending",
    icon: HelpCircle,
  },
  {
    value: "viewed",
    label: "viewed",
    icon: Circle,
  },
  {
    value: "approved",
    label: "approved",
    icon: Timer,
  },
  {
    value: "rejected",
    label: "rejected",
    icon: CheckCircle,
  }
]

// export const statuses = [
//   {
//     value: "pending",
//     label: "Pending",
//     icon: HelpCircle,
//   },
//   {
//     value: "shipped",
//     label: "Shipped",
//     icon: Timer,
//   },
//   {
//     value: "confirmed",
//     label: "Confirmed",
//     icon: CheckCircle,
//   },
//   {
//     value: "cancelled",
//     label: "Cancelled",
//     icon: CircleOff,
//   },
//   {
//     value: "delivery",
//     label: "Out for Delivery",
//     icon: Circle,
//   },
// ];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
]
