export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
