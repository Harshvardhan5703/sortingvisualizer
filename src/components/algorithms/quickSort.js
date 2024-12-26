export const quickSort = async (
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
    // we use a pivvot element and then divide the array into two parts,
    //  one with elements smaller than pivot and one with elements greater than pivot
    const partition = async (low, high) => {
      let pivot = arr[high];
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        setCurrentIndices([j, high]);
        setComparisons(prev => prev + 1);
        playComparisonSound();
        await delay();
        
        if (arr[j] < pivot) {
          i++;
          setSwappingIndices([i, j]);
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          setSwaps(prev => prev + 1);
          playSwapSound();
          setArray([...arr]);
          await delay();
        }
      }
      
      setSwappingIndices([i + 1, high]);
      let temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      setSwaps(prev => prev + 1);
      playSwapSound();
      setArray([...arr]);
      await delay();
      
      playSortedSound();
      await markAsSorted([i + 1]);
      return i + 1;
    };
    // similar to merge sort, we use a helper function to sort the array
    const quickSortHelper = async (low, high) => {
      if (low < high) {
        let pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
      } else if (low === high) {
        playSortedSound();
        await markAsSorted([low]);
      }
    };
    
    await quickSortHelper(0, arr.length - 1);
    setCurrentIndices([]);
    setSwappingIndices([]);
    playCompletionSound();
  };