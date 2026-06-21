import { aaveErrorMessages } from "./aaveErrorMapping";

export interface FriendlyError {
  /** Short, human title shown big in the modal */
  title: string;
  /** One sentence explaining what went wrong, in plain language */
  message: string;
  /** Actionable advice on how to avoid / fix it */
  hint?: string;
}

type RawError = Partial<{
  reason: string;
  message: string;
  code: number | string;
  data: { message?: string };
  /** The in-game action that triggered the error (Supply / Borrow / Repay / Withdraw). */
  gameAction: string;
}>;

/** Per-action copy for the ambiguous "computed amount was 0 / nothing to act on" case. */
const nothingToActOn: Record<string, FriendlyError> = {
  Supply: {
    title: "Nothing to supply",
    message: "You don't hold any of this token, so there's nothing to supply.",
    hint: "Open “Top up”, add some of this token, then shoot it with the Supply color.",
  },
  Borrow: {
    title: "Nothing to borrow",
    message: "Your available borrow amount for this token is 0.",
    hint: "Supply some collateral first (Supply color), then borrow against it.",
  },
  Repay: {
    title: "Nothing to repay",
    message: "You have no debt in this token, so there's nothing to repay.",
    hint: "You can only repay tokens you've borrowed (Borrow color).",
  },
  Withdraw: {
    title: "Nothing to withdraw",
    message: "You haven't supplied this token, so there's nothing to withdraw.",
    hint: "Supply this token first (Supply color); you can withdraw it later.",
  },
};

/** Friendly copy for the Aave protocol error codes that a player can actually hit in-game. */
const aaveFriendly: Record<string, FriendlyError> = {
  // 26 — Amount must be greater than 0
  "26": {
    title: "Nothing to use here",
    message: "The amount for this action came out to 0 — you don't hold any of this token yet.",
    hint: "Open “Top up” and add some of this token first. You can only supply assets you actually own.",
  },
  // 34 — The collateral balance is 0
  "34": {
    title: "No collateral yet",
    message: "You're trying to borrow, but you haven't supplied any collateral.",
    hint: "Shoot a token you own with the Supply color first, then borrow against it.",
  },
  // 36 — There is not enough collateral to cover a new borrow
  "36": {
    title: "Not enough collateral",
    message: "Your collateral can't cover a borrow this big.",
    hint: "Supply more collateral, or lower the action % and borrow a smaller amount.",
  },
  // 35 — Health factor lower than liquidation threshold
  "35": {
    title: "This would make your position unsafe",
    message: "This borrow would push your Health Factor below the safe limit.",
    hint: "Borrow less (lower the %) or supply more collateral to keep your Health Factor up.",
  },
  // 32 — User cannot withdraw more than the available balance
  "32": {
    title: "You can't withdraw that much",
    message: "You're trying to withdraw more than you've supplied.",
    hint: "Lower the action % and withdraw an amount you actually have supplied.",
  },
  // 39 / 42 — No debt to repay
  "39": {
    title: "Nothing to repay",
    message: "You don't have any debt in this asset, so there's nothing to repay.",
    hint: "You can only repay tokens you've borrowed. Try the Borrow color first.",
  },
  "42": {
    title: "Nothing to repay",
    message: "You don't have any outstanding debt in this asset.",
    hint: "You can only repay tokens you've borrowed. Try the Borrow color first.",
  },
  // 43 — Underlying balance needs to be greater than 0
  "43": {
    title: "Nothing to withdraw",
    message: "You haven't supplied this asset, so there's nothing to withdraw.",
    hint: "Supply this token first (Supply color), then you can withdraw it later.",
  },
  // 30 — Borrowing not enabled
  "30": {
    title: "Can't borrow this token",
    message: "Borrowing isn't enabled for this asset on the test market.",
    hint: "Pick a different token to borrow.",
  },
  // 47 — User did not borrow the specified currency
  "47": {
    title: "Nothing to repay",
    message: "You never borrowed this currency, so it can't be repaid.",
    hint: "Repay only the assets you've actually borrowed.",
  },
};

const extractAaveCode = (raw: string): string | null => {
  // Aave reverts look like "execution reverted: 34" or just "34"
  const match = raw.match(/(?:execution reverted:\s*)?\b(\d{1,2})\b/);
  if (match && aaveErrorMessages[match[1]]) {
    return match[1];
  }
  return null;
};

export const resolveFriendlyError = (error: RawError): FriendlyError => {
  const code = typeof error.code === "string" ? error.code : String(error.code ?? "");
  const raw = [error.reason, error.data?.message, error.message].filter(Boolean).join(" ").trim();
  const low = raw.toLowerCase();
  const action = error.gameAction;

  // 0) Game over (Health Factor dropped too low)
  if (low.includes("game over")) {
    return {
      title: "Game over",
      message: "Your Health Factor dropped below the safe limit and your position was wiped out.",
      hint: "Next run: borrow smaller amounts and keep more collateral to hold your Health Factor up.",
    };
  }

  // 1) User cancelled in the wallet
  if (
    code === "4001" ||
    code === "ACTION_REJECTED" ||
    low.includes("user rejected") ||
    low.includes("user denied") ||
    low.includes("rejected the request")
  ) {
    return {
      title: "Transaction cancelled",
      message: "You dismissed the request in your wallet, so nothing happened.",
      hint: "Press the action again and tap “Confirm” in MetaMask to go through with it.",
    };
  }

  // 2) Not enough ETH for gas
  if (low.includes("insufficient funds")) {
    return {
      title: "Not enough ETH for gas",
      message: "Your wallet doesn't have enough Sepolia ETH to pay the network fee.",
      hint: "Get free Sepolia ETH from a faucet, then try again.",
    };
  }

  // 3) Known Aave protocol code
  const aaveCode = extractAaveCode(raw);
  if (aaveCode && aaveFriendly[aaveCode]) {
    return aaveFriendly[aaveCode];
  }

  // 4) ERC20 allowance / balance — classic "haven't topped up" case
  if (low.includes("exceeds allowance")) {
    return {
      title: "Token not topped up",
      message:
        "You're trying to supply a token you haven't added to your game wallet (or approved) yet.",
      hint: "Open “Top up”, add some of this token, then shoot it to supply it as collateral.",
    };
  }
  if (low.includes("exceeds balance") || low.includes("transfer amount exceeds")) {
    return {
      title: "Not enough of this token",
      message: "You don't hold enough of this token for the amount you're trying to use.",
      hint: "Top up more of this token, or lower the action % before shooting it.",
    };
  }

  // 5) "amount must be > 0" (no balance / nothing to act on) — tailor per action
  if (low.includes("greater than 0") || low.includes("greater than zero")) {
    if (action && nothingToActOn[action]) {
      return nothingToActOn[action];
    }
    return {
      title: "Nothing to use here",
      message: "The amount for this action came out to 0 — you have no balance for it.",
      hint: "Top up this token first, or make sure you have a position (supplied/borrowed) to act on.",
    };
  }

  // 6) Fallback to the technical Aave message if we recognised a code but had no friendly copy
  if (aaveCode) {
    return {
      title: "Action not allowed",
      message: aaveErrorMessages[aaveCode],
    };
  }

  // 7) Last resort — show a cleaned-up raw message
  const cleaned = raw
    .replace(/execution reverted:?/i, "")
    .replace(/\(.*?\)/g, "")
    .trim();

  return {
    title: "Something went wrong",
    message: cleaned || "An unexpected error occurred. Please try again.",
  };
};
