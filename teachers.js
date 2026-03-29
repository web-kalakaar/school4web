// 📌 All Teachers Data (ADD HERE ONLY)
const teachers = [
  {
    name: "Rahul Sharma",
    class: "12th",
    stream: "Science",
    subject: "Physics",
    qualification: "M.Sc Physics",
    experience: "8 Years",
    image: "logo.png",
    category: "senior",
  },
    {
    name: "Rahul Sharma",
    class: "12th",
    stream: "Science",
    subject: "Physics",
    qualification: "M.Sc Physics",
    experience: "8 Years",
    image: "logo.png",
    category: "senior",
  },  {
    name: "Rahul Sharma",
    class: "12th",
    stream: "Science",
    subject: "Physics",
    qualification: "M.Sc Physics",
    experience: "8 Years",
    image: "logo.png",
    category: "senior",
  },  {
    name: "Rahul Sharma",
    class: "12th",
    stream: "Science",
    subject: "Physics",
    qualification: "M.Sc Physics",
    experience: "8 Years",
    image: "logo.png",
    category: "senior",
  },  {
    name: "Rahul Sharma",
    class: "12th",
    stream: "Science",
    subject: "Physics",
    qualification: "M.Sc Physics",
    experience: "8 Years",
    image: "logo.png",
    category: "senior",
  },
  {
    name: "Anita Verma",
    class: "11th",
    stream: "Arts",
    subject: "History",
    qualification: "M.A History",
    experience: "6 Years",
    image: "logo.png",
    category: "senior",
  },
  {
    name: "Suresh Meena",
    class: "10th",
    subject: "Maths",
    qualification: "B.Ed, B.Sc",
    experience: "5 Years",
    image: "logo.png",
    category: "secondary",
  },
  {
    name: "Pooja Singh",
    class: "5th",
    subject: "English",
    qualification: "B.A, D.El.Ed",
    experience: "4 Years",
    image: "logo.png",
    category: "primary",
  },
];

// 🎯 Function to create card
function createCard(t) {
  return `
    <div class="teacher-card">
      <img src="${t.image}" alt="${t.name}">
      <h3>${t.name}</h3>
      <p>
        <strong>Class:</strong> 
        ${t.class}${t.stream ? " - " + t.stream : ""}
      </p>
      <p><strong>Subject:</strong> ${t.subject}</p>
      <p><strong>Qualification:</strong> ${t.qualification}</p>
      <p><strong>Experience:</strong> ${t.experience}</p>
    </div>
  `;
}

// 🎯 Render Teachers
teachers.forEach((t) => {
  // Senior Secondary (with stream separation)
  if (t.category === "senior") {
    if (t.stream === "Science") {
      document.getElementById("senior-science").innerHTML += createCard(t);
    } else if (t.stream === "Arts") {
      document.getElementById("senior-arts").innerHTML += createCard(t);
    }
  }

  // Secondary
  else if (t.category === "secondary") {
    document.getElementById("secondary").innerHTML += createCard(t);
  }

  // Primary
  else if (t.category === "primary") {
    document.getElementById("primary").innerHTML += createCard(t);
  }
});
