let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

function addBlog() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const content = document.getElementById("content").value;

  if (!title || !author || !content) {
    alert("All fields are required");
    return;
  }

  const blog = {
    id: Date.now(),
    title,
    author,
    content,
    date: new Date().toLocaleDateString()
  };

  blogs.unshift(blog);
  localStorage.setItem("blogs", JSON.stringify(blogs));

  renderBlogs();
  clearForm();
}

function renderBlogs() {
  const blogSection = document.getElementById("blogs");
  blogSection.innerHTML = "";

  blogs.forEach(blog => {
    const div = document.createElement("div");
    div.className = "blog-card";

    div.innerHTML = `
      <h3>${blog.title}</h3>
      <div class="meta">By ${blog.author} • ${blog.date}</div>
      <p>${blog.content}</p>
      <button class="delete-btn" onclick="deleteBlog(${blog.id})">Delete</button>
    `;

    blogSection.appendChild(div);
  });
}

function deleteBlog(id) {
  blogs = blogs.filter(blog => blog.id !== id);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  renderBlogs();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("content").value = "";
}

renderBlogs();
