/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user
 * @property {string} username - The user's chosen username
 * @property {string} password - The user's password (would be hashed in production)
 * @property {number} balance - The user's current balance
 */

/**
 * @typedef {Object} MenuItem
 * @property {string} id - Unique identifier for the menu item
 * @property {string} name - Name of the menu item
 * @property {string} description - Description of the menu item
 * @property {number} price - Price of the menu item
 * @property {string} image - URL of the menu item image
 * @property {string} category - Category of the menu item
 * @property {boolean} available - Whether the item is available for ordering
 */

/**
 * @typedef {Object} CartItem
 * @property {string} menuItemId - ID of the menu item
 * @property {number} quantity - Number of items in cart
 * @property {string} name - Name of the menu item
 * @property {number} price - Price of the menu item
 */

/**
 * @typedef {Object} Order
 * @property {string} id - Unique identifier for the order
 * @property {string} userId - ID of the user who made the order
 * @property {CartItem[]} items - Array of items in the order
 * @property {number} totalAmount - Total cost of the order
 * @property {'pending'|'delivered'|'cancelled'} status - Status of the order
 * @property {string} orderDate - Date the order was placed
 * @property {string} estimatedDeliveryTime - Estimated delivery time
 */