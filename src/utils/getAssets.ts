const getAssets = (data?: string): string | undefined => {
  if (!data) return undefined
  return `https://ingria.fly.dev/assets/${data}`
}

export default getAssets
