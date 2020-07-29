export function titleCase(str: string): string {
  return str.length
    ? str.split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
    : str;
}

export function upperCaseFirstLetter(str: string): string {
  return str.length
    ? str[0].toUpperCase() + str.slice(1)
    : str;
}