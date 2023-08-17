class Testimonial {
    #quote = "";
    #image = "";

    constructor(quote, image) {
        this.#quote = quote;
        this.#image = image;
    }

    get quote() {
        return this.#quote;
    }
    
    get image() {
        return this.#image;
    }

    get author () {
        throw new Error("getAuthor()  method must be implemented.");
    }

    get testimonialHTML() {
        return `
            <div class="testimonial">
                <img src="${this.image}" class="profile-testimonial" />
                <p class="quote">
                    ${this.quote}
                </p>
                <p class="author">- ${this.author}</p>
            </div>
        `;
    }
}

class AuthorTestimonial  extends Testimonial {
    #author = "";

    constructor(author, quote, image) {
        super(quote, image);
        this.#author = author;
    }

    get author() {
        return this.#author;
    }
}

class CompanyTestimonial extends Testimonial {
    #company = "";

    constructor(author, quote, image) {
        super(quote, image);
        this.#company = author;
    }

    get author() {
        return this.#company + " Company";
    }
}

const testimonial1 = new AuthorTestimonial(
    "Kiana Kaslana",
    "Wooooww mantap! Mei-senpai juga menyukainya!",
    "image/testi1.jpg"
);

const testimonial2 = new AuthorTestimonial(
    "Enrico Pucci",
    "Benar-benar salah satu blog sepanjang masa",
    "image/testi2.jpg"
);

const testimonial3 = new AuthorTestimonial(
    "Georgekowi Floydodo",
    "Keren banget sampai saya susah bernafas",
    "image/testi3.jpg"
);

let testimonialData = [testimonial1, testimonial2, testimonial3]
let testimonialHTML = "";

for (let i = 0; i < testimonialData.length; i++) {
    testimonialHTML += testimonialData[i].testimonialHTML
}

document.getElementById("testimonials").innerHTML = testimonialHTML;