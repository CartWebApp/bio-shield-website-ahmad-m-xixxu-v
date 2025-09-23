const searchInput = document.getElementById("searchInput");
const dropdownList = document.getElementById("dropdownList");
const productLink = document.getElementById("productLink");
const items = dropdownList.getElementsByTagName("li");

searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase();
  dropdownList.style.display = filter ? "block" : "none";
  productLink.style.display = "block";

  Array.from(items).forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(filter) ? "block" : "none";
  });
});

dropdownList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const selectedText = e.target.textContent;
    const productURL = e.target.getAttribute("data-url");

    searchInput.value = selectedText;
    dropdownList.style.display = "none";

    productLink.href = productURL;
    productLink.style.display = "block";
  }
});