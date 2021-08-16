export default function (locationSearch: string, parameterName: string, parameterValue: string): string {
  const updateParameters: string[] = [];
  const AND = '&';
  const parameters = removeStringPrefix(locationSearch).split(AND);
  for (const parameter of parameters) {
    if (parameter.split('=')[0] !== parameterName) updateParameters.push(AND + parameter);
  }
  updateParameters.push(`${AND}${parameterName}=${parameterValue}`);
  return '?' + removeStringPrefix(updateParameters.join(''));
}

function removeStringPrefix(text: string): string {
  return text.slice(1);
}
