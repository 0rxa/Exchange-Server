const express = require('express')
const app = express()

const options = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['html'],
	index: false,
	maxAge: '12h',
	redirect: true,
	setHeaders: (res, path, stat) => {
		res.set('x-built-by', 'rxa')
	}
}

app.use(express.static('./static/', options));
