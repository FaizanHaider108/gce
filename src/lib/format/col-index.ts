/**
 * Cost-of-living index phrasing — scale where UK average = 100 (not a percentage).
 * Use this helper everywhere COL is mentioned in user-facing copy.
 */
export function costOfLivingIndexPhrase(index: number): string {
  return `a cost-of-living index of ${index}`;
}

export function costOfLivingIndexWithBaseline(index: number): string {
  return `${costOfLivingIndexPhrase(index)} (UK average = 100)`;
}
