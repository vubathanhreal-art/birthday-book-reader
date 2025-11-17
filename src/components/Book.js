class Book {
    constructor(pages) {
        this.pages = pages;
        this.currentPageIndex = 0;
    }

    getCurrentPage() {
        return this.pages[this.currentPageIndex];
    }

    nextPage() {
        if (this.currentPageIndex < this.pages.length - 1) {
            this.currentPageIndex++;
        }
    }

    previousPage() {
        if (this.currentPageIndex > 0) {
            this.currentPageIndex--;
        }
    }

    goToPage(index) {
        if (index >= 0 && index < this.pages.length) {
            this.currentPageIndex = index;
        }
    }

    getTotalPages() {
        return this.pages.length;
    }
}

export default Book;