// 📸 Gallery Data
const gallery = [
  { img: "main1.jpg", title: "School Building", category: "campus" },
  { img: "main1.jpg", title: "Classroom", category: "campus" },

  { img: "main1.jpg", title: "Annual Function", category: "events" },
  { img: "main1.jpg", title: "Independence Day", category: "events" },

  { img: "main1.jpg", title: "Sports Day", category: "sports" },
  { img: "main1.jpg", title: "Football Match", category: "sports" },

  { img: "main1.jpg", title: "Science Lab", category: "labs" },
  { img: "main1.jpg", title: "Chemistry Lab", category: "labs" },
  { img: "main1.jpg", title: "Classroom", category: "campus" },

  { img: "main1.jpg", title: "Annual Function", category: "events" },
  { img: "main1.jpg", title: "Independence Day", category: "events" },

  { img: "main1.jpg", title: "Sports Day", category: "sports" },
  { img: "main1.jpg", title: "Football Match", category: "sports" },

  { img: "main1.jpg", title: "Science Lab", category: "labs" },
  { img: "main1.jpg", title: "Chemistry Lab", category: "labs" },
  { img: "main1.jpg", title: "Classroom", category: "campus" },

  { img: "main1.jpg", title: "Annual Function", category: "events" },
  { img: "main1.jpg", title: "Independence Day", category: "events" },

  { img: "main1.jpg", title: "Sports Day", category: "sports" },
  { img: "main1.jpg", title: "Football Match", category: "sports" },

  { img: "main1.jpg", title: "Science Lab", category: "labs" },
  { img: "main1.jpg", title: "Chemistry Lab", category: "labs" },
  { img: "main1.jpg", title: "Classroom", category: "campus" },

  { img: "main1.jpg", title: "Annual Function", category: "events" },
  { img: "main1.jpg", title: "Independence Day", category: "events" },

  { img: "main1.jpg", title: "Sports Day", category: "sports" },
  { img: "main1.jpg", title: "Football Match", category: "sports" },

  { img: "main1.jpg", title: "Science Lab", category: "labs" },
  { img: "main1.jpg", title: "Chemistry Lab", category: "labs" },
];

const container = document.getElementById("gallery-container");
const buttons = document.querySelectorAll(".gallery-filters button");

// 🎯 Render Gallery (ONLY selected category)
function renderGallery(category = "campus") {
  container.innerHTML = "";

  // Filter by category
  const filteredData = gallery.filter((item) => item.category === category);

  // ✅ Sort by title (A → Z)
  filteredData.sort((a, b) => a.title.localeCompare(b.title));

  filteredData.forEach((item) => {
    const card = document.createElement("div");
    card.className = "gallery-item";
    card.setAttribute("data-aos", "zoom-in");

    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="overlay">${item.title}</div>
    `;

    card.addEventListener("click", () => {
      openLightbox(item.img);
    });

    container.appendChild(card);
  });
}

// 🎯 Button Click Handling
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class
    buttons.forEach((b) => b.classList.remove("active"));

    // Add active to clicked
    btn.classList.add("active");

    // Get category from data attribute
    const category = btn.dataset.category;

    renderGallery(category);
  });
});

// 🎯 Lightbox Functions
function openLightbox(img) {
  window.open(img, "_blank");
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// 🚀 Initial Load (Campus only)
renderGallery("campus");
