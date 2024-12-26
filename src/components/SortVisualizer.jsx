import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { bubbleSort } from '@/components/algorithms/bubbleSort';
import { quickSort } from '@/components/algorithms/quickSort';
import { mergeSort } from '@/components/algorithms/mergeSort';
import { selectionSort } from '@/components/algorithms/selectionSort';
import useSound from './Sound';
import { Volume2, VolumeX } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentIndices, setCurrentIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);



  const { playComparisonSound, playSwapSound, playSortedSound, playCompletionSound } = useSound(soundEnabled);

  const algorithmInfo = {
    bubble: {
      name: 'Bubble Sort',
      timeComplexity: {
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
      },
      spaceComplexity: 'O(1)',
      description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
    },
    quick: {
      name: 'Quick Sort',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)',
      },
      spaceComplexity: 'O(log n)',
      description: 'Divides the array into smaller sub-arrays using a pivot element and recursively sorts them.'
    },
    merge: {
      name: 'Merge Sort',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
      },
      spaceComplexity: 'O(n)',
      description: 'Divides the array into smaller sub-arrays, sorts them, and then merges them back together.'
    },
    selection: {
      name: 'Selection Sort',
      timeComplexity: {
        best: 'O(n²)',
        average: 'O(n²)',
        worst: 'O(n²)',
      },
      spaceComplexity: 'O(1)',
      description: 'Finds the minimum element and places it at the beginning, then repeats for the remaining elements.'
    }
  };
  
  
  const generateArray = () => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    resetMetrics();
  };

  const resetMetrics = () => {
    setComparisons(0);
    setSwaps(0);
    setCurrentIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  const delay = () => new Promise(resolve => setTimeout(resolve, 100 - speed));

  
  const markAsSorted = async (indices) => {
    for (let i of indices) {
      setSortedIndices(prev => [...prev, i]);
      await delay();
    }
  };


  const startSort = async () => {
    setSorting(true); 
    resetMetrics(); 
  
    switch (selectedAlgorithm) {
      case 'bubble':
        await bubbleSort(array, setArray, setComparisons, setSwaps, setCurrentIndices, setSwappingIndices, markAsSorted, delay, playComparisonSound, playSwapSound, playSortedSound, playCompletionSound);
        break;
      case 'quick':
        await quickSort(array, setArray, setComparisons, setSwaps, setCurrentIndices, setSwappingIndices, markAsSorted, delay, playComparisonSound, playSwapSound, playSortedSound, playCompletionSound);
        break;
      case 'merge':
        await mergeSort(array, setArray, setComparisons, setSwaps, setCurrentIndices, setSwappingIndices, markAsSorted, delay, playComparisonSound, playSwapSound, playSortedSound, playCompletionSound);
        break;
      case 'selection':
        await selectionSort(array, setArray, setComparisons, setSwaps, setCurrentIndices, setSwappingIndices, markAsSorted, delay, playComparisonSound, playSwapSound, playSortedSound, playCompletionSound);
        break;
      default:
        break;
    }
  
    setSorting(false); 
  };
  
  

  const maxValue = Math.max(...array);

  return (
    <div className='flex justify-center bg-300% bg-black border-none absolute w-full '>
    <Card className="w-full my-2 border-none max-w-5xl">
    <CardHeader>
         <CardTitle className="flex justify-between items-center">
         <span
            class="text-3xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient"
          >
            Sortician
          </span>
           <Button 
             onClick={() => setSoundEnabled(!soundEnabled)}
             variant="outline"
             disabled={sorting}
           >
             {soundEnabled ? <Volume2/> : <VolumeX/>}
           </Button>
         </CardTitle>
      </CardHeader>


      <CardContent>
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={generateArray} 
              disabled={sorting}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Generate New Array
            </Button>
             <Select
               value={selectedAlgorithm}
               onValueChange={setSelectedAlgorithm}
               disabled={sorting}
             >
             <SelectTrigger className="w-[200px]">
               <SelectValue placeholder="Select Sorting Algorithm" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="bubble">Bubble Sort</SelectItem>
               <SelectItem value="quick">Quick Sort</SelectItem>
               <SelectItem value="merge">Merge Sort</SelectItem>
               <SelectItem value="selection">Selection Sort</SelectItem>
             </SelectContent>
             </Select>
            <Button 
              onClick={startSort} 
              disabled={sorting}
              className="bg-green-500 hover:bg-green-600"
            >
              Start Sorting
            </Button>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <span className="w-24">Array Size:</span>
              <Slider
                min={10}
                max={200}
                step={5}
                value={[arraySize]}
                onValueChange={([value]) => setArraySize(value)}
                disabled={sorting}
                className="w-48"
              />
              <span>{arraySize}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="w-24">Speed:</span>
              <Slider
                min={10}
                max={95}
                step={5}
                value={[speed]}
                onValueChange={([value]) => setSpeed(value)}
                disabled={sorting}
                className="w-48"
              />
              <span>{speed}%</span>
            </div>
          </div>

          <div className="flex gap-8">
            <div>Comparisons: {comparisons}</div>
            <div>Swaps: {swaps}</div>
          </div>

          <div className="bg-blur p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{algorithmInfo[selectedAlgorithm].name} Complexity:</h3>
            <p className="mb-2 text-sm">{algorithmInfo[selectedAlgorithm].description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><span className="font-medium">Best Case:</span> {algorithmInfo[selectedAlgorithm].timeComplexity.best}</p>
                <p><span className="font-medium">Average Case:</span> {algorithmInfo[selectedAlgorithm].timeComplexity.average}</p>
                <p><span className="font-medium">Worst Case:</span> {algorithmInfo[selectedAlgorithm].timeComplexity.worst}</p>
              </div>
              <div>
                <p><span className="font-medium">Space Complexity:</span> {algorithmInfo[selectedAlgorithm].spaceComplexity}</p>
              </div>
            </div>
          </div>
        </div>

{/* Below is the main component that renders bars that have heights corresponding to the array values 
    height is calculated dynamically, based on the value and the color scheme is
     - Green: The bar is sorted.
     - Yellow: The bar is currently being compared.
     - Red: The bar is being swapped.
     - Blue: The bar is unsorted.  */}


        <div className="flex items-end justify-center h-64 gap-1 p-4 pt-0 bg-blur rounded">
          {array.map((value, idx) => (
            <div
              key={idx}
              style={{
                height: `${(value / maxValue) * 100}%`,
                width: `${Math.max(800 / arraySize - 2, 2)}px`,
              }}
              className={`transition-all duration-200 ${
                sortedIndices.includes(idx)
                  ? 'bg-green-500'
                  : currentIndices.includes(idx)
                  ? 'bg-yellow-500'
                  : swappingIndices.includes(idx)
                  ? 'bg-red-500'
                  : 'bg-blue-500'
              }`}
            ></div>
          ))}
        </div>
      </CardContent>
    </Card>
   
    </div>
  );
};

export default SortingVisualizer;