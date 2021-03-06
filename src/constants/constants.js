// Define constants
export const NO_OF_HANDS = 2;
export const CARDS_PER_HAND = 5;

export const RESULT = {
    "win": 1, 
    "loss": 2, 
    "tie": 3 
};

export const VALUES = [
    "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"
];

export const SUITS = [
    "S", "H", "D", "C" 
];

export const SUIT_ICONS = {
    S: "♠️",
    H: "♥️",
    D: "♦️",
    C: "♣️"
};

export const HAND_RANKS = [
    "highcard", "pair", "two pair", "three of a kind", "straight", "flush", "full house", "four of a kind", "straight flush", "royal flush"
];