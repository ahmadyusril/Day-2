let data = [];

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById("input-blog-title").value;
  let content = document.getElementById("input-blog-content").value;
  let image = document.getElementById("input-blog-image").files;

  image = URL.createObjectURL(image[0]);
  console.log(image);

  let blog = {
    title,
    content,
    image,
    postAt: "10 August 2023",
    author: "Ahmad Yusril",
  };

  dataBlog.push(blog);
  console.log(dataBlog);

  renderBlog();
}

function renderBlog() {
  document.getElementById("contents").innerHTML = "";

  for (let index = 0; index < dataBlog.length; index++) {
    console.log(dataBlog[index]);

    document.getElementById("contents").innerHTML += `
      <div class="blog-list-item">
        <div class="blog-image">
          <img src="${dataBlog[index].image}" alt="" />
        </div>
        <div class="blog-content">
          <div class="btn-group">
            <button class="btn-edit">Edit Post</button>
            <button class="btn-post">Delete Post</button>
          </div>
          <h1>
            <a href="blog-detail.html" target="_blank"
              >${dataBlog[index].title}</a
            >
          </h1>
          <div class="detail-blog-content">
            ${dataBlog[index].postAt} | ${dataBlog[index].author}
          </div>
          <p>
            ${dataBlog[index].content}
          </p>
        </div>
      </div>
    `;
  }
}

// looping menggunakan for
// pada () for, value pertama adalah default value
// value kedua merupakan kondisi
// value ketiga akan berjalan ketika kondisi value kedua true
// for (let index = 0; index < dataBlog.length; index++) {
//   console.log(dataBlog[index]);
// }
