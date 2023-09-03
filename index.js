const express = require("express");
const app = express();
const port = 5000
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");

// set serving static file
app.use(express.static(path.join(__dirname, "src/assets")));

// set serving static file specific
app.use(express.static(path.join(__dirname, "/image")));

// parsing data
app.use(express.urlencoded({ extended: false }));

// Sequelize init
const config = require('./src/config/config.json');
const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = new Sequelize(config.development);

// Setup call hbs with sub folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views/"));

app.use("/image", express.static("image"))
app.use("/js", express.static("js"))
app.use(express.urlencoded({ extended: false }));

// setup flash
app.use(flash());

// setup session
app.use(
	session({
		cookie: {
			httpOnly: true,
			secure: false,
			maxAge: 1000 * 60 * 60 * 2,
		},
		store: new session.MemoryStore(),
		saveUninitialized: true,
		resave: false,
		secret: "secretValue",
	})
);

// routing kayaknya
app.get("/", home);
app.get("/home", homeLogin);
app.get("/blog", blog);
app.get("/contact", contactMe);
app.get("/blog-detail/:id", blogDetail);
app.get("/edit-blog", editBlog);
app.post("/blog", addBlog);
app.get("/delete-blog/:id", deleteBlog);

// login, Register, logout
app.get("/register", formRegister);
app.post("/register", addUser);
app.get("/login", formLogin);
app.post("/login", userLogin);
app.get("/logout", logout);

// local server
app.listen(port, function () {
    console.log(`server running on port : ${port}`);
})

// module.exports = app;

// index?
async function home(request, response) {
    response.render("index")
}
// index login
async function homeLogin (request, response) {
	try{
        const query = `SELECT * FROM "projects";`
        let obj = await sequelize.query(query, { type: QueryTypes.SELECT});

        const data = obj.map(response => ({
            ...response,
        }));
        
        response.render("index", { data:data, isLogin: request.session.isLogin, user: request.session.user});
    }   catch (error) {
        console.log(error)
    }
} 
// project?
async function blog(request, response) {
    try{
        const query = `SELECT * FROM "projects";`
        let obj = await sequelize.query(query, { type: QueryTypes.SELECT});

        const data = obj.map(response => ({
            ...response,
        }));
        
        response.render("blog", { data, isLogin: request.session.isLogin, user: request.session.user});
    }   catch (error) {
        console.log(error)
    }
}

// blog-content?
// function editBlog(request, response) {
//     response.render("blog", {isLogin: request.session.isLogin, user: request.session.user});
// }

// add new project
async function addBlog(request, response) {
	try {
		const {
			name,
			start_date,
			end_date,
			description,
			nodejs,
			reactjs,
			nextjs,
			typescript,
		} = request.body;
		const image = "kiana.jpg";

		let start = new Date(start_date);
		let end = new Date(end_date);

		if (start > end) {
			return console.log("You Fill End Date Before Start Date");
		}

		let difference = end.getTime() - start.getTime();
		let days = difference / (1000 * 3600 * 24);
		let weeks = Math.floor(days / 7);
		let months = Math.floor(weeks / 4);
		let years = Math.floor(months / 12);
		let duration = "";

		if (days > 0) {
			duration = days + " Hari";
		}
		if (weeks > 0) {
			duration = weeks + " Minggu";
		}
		if (months > 0) {
			duration = months + " Bulan";
		}
		if (years > 0) {
			duration = years + " Tahun";
		}

		const user = request.session.user
		const author = request.session.userId;

		// Mengubah nilai string kosong menjadi false jika checkbox tidak dipilih
		const nodejsValue = nodejs === "true" ? true : false;
		const reactjsValue = reactjs === "true" ? true : false;
		const nextjsValue = nextjs === "true" ? true : false;
		const typescriptValue = typescript === "true" ? true : false;
		const technologiesValue = [];
		if (nodejsValue === true) {
		technologiesValue.push("nodeJs");
		}
		if (reactjsValue === true) {
		technologiesValue.push("reactjs");
		}
		if (nextjsValue === true) {
		technologiesValue.push("nextjs");
		}
		if (typescriptValue === true) {
		technologiesValue.push("typescript");
		}
		
		const query = `INSERT INTO projects(author, name, start_date, end_date, description, technologies, image, "createdAt", "updatedAt") VALUES ('${user}', '${name}', '${start_date}',
		 '${end_date}', '${description}', ARRAY ['${technologiesValue}'], '${image}', NOW(), NOW())`;
		await sequelize.query(query, {type: sequelize.QueryTypes.POST})

		response.redirect("/home");
	} catch (error) {
		console.log(error);
	}
}

// edit blog
async function editBlog(request, response) {
	try {
		const id = parseInt(request.params.id);
		const query = `SELECT * FROM "projects" WHERE id=${id}`;
		const obj = await sequelize.query(query, {
			type: QueryTypes.SELECT,
		});
		response.render("edit-blog", { blog: obj[0], blogIndex: id });
	} catch (error) {
		console.log(error);
	}
}

// update blog
async function updateBlog(request, response) {
	try {
		const { id } = request.params;
		const {
			name,
			start_date,
			end_date,
			description,
			nodejs,
			reactjs,
			nextjs,
			typescript,
		} = request.body;
		const image = "stray2.png";

		let start = new Date(start_date);
		let end = new Date(end_date);

		if (start > end) {
			return console.log("You Fill End Date Before Start Date");
		}

		let difference = end.getTime() - start.getTime();
		let days = difference / (1000 * 3600 * 24);
		let weeks = Math.floor(days / 7);
		let months = Math.floor(weeks / 4);
		let years = Math.floor(months / 12);
		let duration = "";

		if (days > 0) {
			duration = days + " Hari";
		}
		if (weeks > 0) {
			duration = weeks + " Minggu";
		}
		if (months > 0) {
			duration = months + " Bulan";
		}
		if (years > 0) {
			duration = years + " Tahun";
		}

		// Mengubah nilai string kosong menjadi false jika checkbox tidak dipilih
		const nodejsValue = nodejs === "true" ? true : false;
		const reactjsValue = reactjs === "true" ? true : false;
		const nextjsValue = nextjs === "true" ? true : false;
		const typescriptValue = typescript === "true" ? true : false;

		await sequelize.query(
			`UPDATE public."projects" SET name='${name}', start_date='${start_date}', end_date='${end_date}', description='${description}', nodejs=${nodejsValue}, reactjs=${reactjsValue}, nextjs=${nextjsValue}, typescript=${typescriptValue}, duration='${duration}', image='${image}' WHERE id=${id};`,
			{
				type: sequelize.QueryTypes.UPDATE,
			}
		);

		response.redirect("/home");
	} catch (error) {
		console.log(error);
	}
}

// blog detail
async function blogDetail(request, response) {
	try {
		const { id } = request.params;
		const query = `SELECT * FROM "projects" WHERE id=${id}`;
		const obj = await sequelize.query(query, {
			type: QueryTypes.SELECT,
		});

		const data = obj.map((response) => ({
			...response,
		}));

		response.render("blog-detail", {
			blog: data[0],
			isLogin: request.session.isLogin,
			user: request.session.user,
		});
	} catch (error) {
		console.log(error);
	}
}

// contact me
function contactMe(request, response) {
	response.render("contact", {
		isLogin: request.session.isLogin,
		user: request.session.user,
	});
}

// Delete blog
async function deleteBlog(request, response) {
	try {
		const { id } = request.params;

		await sequelize.query(`DELETE FROM "projects" WHERE id = ${id};`);
		response.redirect("/home");
	} catch (error) {
		console.log(error);
	}
}

function formRegister(request, response) {
	response.render("register");
}

async function addUser(request, response) {
	try {
		const { name, email, password } = request.body;
		const salt = 10;

		await bcrypt.hash(password, salt, (error, hashPassword) => {
			const query = `INSERT INTO users (name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${hashPassword}', NOW(), NOW())`;
			sequelize.query(query);
			response.redirect("login");
		});
	} catch (error) {
		console.log(error);
	}
}

// login
function formLogin(request, response) {
	response.render("login");
}

// Buat post data login
async function userLogin(request, response) {
	try {
		const { email, password } = request.body;
		const query = `SELECT * FROM "users" WHERE email = '${email}'`;
		let obj = await sequelize.query(query, { type: QueryTypes.SELECT });

		console.log(obj);

		// cek jika email belum teradaftar
		if (!obj.length) {
			request.flash("danger", "Daftar dulu coeg!");
			return response.redirect("/login");
		}

		await bcrypt.compare(password, obj[0].password, (error, responseult) => {
			if (!responseult) {
				request.flash("danger", "passwordnya salah!");
				return response.redirect("login");
			} else {
				request.session.isLogin = true;
				request.session.userId = obj[0].id;
				request.session.user = obj[0].name;
				request.flash("success", "Login berhasil");
				response.redirect("/home");
			}
		});
	} catch (error) {
		console.log(error);
	}
}

function logout(request, response) {
	if (request.session.isLogin) {
		request.session.destroy((error) => {
			if (error) {
				console.log(error);
			} else {
				response.redirect("/");
			}
		});
	} else {
		response.redirect("/");
	}
}
