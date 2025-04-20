/**
 * Get start of day for a given date
 * @param {Date} date
 * @returns {Date}
 */
const getStartOfDay = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
};

/**
 * Get end of day for a given date
 * @param {Date} date
 * @returns {Date}
 */
const getEndOfDay = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
};

/**
 * Format date to YYYY-MM-DD
 * @param {Date} date
 * @returns {string}
 */
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

/**
 * Format time to HH:mm
 * @param {Date} date
 * @returns {string}
 */
const formatTime = (date) => {
  return date.toTimeString().split(' ')[0].substring(0, 5);
};

/**
 * Calculate duration between two dates
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Object} duration object with hours and minutes
 */
const calculateDuration = (startDate, endDate) => {
  const diffMs = endDate - startDate;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
};

/**
 * Format duration object to string
 * @param {Object} duration
 * @returns {string}
 */
const formatDuration = (duration) => {
  return `${duration.hours}h ${duration.minutes}m`;
};

/**
 * Get date range for a specific period
 * @param {string} period - 'today' | 'week' | 'month' | 'year'
 * @returns {Object} start and end date
 */
const getDateRange = (period) => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  switch (period) {
    case 'today':
      return {
        start: getStartOfDay(now),
        end: getEndOfDay(now),
      };
    case 'week':
      start.setDate(now.getDate() - now.getDay());
      end.setDate(start.getDate() + 6);
      return {
        start: getStartOfDay(start),
        end: getEndOfDay(end),
      };
    case 'month':
      start.setDate(1);
      end.setMonth(now.getMonth() + 1, 0);
      return {
        start: getStartOfDay(start),
        end: getEndOfDay(end),
      };
    case 'year':
      start.setMonth(0, 1);
      end.setMonth(11, 31);
      return {
        start: getStartOfDay(start),
        end: getEndOfDay(end),
      };
    default:
      throw new Error('Invalid period');
  }
};

module.exports = {
  getStartOfDay,
  getEndOfDay,
  formatDate,
  formatTime,
  calculateDuration,
  formatDuration,
  getDateRange,
}; 