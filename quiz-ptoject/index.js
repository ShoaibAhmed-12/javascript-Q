// Data
const products = [
    {
        id: 1,
        image: "./images/products/burger.png",
        title: "Burger1",
        description: "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
        price: 100,
        category: "Burger",
        rating: 5,
    },
    {
        id: 2,
        image: "./images/products/shawarma.jpg",
        title: "Shawarma1",
        description: "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
        price: 200,
        category: "Shawarma",
        rating: 4,
    },
    {
        id: 3,
        image: "./images/products/piz.jpg",
        title: "Pizza1",
        description: "Crispy zinger with crispy rolled into paratha",
        price: 300,
        category: "Pizza",
        rating: 3,
    },
    {
        id: 4,
        image: "./images/products/burger.png",
        title: "Burger2",
        description: "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
        price: 400,
        category: "Burger",
        rating: 2,
    },
    {
        id: 5,
        image: "./images/products/shawarma.jpg",
        title: "Shawarma2",
        description: "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
        price: 500,
        category: "Shawarma",
        rating: 1,
    },
    {
        id: 6,
        image: "./images/products/piz.jpg",
        title: "Pizza2",
        description: "Crispy zinger with crispy rolled into paratha",
        price: 600,
        category: "Pizza",
        rating: 5,
    },
    {
        id: 7,
        image: "./images/products/burger.png",
        title: "Burger3",
        description: "Enjoy the crispy chiken fillet in a soft bun with spicy mayo and our signature sauce",
        price: 700,
        category: "Burger",
        rating: 4,
    },
    {
        id: 8,
        image: "./images/products/shawarma.jpg",
        title: "Shawarma3",
        description: "Aromatic arabian rice with 6 pacs of hot shots with KFC famous vietnamese sauce",
        price: 800,
        category: "Shawarma",
        rating: 3,
    },
    {
        id: 9,
        image: "./images/products/piz.jpg",
        title: "Pizza3",
        description: "Crispy zinger with crispy rolled into paratha",
        price: 900,
        category: "Pizza",
        rating: 2,
    },
];

const categories = [
    { id: 1, title: 'Burger', image: '' },
    { id: 2, title: 'Shawarma', image: '' },
    { id: 3, title: 'Pizza', image: '' }
];

const categoryTitle = categories.map(category => category.title);

// Find Price Range (min-max)
const findRange = () => {
    let min = products[0].price;
    let max = 0;
    products.forEach((product) => {
        if (product.price < min) min = product.price;
        if (product.price > max) max = product.price;
    });
    return { min, max };
};

const priceRange = findRange();

// State Management
let selectedCategory = [];
let selectedPrice = {
    min: priceRange.min,
    max: priceRange.max,
    isApplied: false
};
let selectedRating = '';
let initPriceRange = {
    min: priceRange.min,
    max: priceRange.max,
    isApplied: false
};
let sortBy = "RatingHighToLow";
let currentPage = 1;
let itemsPerPage = 8;
let isClear = false;

// DOM Elements
const categoryFilterEl = document.getElementById('categoryFilter');
const priceFilterEl = document.getElementById('priceFilter');
const ratingFilterEl = document.getElementById('ratingFilter');
const appliedFiltersEl = document.getElementById('appliedFilters');
const productsGridEl = document.getElementById('productsGrid');
const sortSelectEl = document.getElementById('sortSelect');
const itemsPerPageSelectEl = document.getElementById('itemsPerPageSelect');
const paginationEl = document.getElementById('pagination');
const resultsCountEl = document.getElementById('resultsCount');
const themeToggleEl = document.getElementById('themeToggle');
const themeIconEl = document.getElementById('themeIcon');

// Filter Functions
const getFilterData = (data, selectedCategory, selectedPriceRange, selectedRating) => {
    return data.filter((product) => {
        // category filter
        let categoryMatch = true;
        if (selectedCategory.length && product.category) {
            categoryMatch = selectedCategory.includes(product.category);
        }

        // price filter
        let priceMatch = true;
        let { min, max, isApplied } = selectedPriceRange;
        if (isApplied && product.price) {
            priceMatch = product.price >= min && product.price <= max;
        }

        // rating filter
        let ratingMatch = true;
        if (selectedRating && product.rating) {
            ratingMatch = product.rating >= selectedRating;
        }

        return categoryMatch && priceMatch && ratingMatch;
    });
};

const getSortData = (data, sortBy) => {
    return data.sort((product1, product2) => {
        if (sortBy === "PriceHighToLow") {
            return product1.price > product2.price ? -1 : 1;
        } else if (sortBy === "PriceLowToHigh") {
            return product1.price < product2.price ? -1 : 1;
        } else if (sortBy === "RatingLowToHigh") {
            return product1.rating < product2.rating ? -1 : 1;
        } else {
            // default 'RatingHighToLow'
            return product1.rating > product2.rating ? -1 : 1;
        }
    });
};

const getVisibleProduct = (selectedCategory, selectedPrice, selectedRating, sortBy) => {
    let filteredProducts = products;

    if (selectedCategory.length || selectedPrice.isApplied || selectedRating) {
        filteredProducts = getFilterData(filteredProducts, selectedCategory, selectedPrice, selectedRating);
    }

    filteredProducts = getSortData(filteredProducts, sortBy);

    const total = filteredProducts.length;
    return { products: filteredProducts, total };
};

// Pagination Helpers
const paginate = (data, page, perPage) => {
    const total = data.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const clampedPage = Math.min(Math.max(1, page), totalPages);
    const start = (clampedPage - 1) * perPage;
    const end = Math.min(start + perPage, total);
    return {
        items: data.slice(start, end),
        total,
        totalPages,
        clampedPage,
        startIndex: total === 0 ? 0 : start + 1,
        endIndex: end
    };
};

// Event Handlers
const onChangeCategory = (category, isChecked) => {
    if (isChecked) {
        selectedCategory = [...selectedCategory, category];
    } else {
        selectedCategory = selectedCategory.filter(cat => cat !== category);
    }
    currentPage = 1;
    renderAll();
};

const onChangePrice = (min, max, isClear) => {
    if (isClear) {
        selectedPrice = initPriceRange;
        initPriceRange = {
            min: priceRange.min,
            max: priceRange.max,
            isApplied: false
        };
        isClear = true;
        currentPage = 1;
        renderAll();
        return;
    }

    if (min === priceRange.min && max === priceRange.max) {
        selectedPrice = initPriceRange;
    } else {
        selectedPrice = {
            min,
            max,
            isApplied: true
        };
    }
    isClear = false;
    currentPage = 1;
    renderAll();
};

const onChangeRatingHandler = (rating) => {
    if (rating === "clear") {
        selectedRating = "";
    } else {
        selectedRating = rating;
    }
    currentPage = 1;
    renderAll();
};

const onClearAllHandler = () => {
    selectedCategory = [];
    selectedPrice = {
        min: priceRange.min,
        max: priceRange.max,
        isApplied: false
    };
    initPriceRange = {
        min: priceRange.min,
        max: priceRange.max,
        isApplied: false
    };
    selectedRating = '';
    isClear = true;
    currentPage = 1;
    renderAll();
};

// Render Functions
const renderCategoryFilter = () => {
    categoryFilterEl.innerHTML = categoryTitle.map(category => `
        <div class="relative flex items-center">
            <div class="flex items-center h-5">
                <input
                    type="checkbox"
                    class="w-4 h-4 rounded cursor-pointer"
                    ${selectedCategory.includes(category) ? 'checked' : ''}
                    onchange="onChangeCategory('${category}', this.checked)"
                />
            </div>
            <label class="ml-3 text-md text-white cursor-pointer font-medium">
                ${category}
            </label>
        </div>
    `).join('');
};

const renderPriceFilter = () => {
    priceFilterEl.innerHTML = `
        <div class="flex justify-center items-center">
            <input
                type="range"
                min="${priceRange.min}"
                max="${priceRange.max}"
                value="${selectedPrice.min}"
                step="2"
                class="thumb thumb--zindex-3"
                onchange="updatePriceRange('min', this.value)"
            />
            <input
                type="range"
                min="${priceRange.min}"
                max="${priceRange.max}"
                value="${selectedPrice.max}"
                step="2"
                class="thumb thumb--zindex-4"
                onchange="updatePriceRange('max', this.value)"
            />
            <div class="slider">
                <div class="slider__track"></div>
                <div class="slider__range" id="priceRange"></div>
                <div class="slider__left-value">${selectedPrice.min}</div>
                <div class="slider__right-value">${selectedPrice.max}</div>
            </div>
        </div>
    `;
    updatePriceRangeDisplay();
};

const updatePriceRange = (type, value) => {
    if (type === 'min') {
        selectedPrice.min = Math.min(parseInt(value), selectedPrice.max - 1);
    } else {
        selectedPrice.max = Math.max(parseInt(value), selectedPrice.min + 1);
    }
    updatePriceRangeDisplay();
    onChangePrice(selectedPrice.min, selectedPrice.max);
};

const updatePriceRangeDisplay = () => {
    const range = document.getElementById('priceRange');
    if (range) {
        const minPercent = Math.round(((selectedPrice.min - priceRange.min) / (priceRange.max - priceRange.min)) * 100);
        const maxPercent = Math.round(((selectedPrice.max - priceRange.min) / (priceRange.max - priceRange.min)) * 100);
        range.style.left = `${minPercent}%`;
        range.style.width = `${maxPercent - minPercent}%`;
    }
};

const renderRatingFilter = () => {
    ratingFilterEl.innerHTML = [5, 4, 3, 2, 1].map(rating => `
        <div class="flex items-center gap-2 cursor-pointer" onclick="onChangeRatingHandler(${rating})">
            <div class="flex justify-start">
                ${Array(5).fill().map((_, i) => `
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'} ${rating == selectedRating ? 'text-[#ff3d47]' : ''}"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                `).join('')}
            </div>
            <p class="text-gray-400">
                ${rating === 5 ? 5.0 : rating.toFixed(1) + " +"}
            </p>
        </div>
    `).join('');
};

const renderAppliedFilters = () => {
    let isAnyFilter = selectedCategory.length + (selectedPrice.isApplied ? 1 : 0) + (selectedRating ? 1 : 0);

    if (!isAnyFilter) {
        appliedFiltersEl.innerHTML = '';
        return;
    }

    let chips = '<span class="muted">Filtered By: </span>';

    // Category chips
    selectedCategory.forEach(item => {
        chips += `
            <span class="px-3 py-1 rounded-full chip font-medium text-xs flex align-center w-max cursor-pointer transition">
                ${item}
                <button class="bg-transparent hover focus:outline-none ml-3" onclick="onChangeCategory('${item}', false)">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="w-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                        <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                    </svg>
                </button>
            </span>
        `;
    });

    // Price chip
    if (selectedPrice.isApplied) {
        chips += `
            <span class="px-3 py-1 rounded-full chip font-medium text-xs flex align-center w-max cursor-pointer transition">
                Price: ${selectedPrice.min}-${selectedPrice.max}
                <button class="bg-transparent hover focus:outline-none ml-3" onclick="onChangePrice('', '', true)">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="w-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                        <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                    </svg>
                </button>
            </span>
        `;
    }

    // Rating chip
    if (selectedRating) {
        chips += `
            <span class="px-3 py-1 rounded-full chip font-medium text-xs flex align-center w-max cursor-pointer transition">
                Rating: ${selectedRating} ${selectedRating == 5 ? '' : '& Up'}
                <button class="bg-transparent hover focus:outline-none ml-3" onclick="onChangeRatingHandler('clear')">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="w-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                        <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                    </svg>
                </button>
            </span>
        `;
    }

    // Clear all chip
    if (isAnyFilter) {
        chips += `
            <span class="px-3 py-1 rounded-full chip font-medium text-xs flex align-center w-max cursor-pointer transition" onclick="onClearAllHandler()">
                clear all
            </span>
        `;
    }

    appliedFiltersEl.innerHTML = `<div class="flex flex-wrap items-center space-x-2">${chips}</div>`;
};

const renderProducts = () => {
    const { products: visibleProducts } = getVisibleProduct(selectedCategory, selectedPrice, selectedRating, sortBy);
    const { items, totalPages, clampedPage, startIndex, endIndex, total } = paginate(visibleProducts, currentPage, itemsPerPage);

    // results count
    if (resultsCountEl) {
        resultsCountEl.innerHTML = total === 0
            ? `No items found`
            : `Showing ${startIndex}–${endIndex} of ${total} items`;
    }

    // grid
    productsGridEl.innerHTML = items.map(product => `
        <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <div class="rounded-xl panel border hover:border-neutral-700 transition-colors">
                <div class="flex flex-col">
                    <img
                        src="${product.image}"
                        alt="${product.title}"
                        class="object-cover rounded-t-xl z-[1] opacity-90 hover:opacity-100 transition-opacity w-full h-[220px]"
                    />
                    <div class="relative p-4 space-y-2 h-52">
                        <h1 class="heading font-semibold text-lg tracking-tight">${product.title}</h1>
                        <div class="flex items-center gap-2">
                            <div class="flex justify-start">
                                ${Array(5).fill().map((_, i) => `
                                    <svg
                                        aria-hidden="true"
                                        class="w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-500'}"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                `).join('')}
                            </div>
                            <span class="text-xs text-gray-400">(${product.rating})</span>
                        </div>
                        <p class="max-h-24 overflow-auto text-sm text-gray-300 leading-relaxed">${product.description}</p>
                        <div class="absolute bottom-3 left-0 px-4 right-0 w-full flex justify-between items-center">
                            <span class="heading text-base font-semibold">$${product.price}</span>
                            <button class="icon-button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    renderPagination(totalPages, clampedPage);
};

const renderPagination = (totalPages, page) => {
    if (!paginationEl) return;
    if (totalPages <= 1) {
        paginationEl.innerHTML = '';
        return;
    }

    const createButton = (label, targetPage, disabled = false, active = false) => {
        const base = 'px-3 py-1 text-sm rounded-md btn';
        const cls = active ? `${base} btn-active` : base;
        return `<button class="${cls}" ${disabled ? 'disabled' : ''} onclick="goToPage(${targetPage})">${label}</button>`;
    };

    const createEllipsis = () => `<span class="px-2 muted">…</span>`;

    let html = '';
    html += createButton('Prev', Math.max(1, page - 1), page === 1);

    if (totalPages <= 7) {
        for (let p = 1; p <= totalPages; p++) {
            html += createButton(p, p, false, p === page);
        }
    } else {
        html += createButton(1, 1, false, page === 1);
        if (page > 3) html += createEllipsis();

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);
        for (let p = start; p <= end; p++) {
            html += createButton(p, p, false, p === page);
        }

        if (page < totalPages - 2) html += createEllipsis();
        html += createButton(totalPages, totalPages, false, page === totalPages);
    }

    html += createButton('Next', Math.min(totalPages, page + 1), page === totalPages);
    paginationEl.innerHTML = html;
};

// Pagination navigation API (used by inline onclicks)
window.goToPage = (page) => {
    currentPage = page;
    renderAll();
};

const renderAll = () => {
    renderCategoryFilter();
    renderPriceFilter();
    renderRatingFilter();
    renderAppliedFilters();
    renderProducts();
};

// Event Listeners
sortSelectEl.addEventListener('change', (e) => {
    sortBy = e.target.value;
    currentPage = 1;
    renderAll();
});

if (itemsPerPageSelectEl) {
    itemsPerPageSelectEl.addEventListener('change', (e) => {
        const value = parseInt(e.target.value, 10);
        itemsPerPage = isNaN(value) ? 8 : value;
        currentPage = 1;
        renderAll();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // initialize controls
    if (itemsPerPageSelectEl) {
        itemsPerPageSelectEl.value = String(itemsPerPage);
    }
    // init theme from localStorage or prefers-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        document.body.classList.add('theme-light');
        if (themeIconEl) themeIconEl.textContent = '🌚';
    } else {
        document.body.classList.remove('theme-light');
        if (themeIconEl) themeIconEl.textContent = '🌙';
    }
    renderAll();
});

// Theme toggle
if (themeToggleEl) {
    themeToggleEl.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('theme-light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        if (themeIconEl) themeIconEl.textContent = isLight ? '🌚' : '🌙';
    });
}
