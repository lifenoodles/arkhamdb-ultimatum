// ==UserScript==
// @description This script attempts to generate a legal Ultimatum of chaos deck by randomly selecting cards as a user on arkhamdb. As such it does not contain any investigator specific logic, leaving that to arkhamdb.
// @name     ArkhamDB Ultimatum of Chaos Generator
// @version  1
// @namespace http://www.lifenoodles.com/gmscripts
// @include  https://arkhamdb.com/deck/edit/*
// @author   Donagh Hatton
// ==/UserScript==

const DECK_TOO_SMALL = "too few cards";

function click(element, shift) {
     const event = document.createEvent('MouseEvents');
     event.initMouseEvent('click', 
                          true, 
                          true, 
                          window, 
                          0, 
                          1, 
                          1, 
                          1, 
                          1, 
                          false, 
                          false, 
                          shift, 
                          false, 
                          0, 
                          null);
     element.dispatchEvent(event);
}

function getWarnings() {
  const warnings = document.getElementsByClassName("text-danger");
  const actualWarnings = [];
  for (let warning of warnings) {
    if (!/\d+ cards \(\d+ total\)/.test(warning.innerText)) {
      actualWarnings.push(warning.innerText);
    }
  }
  return actualWarnings;
}

function hasTooFewCards() {
  const warnings = getWarnings();
  for (let warning of warnings) {
    if (warning.includes(DECK_TOO_SMALL)) {
      return true;
    }
  }
  return false;
}

function isDeckBorked() {
  const warnings = getWarnings();
  if (warnings.length > 1) {
    return true;
  }
  if (warnings[0].includes(DECK_TOO_SMALL)) {
      return false;
  }
  return true;
}

function randInt(x) {
  return Math.floor(Math.random() * Math.floor(x));
}

function getCardAt(index) {
  const cards = document.getElementById("collection-table");
  const cardRow = cards.children[index];
  return cardRow;
}

function getTotalCardCount() {
  const cards = document.getElementById("collection-table");
  return cards.children.length;
}

function getCardButtons(index) {
  const card = getCardAt(index);
  const buttonElements = card.children[0].children[0];
  const buttons = [];
  for (var i = 0; i < buttonElements.children.length; ++i) {
    const button = buttonElements.children[i].children[0];
    buttons.push(button);
  }
  return buttons;
}

function getCardCount(index) {
	const buttons = getCardButtons(index);
  for (var i = 0; i < buttons.length; ++i) {
    if (buttons[i].checked) {
      return i;
    }
  }
  return buttons.length - 1;
}

function getMaxCardCount(index) {
	const buttons = getCardButtons(index);
  return buttons.length - 1;
}

function isCardAtCapacity(index) {
	return getCardCount(index) === getMaxCardCount(index);
}

function addCard(index) {
  console.assert(!isCardAtCapacity(index), "cannot add card: " + index);
  const buttons = getCardButtons(index);
  const count = getCardCount(index);
  if (count < buttons.length && count >= 0) {
    click(buttons[count + 1]);
    return true;
  }
  return false;
}

function removeCard(index) {
  console.assert(getCardCount(index) > 0, "cannot remove card: " + index);
  const buttons = getCardButtons(index);
  const count = getCardCount(index);
  if (count < buttons.length && count >= 0) {
    click(buttons[count - 1]);
    return true;
  }
  return false;
}

function enableFilters() {
  const playerFilters = document.getElementById("player-cards-filters").children[0].children[0].children;
  for (let filter of playerFilters) {
    if (!filter.className.includes("active")) {
        click(filter, true);
    }
  }
}

function generate(event) {
  const forbidden = new Set();
  const cardCount = getTotalCardCount();
  console.log("" + cardCount + " cards found");
  while (hasTooFewCards()) {
    let index = randInt(cardCount);
    while (forbidden.has(index)) {
      index = randInt(cardCount);
    }
    const card = getCardAt(index);
    const cardName = card.children[1].children[0].text;
    console.log("selected: " + index + " [" + cardName + "]");
    addCard(index);
    // if we've added all we can of this card, it can't be selected again
    if (isCardAtCapacity(index)) {
	  	forbidden.add(index);
    }
    // if adding this card broke the deck, it can't be added again
    if (isDeckBorked()) {
      console.log(cardName + " broke the deck, removing");
      forbidden.add(index);
      removeCard(index);
    }
  }
}

function setUp(action) {
  const table = document.getElementById("table-suggestions");
  // add the filter button
  const filterButton = document.createElement("input");
  filterButton.setAttribute("type", "button");
  filterButton.setAttribute("name", "enable-filters");
  filterButton.setAttribute("value", "Enable all cards");
  filterButton.addEventListener("click", enableFilters)
  table.insertBefore(filterButton, null);
  // add the generate button
  const randButton = document.createElement("input");
  randButton.setAttribute("type", "button");
  randButton.setAttribute("name", "generate");
  randButton.setAttribute("value", "Ultimatum of Chaos");
  randButton.addEventListener("click", action)
  table.insertBefore(randButton, null);
}

setUp(generate);
