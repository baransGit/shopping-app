function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
const handleInput = debounce((event: Event) => {
  const input = event.target as HTMLInputElement;
  console.log(input.value);
}, 300);

function curry<T1, T2, R>(fn: (a: T1, b: T2) => R) {
  return function (a: T1) {
    return function (b: T2) {
      return fn(a, b);
    };
  };
}

function compose2<A, B, C>(f: (x: B) => C, g: (x: A) => B): (x: A) => C {
  return function (x: A): C {
    return f(g(x));
  };
}
