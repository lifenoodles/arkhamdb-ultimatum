### What is this?
This is a [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey) user script that generates legal decks on [ArkhamDB](https://arkhamdb.com) for the [Ultimatum of Chaos](https://www.fantasyflightgames.com/en/news/2017/9/18/invoke-thy-name/) mode for the Arkham Horror LCG.

### How do I install it?
 - Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey)
 - With Greasemonkey installed, [open the script](https://github.com/lifenoodles/arkhamdb-ultimatum/raw/master/arkhamdb-ultimatum.user.js)
  
### How do I use it?
 - Navigate to [ArkhamDB](https://arkhamdb.com) and edit a deck
 - There will be two new buttons labelled ___Enable all cards___ and ___Ultimatum of Chaos___
 - Click on ___Enable all cards___ (this just toggles on the class filters for all classes)
 - Click on ___Ultimatum of Chaos___
 - Wait for a few seconds, and you should have a legal deck. If the browser complains about the script taking too long, just give it a few seconds longer!

### Known Issues
 - Doesn't work with TamperMonkey yet due to some differences in access to browser objects between Firefox/Chrome.
 - Doesn't work with Father Matteo at the moment as the script doesn't consider XP cards at all.
 - Script relies on ArkhamDB having the deck building rules for the investigator implemented, so Norman Withers and some other novella investigators do not currently work correctly (note that the script selects from the currently listed card pool, so you can still make it work for Norman e.g. by deselecting Mystic cards)