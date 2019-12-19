export function handelI18n(meta) {
  let title = meta.title ? meta.title : meta
  if (meta.i18n === undefined || meta.i18n === true) {
    title = this.$t(title)
  }
  return title
}
