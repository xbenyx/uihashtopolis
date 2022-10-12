/**
 * Section for reusable functions
 *
 * Note: To use three-shaking is better do not use class
 * Comments use: https://tsdoc.org/
 */



/**
 * Converts file value to a more readable format
 *
 *
 * @param size - Value you want formatted
 * @returns Value in MB, GB, etc.. i.e 133.4 MB
 * ```
 * @public
 */

export function fileSizeValue(size: number): number | string {
  const units: string[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  const BASE_SIZE = 1024;
  let result: number | string = 0;

  if (size < 1 ) { return result = '0 B'; }

  const i = Math.floor(Math.log(size) / Math.log(BASE_SIZE))

  return `${parseFloat((size / Math.pow(BASE_SIZE, i)).toFixed(2))} ${units[i]}`

}

/**
 * Converts file value to a more readable format
 *
 *
 * @param size - Value you want formatted
 * @returns Value in MB, GB, etc.. i.e 133.4 MB
 * ```
 * @public
 */


// export function isFileMoreThanLimit(fileSize: number, fromUnit: string, toUnit: string , limit: number) {
//   return fileSizeConverter(fileSize, fromUnit, toUnit) > limit;
// }


/**
 * Validate the file extension
 * Notes: This function is not in place but it could be usefule in the section of files
 *
 * @param filename - File name with extension (.xls, .txt)
 * @returns true or false
 * ```
 * @beta
 */

export function validateFileExt(filename: string): boolean {
  const filext = filename.split('.').pop();
  switch (filext.toLowerCase()){
    case 'zip':
    case 'dic':
    case 'txt':
      // Add more extensions
      return true;
  }
  return false;
}






