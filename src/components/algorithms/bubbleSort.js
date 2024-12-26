export const bubbleSort = async (
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
    
// loop chalana h saare elements pe

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentIndices([j, j + 1]);
        setComparisons(prev => prev + 1);
        playComparisonSound();
        await delay();
        // agar current element bada h next element se to swap
        if (arr[j] > arr[j + 1]) {
          setSwappingIndices([j, j + 1]);
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setSwaps(prev => prev + 1);
          playSwapSound();
          setArray([...arr]);
          await delay();
        }
        // index jo swap hue h unhe reset krna after every comparison
        setSwappingIndices([]); 
      }
      // sbse bada element sort hone pr sound
      playSortedSound();
      await markAsSorted([n - 1 - i]);
    }
    // last element sort hote hi index reset or completion sound 
    await markAsSorted([0]);
    setCurrentIndices([]);
    playCompletionSound();
  };