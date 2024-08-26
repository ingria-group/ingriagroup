const getAssets = (data?: string): string => {
  if (!data) {
    return 'https://placehold.co/600x400/EEE/31343C'
  }
  return `https://ingria.fly.dev/assets/${data}`
}

export default getAssets
