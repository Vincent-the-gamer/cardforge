export function isMobile(): boolean {
  const userAgent = navigator.userAgent
  const uaCondition = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent)
  const touchEventCondition = 'ontouchstart' in document.documentElement
  const orientationCondition = typeof window.orientation !== 'undefined'
  return uaCondition || touchEventCondition || orientationCondition
}