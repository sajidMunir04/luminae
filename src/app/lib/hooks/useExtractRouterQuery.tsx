
export function useExtractQueryParams(url: string): Record<string, string | number> {
    const urlParams = new URLSearchParams(url.split('?')[1]); // Split off everything after '?'
    const queryParams: Record<string, string | number> = {};
  
    for (const [key, value] of urlParams.entries()) {
      try {
        queryParams[key] = parseInt(value); // Attempt to convert to number
      } catch (error) {
        queryParams[key] = value; // Keep as string if conversion fails
      }
    }
  
    return queryParams;
  }