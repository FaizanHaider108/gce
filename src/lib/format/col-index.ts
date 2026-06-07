/**
 * Cost-of-living index phrasing — scale where UK average = 100 (not a percentage).
 * Use these helpers everywhere COL is mentioned in user-facing copy.
 */
export function costOfLivingIndexPhrase(index: number): string {
  return `a cost-of-living index of ${index}`;
}

export function costOfLivingIndexWithBaseline(index: number): string {
  return `${costOfLivingIndexPhrase(index)} (UK average = 100)`;
}

/** Tax & NI explanatory context — full linguistic unit for parser clarity. */
export function costOfLivingIndexBudgetPhrase(index: number): string {
  return `a cost-of-living index score of ${index} when budgeting net pay`;
}
