export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export type Position = 
  | 'top-left' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-right'

export type AnimationType = 'fade' | 'slide' | 'bounce'

export type IconName = 
  | 'check-circle'
  | 'check'
  | 'badge-check'
  | 'x-circle'
  | 'alert-circle'
  | 'exclamation-circle'
  | 'alert-triangle'
  | 'exclamation-triangle'
  | 'information-circle'
  | 'question-mark-circle'
  | 'bell'
  | 'megaphone'
  | 'sparkles'
  | 'heart'
  | 'none'

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
  customIcon?: IconName
  animation?: AnimationType
  showProgress?: boolean
}

export interface ActiveNotification extends NotificationConfig {
  createdAt: number
}
