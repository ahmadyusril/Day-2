// Ini promise nya
const testimonial = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.npoint.io/f23b4f265bf2edcf4732", true);
    // console.log(xhr);

    xhr.onload = function () {
        if(xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
        }   else {
            reject("Error loading data!");
        }
    };

    xhr.onerror = function() {
        reject("Network error!");
    };

    xhr.send(); 
}); 

// Ini bagian async nya
async function allTestimonials() {
    try {
        const response = await testimonial;
        console.log(response);
    
        let testimonialHTML = '';
        response.forEach((item) => {
            testimonialHTML += `
                  <div class="testimonial">
                    <img src="${item.image}" class="profile-testimonial" />
                    <p class="quote">${item.quote}</p>
                    <p class="author">- ${item.author}</p>
                    <p class="author">${item.rating}<i class="fa-solid fa-star"></i></p>
                  </div>
                  `;
        });
        
        document.getElementById("testimonials").innerHTML = testimonialHTML;
    }   catch (error) {
        console.log(error);
    }
};

allTestimonials();

async function filterTestimonials(rating) {
    try {
        const response = await testimonial
        let testimonialHTML = "";
        
        const dataFiltered = response.filter(function (data) {
            return data.rating === rating;
        });

        if (dataFiltered.length === 0) {
            testimonialHTML = `<h2>Data not found! </h2>`;
        }   else {
            dataFiltered.forEach((data) => {
                testimonialHTML += `
                  <div class="testimonial">
                    <img src="${data.image}" class="profile-testimonial" />
                    <p class="quote">${data.quote}</p>
                    <p class="author">- ${data.author}</p>
                    <p class="author">${data.rating}<i class="fa-solid fa-star"></i></p>
                  </div>
                  `;
            });
        }

        document.getElementById("testimonials").innerHTML = testimonialHTML;
    }   catch (error) {
        console.log(error);
    }
};

