const fs = require("fs-extra");
const { resolve } = require("path");

const sourcePath = resolve(__dirname, "public/build");
const destinationPath = resolve(__dirname, "dist");

// remove folder
const dir = "./public";

const removePublic = () => {
	fs.rm(dir, { recursive: true, force: true }, (err) => {
		if (err) {
			throw err;
		}

		console.log(`${dir} is deleted!`);
	});
};

// Move folder
fs.move(sourcePath, destinationPath, { overwrite: true }, (err) => {
	if (err) {
		console.error("Error moving folder:", err);
	} else {
		console.log("Folder moved successfully");

		if (process.env.ENV === "production") removePublic();
		else console.log("skip deleting client files");
	}
});
