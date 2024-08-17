const localStorageShortcutLinks = JSON.parse(localStorage.getItem("shortcutLinks")) || "false";
let shortcutLinks = [new ShortcutLink("Youtube", "https://www.youtube.com")];;

if (localStorageShortcutLinks !== "false") {
    shortcutLinks = [];
    localStorageShortcutLinks.forEach((shortcutLink) => {
        shortcutLinks.push(new ShortcutLink(shortcutLink.title, shortcutLink.url));
    });
};
 
const shortcutLinksView = document.getElementById("shortcut-links-view");

const searchInput = document.getElementById("search-input");
const searchInputLogo = document.getElementById("search-input-logo");

renderShortcutLInks();

searchInputLogo.addEventListener("click", () => {
    searchTheWeb(searchInput.value);
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchTheWeb(searchInput.value);
    };
});

function searchTheWeb(query) {
    if (query.trim() !== "") {
        window.location.href = `https://searx.hu/search?q=${query}`;
    };
};

function ShortcutLink(title, url) {
    this.title = title;
    this.url = url;
};

ShortcutLink.prototype.goToUrl = function() {
    window.location.href = this.url;
};

function saveShortcutLinks() {
    localStorage.setItem("shortcutLinks", JSON.stringify(shortcutLinks));
};

function renderShortcutLInks() {
    if (shortcutLinks.length <= 5) {
        shortcutLinksView.innerHTML = "";
        shortcutLinks.forEach((shortcutLink) => {
            const shortcutLinkElement = document.createElement("div");
            shortcutLinkElement.classList.add("shortcut-link-element");

            shortcutLinkElement.innerHTML = `
            <div class="tile">
                <img src="https://www.google.com/s2/favicons?domain=${shortcutLink.url}&sz=48"  width="38" height="38">
            </div>
            <span class="title">
                ${shortcutLink.title}
            </span>
            `;

            shortcutLinksView.appendChild(shortcutLinkElement);

            shortcutLinkElement.addEventListener("click", () => {
                shortcutLink.goToUrl();
            });
        });

        const addShortcutLinkButton = document.createElement("div");
        addShortcutLinkButton.id = "add-shortcut-link-button";
        addShortcutLinkButton.innerHTML = `
        <div class="tile">
            <span>+</span>
        </div>
        <span class="title">Add shortcut</span>
        `;

        shortcutLinksView.appendChild(addShortcutLinkButton);

        addShortcutLinkButton.addEventListener("click", () => {
            if (shortcutLinks.length <= 4) {
                const title = prompt("Give this shortcut a name");

                if (title && title.trim() !== "") {
                    let url = prompt("Give the website url");

                    if (url && url.trim() !== "") {
                        if (url.substring(0, 7) === "http://" || url.substring(0, 8) === "https://") {
                            // console.log(url.substring(0, 5))
                        } else {
                            url = "http://" + url;
                        };
        
                        shortcutLinks.push(new ShortcutLink(title, url));
                        renderShortcutLInks();
                        saveShortcutLinks();
                    }
                };
            };
        });
    };
};