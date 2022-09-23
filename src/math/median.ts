export const median = (numbers: number[]) => {
  const half = (numbers.length / 2) | 0
  const arr = numbers.sort((a, b) => {
    return a - b
  })

  if (arr.length % 2) {
    return arr[half]
  }
  return (arr[half - 1] + arr[half]) / 2
}