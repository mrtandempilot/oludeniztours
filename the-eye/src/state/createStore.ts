import { useRef, useSyncExternalStore } from 'react';

export interface Store<T> {
  get: () => T;
  set: (patch: Partial<T> | ((s: T) => Partial<T>)) => void;
  subscribe: (fn: (s: T, prev: T) => void) => () => void;
}

export function createStore<T extends object>(initial: T): Store<T> {
  let state = initial;
  const subs = new Set<(s: T, prev: T) => void>();
  return {
    get: () => state,
    set: (patch) => {
      const prev = state;
      const p = typeof patch === 'function' ? patch(state) : patch;
      state = { ...state, ...p };
      subs.forEach((fn) => fn(state, prev));
    },
    subscribe: (fn) => {
      subs.add(fn);
      return () => subs.delete(fn);
    },
  };
}

function shallowEqual(a: unknown, b: unknown) {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  for (const k of ka) {
    if (!Object.is((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k])) return false;
  }
  return true;
}

/** Subscribe a component to a slice of a store (shallow-compared). */
export function useStoreSlice<T extends object, S>(store: Store<T>, selector: (s: T) => S): S {
  const cache = useRef<{ s: S } | null>(null);
  const getSnap = () => {
    const next = selector(store.get());
    if (cache.current && shallowEqual(cache.current.s, next)) return cache.current.s;
    cache.current = { s: next };
    return next;
  };
  return useSyncExternalStore(store.subscribe, getSnap, getSnap);
}
