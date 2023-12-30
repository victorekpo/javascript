const originalArray = [{
  id: 1,
  items: [{
    id: 2,
    items: [{
      id: 3,
      items: []
    }]
  }]
}, {
  id: 4,
  items: [{
    id: 5,
    items: [{
      id: 6,
      items: []
    }]
  }]
}];

const limitNestedArray = (arr, limit) => {
  let count = 0;

  const customReducer = (accumulator, currentElement) => {
    if (count === limit) {
      // Break out early
      return accumulator;
    }

    count = count + 1;

    const newItem = { ...currentElement };
    newItem.items = [];

    if (currentElement.items && currentElement.items.length > 0) {
      for (const nestedItem of currentElement.items) {
        const temp = customReducer([], nestedItem);
        const emptyArray = Array.isArray(temp) && !temp.length;
        if (!emptyArray) newItem.items = [...newItem.items, temp];
      }
    }

    return newItem;
  };

  const customReduce = (array, reducer) => {
    // Exit early if limit = 0
    if (limit === 0) {
      return [];
    }

    let result = []; // start with an empty array

    for (const element of array) {
      result = [...result, reducer(result, element)];

      // Check breaking condition
      if (count === limit) {
        break;
      }
    }

    return result;
  };

  // Reverse the original array to get the most recent items
  const reversedArray = arr.slice().reverse();
  const truncatedReversedArray = customReduce(reversedArray, customReducer);
  const truncatedArray = truncatedReversedArray.slice().reverse(); // restore the order
  console.log(JSON.stringify(truncatedArray, null, 2));
  return truncatedArray;
};

limitNestedArray(originalArray, 2);
