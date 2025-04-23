import messages from "../config/messages";
import store from "../redux/store";
import { addLog } from "../redux/reducers/logSlice";

/**
 * Logs a random message from the given category.
 * @param {string} category - The message category key.
 */

export function logMessage(category) {
  const categoryMessages = messages[category];
  if (!categoryMessages || categoryMessages.length === 0) {
    store.dispatch(addLog(`[Unknown message category: ${category}]`));
    return;
  }

  const index = Math.floor(Math.random() * categoryMessages.length);
  const message = categoryMessages[index];
  console.log(message);
  store.dispatch(addLog(message));
}
