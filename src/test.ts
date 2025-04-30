function MaxAndMin(arr: number[]): number[]{
    
    let max:number= arr[0];
    let min:number= arr[0];

    for(let i=1; i<arr.length; i++){

        if(max<arr[i])
            max= arr[i]

        
        if(min>arr[i])
            min=arr[i]
    }
    let newArr: number[] = [min,max];
    return newArr
}

function repeatNumbers(arr:number[]):number[]{
    let mapped: Map<number,number> = new Map;
    let resultArray :number[] =[];
    arr.forEach((value:number)=>{
        mapped.set(value,(mapped.get(value)||0)+1);
    })
    for(let [value,count] of mapped){
        if(count>1)
            resultArray.push(value);
    }
    return resultArray.sort((a,b)=>a-b);
}


function repeatNumbersAlt(arr: number[]): number[] {
    if (arr.length === 0) return [];
    
    arr.sort((a,b) => a-b);
    let resultArr: number[] = [];
    let temp: number = arr[0];
    let count: number = 1;
    
    for(let i = 1; i <= arr.length; i++) {
        if(i < arr.length && temp === arr[i]) {
            count++;
        } else {
            if(count > 1) {
                resultArr.push(temp);
            }
            if(i < arr.length) {
                temp = arr[i];
                count = 1;
            }
        }
    }
    
    return resultArr;
}

function findTarget(arr:number[] ,  target:number) : number[] {
    let seen = new Map<number,number>();
    for (let i=0; i<arr.length; i++){
        let complement :number= target-arr[i];
        if(seen.has(complement)){
            return[seen.get(complement)!,i]
        }
        seen.set(arr[i],i)
    }

        return[];
}

function isPalindrom(s:string):boolean  {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    if(s.length<2){
        return true;
    }
    
   let left = 0;
   let right = s.length-1;
   while(left<right){
    if(s[left]!==s[right]){
        return false;
    }
    left++;
    right--;

   }
   return true;  
}
function longestPalindrom(s: string): string {
    if(s.length < 2) return s;
    
    let start = 0;
    let maxLength = 1;
    
    // Her karakterden iki yöne doğru genişleme fonksiyonui
    function expandAroundCenter(left: number, right: number): void {
        while(left >= 0 && right < s.length && s[left] === s[right]) {
            const currentLength = right - left + 1;
            if(currentLength > maxLength) {
                start = left;
                maxLength = currentLength;
            }
            left--;
            right++;
        }
    }
    
   
    for(let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);    
        expandAroundCenter(i, i + 1);
    }
    
    return s.substring(start, start + maxLength);
}
 function firstRepeat(arr:number[]) :number{
    let result = 0;
    let map = new Map <number,number>;
    arr.forEach((value:number)=>{
        if(map.has(value)){
            return value;
        }
        map.set(value,1)
    })
    return -1;
 }
 function minMissingNumber(arr:number[]): number{
    let map = new Map<number,boolean>;
    for(let value of arr){
        if(value >0){
            map.set(value,true);
        }
    }
    let  i=0;
    while(map.has(i)){
        i++;
    }
    return i;
 }

 function  calculateFactorial(num:number):number {
    let result:number =0;
    for(let i=1; i<=num; i++){
        result*=i
    }

        return result;

 }
function main(){
 console.log(calculateFactorial(5));
}