import { useEffect, useState } from 'react';

/**
 * React hook that debounces and returns debounced value
 *
 * @param value   The value we want to debounce
 * @param delay   After how many seconds we want the debounce to occur
 * @returns       Debounced value
 */
export default function useDebounce<ValueType>(
  value: ValueType,
  delay: number
): ValueType {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<ValueType>(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

useDebounce;
