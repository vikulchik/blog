export interface ErrorResponseDto {
  response: {
    data: {
      errors: Record<string, string[]>
    }
  };
}
