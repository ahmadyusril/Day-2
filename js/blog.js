let dataBlog = [];

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById("input-blog-title").value;
  let content = document.getElementById("input-blog-content").value;
  let image = document.getElementById("input-blog-image");

  let img = URL.createObjectURL(image.files[0]);
  console.log(img);

  let startDate = document.getElementById("input-blog-startDate").value;
  let endDate = document.getElementById("input-blog-endDate").value;

  let blog = {
    title,
    content,
    img,
    postAt: "10 August 2023",
    author: "Ahmad Yusril",
  };

  dataBlog.push(blog);
  console.log(dataBlog);

  renderBlog();
}

function renderBlog() {
  document.getElementById ("name").innerHTML = "";

  for (let index = 0; index < dataBlog.length; index++) {
    console.log(dataBlog[index]);

    document.getElementById ("name").innerHTML += `
      <div class="blog-list-item">
        <div class="blog-image">
          <img src="${dataBlog[index].img}" alt="" />
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

function getFullTime(time) {

  let date = time.getDate();

  let monthIndex = time.getMonth();

  let year = time.getFullYear();

  let hours = time.getHours();

  let minutes = time.getMinutes();

  let month;
  switch (monthIndex) {
    case 1:
      month = "Jan";
      break;
    case 2:
      month = "Feb";
      break;
    case 3:
      month = "Mar";
      break;
    case 4:
      month = "Apr";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "Jun";
      break;
    case 7:
      month = "Jul";
      break;
    case 8:
      month = "Aug";
      break;
    case 9:
      month = "Sep";
      break;
    case 10:
      month = "Oct";
      break;
    case 11:
      month = "Nov";
      break;
    case 12:
      month = "Dec";
      break;
  }

  if (hours <= 9) {
    hours = "0" + hours;
  } else if (minutes <= 9) {
    minutes = "0" + minutes;
  }

  return `${date} ${month} ${year} ${hours}:${minutes} WIB`;
}

function getDistance(time) {
  let timeNow = new Date();
  let timePost = time;

  let distance = timeNow - timePost;

  let milisecond = 1000;
  let secondInHours = 3600;
  let hoursInDays = 24;

  let distanceDay = Math.floor(
    distance / (milisecond * secondInHours * hoursInDays)
  );
  let distanceHours = Math.floor(distance / (milisecond * 60 * 60));
  let distanceMinutes = Math.floor(distance / (milisecond * 60));
  let distanceSecond = Math.floor(distance / milisecond);

  if (distanceDay > 0) {
    return `${distanceDay} days ago`;
  } else if (distanceHours > 0) {
    return `${distanceHours} hours ago`;
  } else if (distanceMinutes > 0) {
    return `${distanceMinutes} minutes ago`;
  } else {
    return `${distanceSecond} seconds ago`;
  }
}

setInterval(function () {
  renderProject();
}, 3000);