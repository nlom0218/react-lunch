import { useState } from 'react';

type FilterFnCallbackFn<T> = (arg: T) => T;
type FilterFn<K, U> = Record<keyof K, U>;

const useFilteringList = <List, CallBackFn extends FilterFnCallbackFn<List>, K extends FilterFn<K, CallBackFn>>(
  list: List,
  filteringFn: FilterFn<K, CallBackFn>,
): [List, (subject: keyof K, filteringFn: FilterFnCallbackFn<List>) => void] => {
  const [_filteringFn, setFilteringFn] = useState(filteringFn);

  const filteringPipe = () => {
    return (Object.values(_filteringFn) as CallBackFn[]).reduce((_list, fn) => fn(_list), list);
  };

  const changeFilteringFn = (subject: keyof K, filteringFn: FilterFnCallbackFn<List>) => {
    setFilteringFn((prev) => {
      return {
        ...prev,
        [subject]: filteringFn,
      };
    });
  };

  return [filteringPipe(), changeFilteringFn];
};

export default useFilteringList;
