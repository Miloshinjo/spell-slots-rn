import { SpellSlotsState } from '../components/spell-slots/useSpellSlotsState';

export function serializeState(state: SpellSlotsState): string {
  const jsonValue = JSON.stringify(Array.from(state.entries()));

  return jsonValue;
}
export function deserializeState(jsonValue: string): SpellSlotsState | null {
  const parsedValue = JSON.parse(jsonValue);

  if (!parsedValue) {
    return null;
  }
  return new Map(parsedValue);
}
