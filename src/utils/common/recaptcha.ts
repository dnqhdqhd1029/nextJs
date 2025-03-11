export const toggleCaptchaBadge = (show: boolean) => {
  const badge = document.getElementsByClassName('grecaptcha-badge')[0]
  if (badge && badge instanceof HTMLElement) {
    badge.style.visibility = show ? 'visible' : 'hidden'
  }
}
