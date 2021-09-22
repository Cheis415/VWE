const fetchData = (callBack) => {
	const cardContainer = document.getElementById('cardsContainer');
	fetch('https://www.vwewebtest.com/wines/array.php')
		.then((res) => res.json())
		.then((data) => {
			let products =
				data.product_listing.sort(callBack) || data.product_listing;
			let output = '';
			for (let product of products) {
				let productUrl = validURL(`${product.bottle_shot}`);
				output += `<div class="cards" style="width: 18rem;">
					<div class="card-body">
						<h3 class="card-title">${product.varietal}</h3>
						<ul>
							<li>- ${product.vintage}</li>
							<li>- $${product.base_price}.00</li>
							<li>- ${product.abv}% alc/vol</li>
							<li>- ${product.bottle_size}</li>
						</ul>
					</div>
					<img id="image" src=${productUrl} class="card-img-top" alt="bottle of ${product.manufacturer} ${product.varietal}"/>
				</div>`;
			}

			cardContainer.innerHTML = output;
			return output;
		});
};

//Helper function using Regex to check if the url for image is correct

function validURL(str) {
	const validStr = str.replace(/find/g, 'found');
	const pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	); // fragment locator
	return pattern.test(validStr)
		? validStr
		: 'https://www.firesteed.com/common/images/products/fs-2015-pinot-gris-mainLg.png';
}

/************************** Sort by vintage helper functions and event listeners ************************/

const byVintageAsc = (a, b) => {
	if (a.vintage > b.vintage) return 1;
	if (a.vintage < b.vintage) return -1;

	return 0;
};

const byVintageDesc = (a, b) => {
	if (a.vintage < b.vintage) return 1;
	if (a.vintage > b.vintage) return -1;

	return 0;
};

const orderByVintageAsc = () => {
	document
		.getElementsByClassName('vintageUp')
		.addEventListener('click', fetchData(byVintageAsc));
};

const orderByVintageDesc = () => {
	document
		.getElementsByClassName('vintageDwn')
		.addEventListener('click', fetchData(byVintageDesc));
};

/************************** Sort by varietal helper functions and event listeners ************************/

const byVarietalAsc = (a, b) => {
	if (a.varietal > b.varietal) return 1;
	if (a.varietal < b.varietal) return -1;

	return 0;
};

const byVarietalDesc = (a, b) => {
	if (a.varietal < b.varietal) return 1;
	if (a.varietal > b.varietal) return -1;

	return 0;
};

const orderByVarietalAsc = () => {
	document
		.getElementsByClassName('varietalUp')
		.addEventListener('click', fetchData(byVarietalAsc));
};

const orderByVarietalDesc = () => {
	document
		.getElementsByClassName('varietalDwn')
		.addEventListener('click', fetchData(byVarietalDesc));
};

/************************** Sort by price helper functions and event listeners ************************/

const byPriceAsc = (a, b) => {
	if (a.base_price > b.base_price) return 1;
	if (a.base_price < b.base_price) return -1;

	return 0;
};

const byPriceDesc = (a, b) => {
	if (a.base_price < b.base_price) return 1;
	if (a.base_price > b.base_price) return -1;

	return 0;
};

const orderByPriceAsc = () => {
	document
		.getElementsByClassName('priceUp')
		.addEventListener('click', fetchData(byPriceAsc));
};

const orderByPriceDesc = () => {
	document
		.getElementsByClassName('priceDwn')
		.addEventListener('click', fetchData(byPriceDesc));
};

/************************** Sort by ABV helper functions and event listeners ************************/

const byAbvAsc = (a, b) => {
	if (a.abv > b.abv) return 1;
	if (a.abv < b.abv) return -1;

	return 0;
};

const byAbvDesc = (a, b) => {
	if (a.abv < b.abv) return 1;
	if (a.abv > b.abv) return -1;

	return 0;
};

const orderByAbvAsc = () => {
	document
		.getElementsByClassName('abvUp')
		.addEventListener('click', fetchData(byAbvAsc));
};

const orderByAbvDesc = () => {
	document
		.getElementsByClassName('abvDwn')
		.addEventListener('click', fetchData(byAbvDesc));
};

const smoothScroll = (dest) => {
	// Define selector for selecting
	// anchor links with the hash
	let anchorSelector = a[(href ^= `#${dest}`)];

	// Collect all such anchor links
	let anchorList = document.querySelectorAll(anchorSelector);

	// Iterate through each of the links
	anchorList.forEach((link) => {
		link.onclick = function (e) {
			// Prevent scrolling if the
			// hash value is blank
			e.preventDefault();

			// Get the destination to scroll to
			// using the hash property
			let destination = document.querySelector(this.hash);
			const yoffSet = -15;
			let y =
				destination.getBoundingClientRect().top + window.pageYOffset + yOffset;
			// Scroll to the destination
			destination.scrollTo({
				top: y,
				behavior: 'smooth',
			});
		};
	});
};

//Functions for scroll button in the sort bar

const showButtonUp = () => {
	document.querySelector('.sortScroll1').classList.remove('hide');
	document.querySelector('.sortScroll2').classList.add('hide');
};

const showButtonDwn = () => {
	document.querySelector('.sortScroll2').classList.remove('hide');
	document.querySelector('.sortScroll1').classList.add('hide');
};

document.addEventListener('scroll', (e) =>
	window.scrollY < 100 ? showButtonUp() : showButtonDwn()
);

//Call fetchdata on load in order to fill div with cards on load
fetchData();
