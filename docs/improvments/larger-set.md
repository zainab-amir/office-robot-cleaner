## Unique Places Service: Large Set Implementation

The service currently uses `Set` to accomplish keeping track of the unique places. The max size exception is reached 
approximately after 16,600,000 unique places have been cleaned. There are ways to increase the system allocation by 
increasing memory for Node.js runtime as `Set` in Javascript technically doesn't have a limit. 

Another solution I explored was to create a custom `LargeSet` data structure. Below is a minimal implementation of 
`LargeSet`. Its trades performance for memory efficiency and that's why I did not end up using it.

```typescript
class LargeSet<T> {
  size: number;

  private chunks: Set<T>[];
  private readonly chunkSize: number;

  constructor() {
    this.chunks = [new Set<T>()];
    this.chunkSize = 1500000;
    this.size = 0;
  }

  add(value: T) {
    if (!this.has(value)) {
      const lastChunk = this.chunks[this.chunks.length - 1];
      if (lastChunk.size >= this.chunkSize) {
        this.chunks.push(new Set());
      }
      this.chunks[this.chunks.length - 1].add(value);
      this.size++;
    }
    return this;
  }

  has(value: T) {
    return this.chunks.some((chunk) => chunk.has(value));
  }

  delete(value: T) {
    for (const chunk of this.chunks) {
      if (chunk.delete(value)) {
        return true;
      }
    }
    return false;
  }
}

export default LargeSet;
```
