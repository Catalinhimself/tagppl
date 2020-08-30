document.addEventListener("DOMContentLoaded", () => {
	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {
		// Add a click event on each of them
		$navbarBurgers.forEach((el) => {
			el.addEventListener("click", () => {
				// Get the target from the "data-target" attribute
				const target = el.dataset.target;
				const $target = document.getElementById(target);

				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle("is-active");
				$target.classList.toggle("is-active");
			});
		});
	}
	var quickLinks = document.querySelectorAll(".menu-list a");

	var positionArray = [],
		hashArray = [];

	for (var i = 0; i < quickLinks.length; i++) {
		hashArray.push(quickLinks[i].href.substring(quickLinks[i].href.indexOf("#") + 1));
	}

	for (var i = 0; i < hashArray.length; i++) {
		positionArray.push(document.getElementById(hashArray[i]).getBoundingClientRect().top);
	}

	function isActive1() {
		document.getElementsByClassName("is-active")[0];
	}

	document.addEventListener("scroll", scrollHandler, true);

	function scrollHandler() {
		currentScrollPosition = document.documentElement.scrollTop;
		//currentActivePosition = document.getElementsByClassName('is-active')[0].getBoundingClientRect().top;

		for (var i = 1; i <= positionArray.length; i++) {
			if (currentScrollPosition >= positionArray[i - 1] && currentScrollPosition < positionArray[i]) {
				var currentActive = document.getElementsByClassName("is-active")[0];

				if (currentActive != undefined) {
					currentActive.classList.remove("is-active");
				}

				quickLinks[i - 1].classList.add("is-active");

				break;
			}

			if (currentScrollPosition > positionArray[positionArray.length - 1]) {
				var currentActive = document.getElementsByClassName("is-active");

				var currentActive = document.getElementsByClassName("is-active")[0];

				if (currentActive != undefined) {
					currentActive.classList.remove("is-active");
				}
				quickLinks[quickLinks.length - 1].classList.add("is-active");

				break;
			}
		}
	}

	for (var i = 0; i < quickLinks.length; i++) {
		quickLinks[i].addEventListener("click", function(event) {
			document.removeEventListener("scroll", scrollHandler, true);

			/**
		for (var j=0; j<quickLinks.length; j++){
			if (quickLinks[j].classList.contains('is-active')){
				quickLinks[j].classList.remove('is-active');
			}
		}
		**/

			isActive = document.getElementsByClassName("is-active")[0];

			if (isActive != undefined) {
				isActive.classList.remove("is-active");
			}

			this.classList.add("is-active");

			setTimeout(function() {
				document.addEventListener("scroll", scrollHandler, true);
			}, 600);
		});
	}
});
