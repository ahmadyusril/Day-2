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
  let node = document.getElementById("nodejs");
  let next = document.getElementById("nextjs");
  let react = document.getElementById("reactjs");
  let type = document.getElementById("typescript");

  let checked = []

  if (node.checked == true) {
    checked.push(node.value);
  }
  if(next.checked == true) {
    checked.push(next.value)
  }
  if(react.checked == true) {
    checked.push(react.value)
  }
  if(type.checked == true) {
    checked.push(type.value)
  }
  
  let blog = {
    title,
    content,
    img,
    postAt: new Date(),
    author: "Ahmad Yusril",
    startDate,
    endDate,
    technologies: checked
  };

  dataBlog.push(blog);
  console.log(dataBlog);

  renderBlog();
}

function renderBlog() {
  document.getElementById("contents").innerHTML = "";

  for (let index = 0; index < dataBlog.length; index++) {
    console.log(dataBlog[index]);
    const data = dataBlog[index]
    document.getElementById("contents").innerHTML += `
    <div class="container-card">
    <div class="card-content">
        <img src="${data.img}" alt="gambar">
        <h1>
            <a href="blog-detail.html" target="_blank">
                ${data.title}
            </a>
        </h1>
        <p>durasi : ${getDuration(data.startDate, data.endDate)}</p>
        <p>posted at : ${getFullTime(data.postAt)}</p>
        <p>${getDistance(data.postAt)}</p>
        <div id="container-desc">
        ${data.content}
        </div>
        <div style="margin-top: 5px;" id="technology">
        ${data.technologies.map((technology) => getTechnology(technology)).join("")}
        </div>
        <div class="ctn-btn">
            <div class="btn-left">
                <button>edit</button>
            </div>
            <div class="btn-right">
                <button>delete</button>
            </div>
        </div>
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

function getTechnology(value) {
  if (value == "nodejs") {
    return `<img src="image/nodejs.png" style="width: 30px; height: 30px" />`
  } else if (value == "react-js") {
    return `<img src="image/react-js.png" style="width: 30px; height: 30px" />`
  } else if (value == "nextjs") {
    return `<img src="image/nextjs.png" style="width: 30px; height: 30px" />`
  } else if (value == "typescript") {
    return `<img src="image/typescript.png" style="width: 30px; height: 30px" />`
  }
}

function getDuration(start, end) {
  let projectStart = new Date(start)
  let projectEnd = new Date(end)

  let duration = projectEnd - projectStart

  let monthDuration = Math.floor(duration / (30 * 24 * 60 * 60 * 1000))
  if (monthDuration > 0) {
      return monthDuration + ' bulan'
  } else {
      let weekDuration = Math.floor(duration / (7 * 24 * 60 * 60 * 1000))
      if (weekDuration > 0) {
          return weekDuration + ' minggu'
      } else {
          let dayDuration = Math.floor(duration / (24 * 60 * 60 * 1000))
          if (dayDuration > 0) {
              return dayDuration + ' hari'
          } else {
              let hourDuration = Math.floor(duration / (60 * 60 * 1000))
              if (hourDuration > 0) {
                  return hourDuration + ' jam'
              } else {
                  let minuteDuration = Math.floor(duration / (60 * 1000))
                  if (minuteDuration > 0) {
                      return minuteDuration + ' menit'
                  } else {
                      let secondDuration = Math.floor(duration / 1000)
                      if (secondDuration > 0) {
                          return secondDuration + ' detik'
                      }
                  }
              }
          }
      }
  } 
}

setInterval(function () {
  renderBlog();
}, 3000);