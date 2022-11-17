const got = require('got');
const vm = require('vm')

function savefrom(url) {
	return new Promise(async(resolve, reject) => {
		let req = await got('https://worker.sf-tools.com/savefrom.php',{
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				origin: 'https://pt.savefrom.net',
				referer: 'https://pt.savefrom.net/',
				'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36'
			},
			form: {
				sf_url: url,
				sf_submit: '',
				new: 2,
				lang: 'pt',
				app: '',
				country: 'br',
				os: 'Windows',
				browser: 'Chrome',
				channel: ' main',
				'sf-nomad': 1
			}
		}).text()
		const executeCode = '[]["filter"]["constructor"](b).call(a);'
		if (req.indexOf(executeCode) === -1) console.log(`${req}`)
			req = req.replace(executeCode, `
				try {
					i++;
					if (i === 2) scriptResult = ${executeCode.split('.call')[0]}.toString();
					else (
						${executeCode.replace(/;/, '')}
					);
				} catch {}
				`)
		const context = {
			scriptResult: '',
			i: 0
		}
		vm.createContext(context)
		new vm.Script(req).runInContext(context)
		const json = JSON.parse(context.scriptResult.split('window.parent.sf.videoResult.show(')?.[1].split(');')?.[0])
		resolve(json)
	})
}

module.exports = {
	savefrom
}