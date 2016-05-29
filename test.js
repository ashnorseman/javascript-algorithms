/**
 * Created by Ash on 2016-5-29.
 */


{

  /**
   * Sorting test
   * @param {string} sortName
   */
  function testSorting(sortName) {
    let array;

    switch (sortName) {
    case 'count':
      array = [2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2];
      break;
    case 'radix':
      array = [3221, 1, 10, 9680, 577, 9420, 7, 5622, 4793, 2030, 3138, 82, 2599, 743, 4127];
      break;
    default:
      array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
    }

    const startTime = Date.now(),
      result = Sorting[sortName](array);

    console.log(`${sortName} sorting: `, result, Date.now() - startTime);
  }

  testSorting('bubble');
  testSorting('select');
  testSorting('insert');
  testSorting('merge');
  testSorting('quick');
  testSorting('randomQuick');
  testSorting('count');
  testSorting('radix');
}
