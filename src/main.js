import App from './App.svelte';
require('../scripts/RPGUI/dist/rpgui')

var app = new App({
	target: document.body
});

export default app;