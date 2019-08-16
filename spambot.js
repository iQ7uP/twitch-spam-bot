let i = 0; // dont touch you bitch

const TwitchBot = require('twitch-bot');

const BOTNAME = "33kk";
const OAUTH_TOKEN = "oauth:7mwsqqh8gx3gciymv577t8uzkdczev";
const CHANNEL = "zakvielchannel"

const startCommand = "START BOT"
const stopCommand = "ЗАТКНИСЬ ТВАРЬ"
const disableCommand = "ЗАТКНИСЬ НАВСЕГДА"
const disablebyanyone = false

const text = ("D: ".repeat(15) + " (ТЕКСТ #$i$) ").repeat(4) + " для остановки бота на 5 минут напишыте " + stopCommand + " или дайте мут на сколько нужно, плиз не пермач))"
const delay = 2000; //2 sec
const autowaittime = 5 * 60 * 1000;//5 min

let disabled = false;
let autoid = false;
let iid = false;

Bot.on('join', (...p) => {
	console.log("JOIN: ", ...p);
});

Bot.on('error', (...p) => {
	console.log("ERROR: ", ...p);
});

function start(auto) {
	console.log((auto ? "AUTO " : "MANUAL ") + "START");
	disabled = false;
	if (iid) clearInterval(iid);
	var i = 0;
	iid = setInterval(() => {
		i += 1;
		Bot.say(text.replace('$i$', i));
		console.log("Message #" + i);
	}, delay);
}

Bot.on('message', (msg) => {
	if (msg.message === startCommand && msg.username === BOTNAME.toLowerCase()) {
		start(false);
	}
	if (msg.message === stopCommand || msg.message == disableCommand) {
		if (!disabled) {
			if (iid) clearInterval(iid);
			console.log("STOP by " + msg.username + " at msg #" + i);
			if (msg.message == disableCommand && (msg.username === BOTNAME.toLowerCase() || disablebyanyone)) {
				console.log("DISABLE by " + msg.username + " at msg #" + i);
				disabled = true;
			}
			else {
				if (autoid) clearTimeout(autoid);
				autoid = setTimeout(() => {
					start(true);
				}, autowaittime);
			}
		}
	}
});

