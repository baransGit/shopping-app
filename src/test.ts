function MaxAndMin(arr: number[]): number[] {
  let max: number = arr[0];
  let min: number = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (max < arr[i]) max = arr[i];

    if (min > arr[i]) min = arr[i];
  }
  let newArr: number[] = [min, max];
  return newArr;
}

function repeatNumbers(arr: number[]): number[] {
  let mapped: Map<number, number> = new Map();
  let resultArray: number[] = [];
  arr.forEach((value: number) => {
    mapped.set(value, (mapped.get(value) || 0) + 1);
  });
  for (let [value, count] of mapped) {
    if (count > 1) resultArray.push(value);
  }
  return resultArray.sort((a, b) => a - b);
}

function repeatNumbersAlt(arr: number[]): number[] {
  if (arr.length === 0) return [];

  arr.sort((a, b) => a - b);
  let resultArr: number[] = [];
  let temp: number = arr[0];
  let count: number = 1;

  for (let i = 1; i <= arr.length; i++) {
    if (i < arr.length && temp === arr[i]) {
      count++;
    } else {
      if (count > 1) {
        resultArr.push(temp);
      }
      if (i < arr.length) {
        temp = arr[i];
        count = 1;
      }
    }
  }

  return resultArr;
}

function findTarget(arr: number[], target: number): number[] {
  let seen = new Map<number, number>();
  for (let i = 0; i < arr.length; i++) {
    let complement: number = target - arr[i];
    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }
    seen.set(arr[i], i);
  }

  return [];
}

function isPalindrom(s: string): boolean {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (s.length < 2) {
    return true;
  }

  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}
function longestPalindrom(s: string): string {
  if (s.length < 2) return s;

  let start = 0;
  let maxLength = 1;

  // Function to expand in both directions from each character
  function expandAroundCenter(left: number, right: number): void {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLength = right - left + 1;
      if (currentLength > maxLength) {
        start = left;
        maxLength = currentLength;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i);
    expandAroundCenter(i, i + 1);
  }

  return s.substring(start, start + maxLength);
}
function firstRepeat(arr: number[]): number {
  let result = 0;
  let map = new Map<number, number>();
  arr.forEach((value: number) => {
    if (map.has(value)) {
      return value;
    }
    map.set(value, 1);
  });
  return -1;
}
function minMissingNumber(arr: number[]): number {
  let map = new Map<number, boolean>();
  for (let value of arr) {
    if (value > 0) {
      map.set(value, true);
    }
  }
  let i = 0;
  while (map.has(i)) {
    i++;
  }
  return i;
}

function calculateFactorial(num: number): number {
  let result: number = 0;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }

  return result;
}
function main() {
  console.log(calculateFactorial(5));
}

function activityNotifications(expenditure: number[], d: number): number {
  let notifications = 0;
  const counts = new Array(201).fill(0); // Array for numbers between 0-200

  // STEP 1: Count the first d days
  console.log("Initial state - counts:", counts);

  for (let i = 0; i < d; i++) {
    counts[expenditure[i]]++; // Increment frequency of each number
    console.log(
      `Day ${i + 1}: For number ${expenditure[i]}, counts[${
        expenditure[i]
      }] = ${counts[expenditure[i]]}`
    );
  }

  console.log("Counts after first d days:", counts);

  // STEP 2: Continue with sliding window
  for (let i = d; i < expenditure.length; i++) {
    const median = getMedian(counts, d);

    if (expenditure[i] >= median * 2) {
      notifications++;
    }

    // Sliding window update:
    console.log(`\nDay ${i + 1} sliding window update:`);
    console.log(`Removed: expenditure[${i - d}] = ${expenditure[i - d]}`);
    counts[expenditure[i - d]]--; // Remove oldest day
    console.log(`Added: expenditure[${i}] = ${expenditure[i]}`);
    counts[expenditure[i]]++; // Add new day
  }

  return notifications;
}

// Median calculation function
function getMedian(counts: number[], d: number): number {
  let count = 0;

  // Even number of days
  if (d % 2 === 0) {
    let first = -1;
    let second = -1;

    for (let i = 0; i < counts.length; i++) {
      count += counts[i];
      if (first === -1 && count >= d / 2) first = i;
      if (second === -1 && count >= d / 2 + 1) {
        second = i;
        return (first + second) / 2;
      }
    }
  }
  // Odd number of days
  else {
    const target = Math.floor(d / 2) + 1;
    for (let i = 0; i < counts.length; i++) {
      count += counts[i];
      if (count >= target) {
        return i;
      }
    }
  }
  return 0;
}

console.log("\nExample 1 - Activity Notifications:");
const expenditure1 = [2, 3, 4, 2, 3, 6, 8, 4, 5];
const d1 = 5;
console.log("Input:", expenditure1, "d =", d1);
console.log("Output:", activityNotifications(expenditure1, d1));

console.log("\nExample 2 - Activity Notifications:");
const expenditure2 = [1, 2, 3, 4, 4];
const d2 = 4;
console.log("Input:", expenditure2, "d =", d2);
console.log("Output:", activityNotifications(expenditure2, d2));

console.log("\nExample 3 - Repeating numbers:");

// Example of finding median using counting sort
function findMedianExample(arr: number[]): number {
  // Create counting array
  const counts = new Array(201).fill(0);

  // Count frequencies
  for (const num of arr) {
    counts[num]++;
  }

  // Find median
  const target = Math.floor(arr.length / 2);
  let count = 0;

  for (let i = 0; i < counts.length; i++) {
    count += counts[i];
    if (count > target) {
      return i;
    }
  }

  return 0;
}

// Example usage
const arr = [1, 2, 3, 4, 5];
console.log("Input array:", arr);
console.log("Median:", findMedianExample(arr));
