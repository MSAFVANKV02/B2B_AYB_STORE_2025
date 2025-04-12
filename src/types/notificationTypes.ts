export interface INotificationType {
  preferences: INotificationPreferences
  _id: string
  userId: UserId
  userRoleModel: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface INotificationPreferences {
  otp_updates: OtpUpdates
  auth_updates: AuthUpdates
  order_updates: OrderUpdates
  payment_updates: PaymentUpdates
  promotions: Promotions
  inventory_alerts: InventoryAlerts
  system_notifications: SystemNotifications
}

export interface OtpUpdates {
  email: boolean
  sms: boolean
  push: boolean
}

export interface AuthUpdates {
  email: boolean
  sms: boolean
  push: boolean
}

export interface OrderUpdates {
  email: boolean
  sms: boolean
  push: boolean
}

export interface PaymentUpdates {
  email: boolean
  sms: boolean
  push: boolean
}

export interface Promotions {
  email: boolean
  sms: boolean
  push: boolean
}

export interface InventoryAlerts {
  email: boolean
  sms: boolean
  push: boolean
}

export interface SystemNotifications {
  email: boolean
  sms: boolean
  push: boolean
}

export interface UserId {
  _id: string
  email: string
  mobile: string
  password: string
  role: string
  pages: any[]
  isBlocked: boolean
  createdAt: string
  updatedAt: string
  __v: number
  name: string
  avatar: string
}
