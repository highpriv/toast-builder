export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export type Position = 
  | 'top-left' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-right'

export type AnimationType = 'fade' | 'slide' | 'bounce'

export interface NotificationConfig {
  id: string
  type: NotificationType
  title: string
  message: string
  duration: number
  position: Position
  backgroundColor: string
  textColor: string
  showIcon: boolean
  showCloseButton: boolean
  animation?: AnimationType
  showProgress?: boolean
}

export interface ActiveNotification extends NotificationConfig {
  createdAt: number
}
