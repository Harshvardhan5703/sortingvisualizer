export const selectionSort = async (
    array, 
    setArray, 
    setComparisons, 
    setSwaps, 
    setCurrentIndices, 
    setSwappingIndices, 
    markAsSorted, 
    delay,
    playComparisonSound,
    playSwapSound,
    playSortedSound,
    playCompletionSound
  ) => {
    let arr = [...array];
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      // minimum element is searched and placed at the beginning
      for (let j = i + 1; j < n; j++) {
        setCurrentIndices([minIdx, j]);
        setComparisons(prev => prev + 1);
        playComparisonSound();
        await delay();
        
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      // if the minimum element is not at the beginning, it is swapped
      if (minIdx !== i) {
        setSwappingIndices([i, minIdx]);
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        setSwaps(prev => prev + 1);
        playSwapSound();
        setArray([...arr]);
        await delay();
      }
      playSortedSound();
      await markAsSorted([i]);
    }
    // similar to bubble sort, the last element is sorted and completion sound is played
    playSortedSound();
    await markAsSorted([n - 1]);
    setCurrentIndices([]);
    setSwappingIndices([]);
    playCompletionSound();
  };