export const mergeSort = async (
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
    // do subarrays me division 
    const merge = async (left, middle, right) => {
      let i = left;
      let j = middle + 1;
      let tempArr = [];
      
      while (i <= middle && j <= right) {
        setCurrentIndices([i, j]);
        setComparisons(prev => prev + 1);
        playComparisonSound();
        await delay();
        
        if (arr[i] <= arr[j]) {
          tempArr.push(arr[i++]);
        } else {
          tempArr.push(arr[j++]);
        }
      }
      
      while (i <= middle) {
        tempArr.push(arr[i++]);
      }
      
      while (j <= right) {
        tempArr.push(arr[j++]);
      }
      
      for (let k = 0; k < tempArr.length; k++) {
        setSwappingIndices([left + k]);
        arr[left + k] = tempArr[k];
        setSwaps(prev => prev + 1);
        playSwapSound();
        setArray([...arr]);
        await delay();
      }
      
      if (right - left + 1 === arr.length) {
        playSortedSound();
        await markAsSorted(Array.from({ length: right - left + 1 }, (_, i) => left + i));
      }
    };
    
    // helper function taaaki merge sort ho, upr vaala merge function use krke
    // this is used so that the visualizations can be done properly, as if only the first function is used, the entire array will be 
    // sorted at once and the visualizations will not be seen
    const mergeSortHelper = async (left, right) => {
      if (left < right) {
        const middle = Math.floor((left + right) / 2);
        await mergeSortHelper(left, middle);
        await mergeSortHelper(middle + 1, right);
        await merge(left, middle, right);
      } else if (left === right) {
        playSortedSound();
        await markAsSorted([left]);
      }
    };
    
    await mergeSortHelper(0, arr.length - 1);
    setCurrentIndices([]);
    setSwappingIndices([]);
    playCompletionSound();
  };