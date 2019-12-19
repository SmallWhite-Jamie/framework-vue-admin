import defaultSettings from '@/config/settings'

const title = defaultSettings.title || 'Vue Element Admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    // const i18nTitle = Vue.$i18n.$t(pageTitle)
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
