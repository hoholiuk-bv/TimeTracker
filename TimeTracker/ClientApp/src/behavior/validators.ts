export function required(value: any) {
  let error;
  if (value === null || !value.toString()) {
    error = 'This field is required';
  }
  return error;
}