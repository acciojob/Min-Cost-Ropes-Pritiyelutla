class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Helper methods
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  getRightChildIndex(index) {
    return index * 2 + 2;
  }

  // Add an element to the heap
  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  // Heapify up to maintain heap property
  heapifyUp() {
    let index = this.heap.length - 1;
    while (this.getParentIndex(index) >= 0 && this.heap[this.getParentIndex(index)] > this.heap[index]) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  // Remove and return the minimum element
  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  // Heapify down to maintain heap property
  heapifyDown() {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (this.getRightChildIndex(index) < this.heap.length && this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      if (this.heap[index] < this.heap[smallerChildIndex]) {
        break;
      }
      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  // Swap two elements in the heap
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  // Check if the heap is empty
  isEmpty() {
    return this.heap.length === 0;
  }
}

function minimumCostRopes(ropes) {
  const minHeap = new MinHeap();
  let totalCost = 0;

  // Insert all ropes into the Min-Heap
  for (let rope of ropes) {
    minHeap.insert(rope);
  }

  // Keep connecting ropes until only one rope remains
  while (minHeap.heap.length > 1) {
    const first = minHeap.extractMin();
    const second = minHeap.extractMin();
    const cost = first + second;
    totalCost += cost;
    minHeap.insert(cost);
  }

  return totalCost;
}


module.exports=minimumCostRopes;
