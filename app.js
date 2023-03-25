document.getElementById('app').insertAdjacentHTML('afterbegin', 'Baum');

// this is a comment ah yes joa

console.log("ÄÄh nein");

/**
 * Returns the next available child index of an array of objects, based on a given property.
 *
 * @param {Array} array - The array of objects to check.
 * @param {string} data - The path to the property to check for an index, in dot notation (e.g. 'dataset.planet').
 * @returns {number} - The next available child index.
 */
function getChildIndex(array, data) {
	const IDs = [0];	// dummy element to avoid if statement
	for (const element of array) {
		const idNumber = extractNumber(fetchFromObject(element, data));	// get all numbers of the string into an array, then join that array
		IDs.push(parseInt(idNumber));
	}
	function compareNumbers(a, b) {
		return a - b;
	}
	IDs.sort(compareNumbers);
	return IDs[IDs.length - 1] + 1;

	// necessary to access properties of different depths of an element
	// takes an object and a string representing the path to the property in dot notation ('dataset.planet')
	// code from https://stackoverflow.com/questions/4255472/javascript-object-access-variable-property-by-name-as-string
	function fetchFromObject(obj, prop) {
		//property not found
		if (typeof obj === 'undefined') return false;

		//index of next property split
		const index = prop.indexOf('.');

		//property split found; recursive call
		if (index > -1) {
			//get object at property (before split), pass on remainder
			return fetchFromObject(obj[prop.substring(0, index)], prop.substr(index + 1));
		}

		//no split; get property
		return obj[prop];
	}
}
