export function levelDisplayName(level: number): string {
  switch (level) {
    case 1:
      return 'Elementary';
    case 2:
      return 'Intermediate';
    case 3:
      return 'Advanced';
  }
}
