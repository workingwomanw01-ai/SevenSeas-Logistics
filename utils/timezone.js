/**
 * Timezone utility functions for handling custom timestamps
 */

// Common timezone mappings
export const TIMEZONE_OPTIONS = [
  { value: '', label: '-- Select Timezone --' },
  
  // North America
  { value: 'America/New_York', label: 'Eastern Time (ET) - New York', group: 'North America' },
  { value: 'America/Chicago', label: 'Central Time (CT) - Chicago', group: 'North America' },
  { value: 'America/Denver', label: 'Mountain Time (MT) - Denver', group: 'North America' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT) - Los Angeles', group: 'North America' },
  { value: 'America/Phoenix', label: 'Arizona Time (MST)', group: 'North America' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKST)', group: 'North America' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HST)', group: 'North America' },
  { value: 'America/Toronto', label: 'Eastern Time - Toronto', group: 'North America' },
  { value: 'America/Vancouver', label: 'Pacific Time - Vancouver', group: 'North America' },
  
  // Europe
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT) - London', group: 'Europe' },
  { value: 'Europe/Paris', label: 'Central European Time (CET) - Paris', group: 'Europe' },
  { value: 'Europe/Berlin', label: 'Central European Time (CET) - Berlin', group: 'Europe' },
  { value: 'Europe/Rome', label: 'Central European Time (CET) - Rome', group: 'Europe' },
  { value: 'Europe/Madrid', label: 'Central European Time (CET) - Madrid', group: 'Europe' },
  { value: 'Europe/Amsterdam', label: 'Central European Time (CET) - Amsterdam', group: 'Europe' },
  { value: 'Europe/Moscow', label: 'Moscow Time (MSK)', group: 'Europe' },
  
  // Asia
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST) - Tokyo', group: 'Asia' },
  { value: 'Asia/Shanghai', label: 'China Standard Time (CST) - Shanghai', group: 'Asia' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong Time (HKT)', group: 'Asia' },
  { value: 'Asia/Singapore', label: 'Singapore Time (SGT)', group: 'Asia' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST) - Dubai', group: 'Asia' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST) - Mumbai', group: 'Asia' },
  { value: 'Asia/Seoul', label: 'Korea Standard Time (KST) - Seoul', group: 'Asia' },
  
  // Australia & Pacific
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AEST) - Sydney', group: 'Australia & Pacific' },
  { value: 'Australia/Melbourne', label: 'Australian Eastern Time (AEST) - Melbourne', group: 'Australia & Pacific' },
  { value: 'Australia/Perth', label: 'Australian Western Time (AWST) - Perth', group: 'Australia & Pacific' },
  { value: 'Pacific/Auckland', label: 'New Zealand Time (NZST) - Auckland', group: 'Australia & Pacific' },
  
  // Africa
  { value: 'Africa/Cairo', label: 'Eastern European Time (EET) - Cairo', group: 'Africa' },
  { value: 'Africa/Lagos', label: 'West Africa Time (WAT) - Lagos', group: 'Africa' },
  { value: 'Africa/Johannesburg', label: 'South Africa Time (SAST) - Johannesburg', group: 'Africa' },
  
  // South America
  { value: 'America/Sao_Paulo', label: 'Brasília Time (BRT) - São Paulo', group: 'South America' },
  { value: 'America/Argentina/Buenos_Aires', label: 'Argentina Time (ART) - Buenos Aires', group: 'South America' },
  { value: 'America/Lima', label: 'Peru Time (PET) - Lima', group: 'South America' },
  
  // UTC
  { value: 'UTC', label: 'Coordinated Universal Time (UTC)', group: 'UTC' }
];

/**
 * Get current date in YYYY-MM-DD format for a specific timezone
 * @param {string} timezone - IANA timezone string
 * @returns {string} Date in YYYY-MM-DD format
 */
export function getCurrentDateForTimezone(timezone = 'UTC') {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(now);
  } catch (error) {
    console.error('Error formatting date for timezone:', error);
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Get current time in HH:MM format for a specific timezone
 * @param {string} timezone - IANA timezone string
 * @returns {string} Time in HH:MM format
 */
export function getCurrentTimeForTimezone(timezone = 'UTC') {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    return formatter.format(now);
  } catch (error) {
    console.error('Error formatting time for timezone:', error);
    return new Date().toTimeString().slice(0, 5);
  }
}

/**
 * Convert date and time to specific timezone
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} time - Time in HH:MM format
 * @param {string} timezone - IANA timezone string
 * @returns {Date} JavaScript Date object
 */
export function createDateFromTimezone(date, time, timezone = 'UTC') {
  try {
    const dateTimeString = `${date}T${time}:00`;
    
    if (timezone === 'UTC') {
      return new Date(dateTimeString + 'Z');
    }
    
    // For other timezones, create a date assuming the input is in that timezone
    // This is a simplified approach - for production, consider using a library like date-fns-tz
    const tempDate = new Date(dateTimeString);
    return tempDate;
  } catch (error) {
    console.error('Error creating date from timezone:', error);
    return new Date();
  }
}

/**
 * Format a timestamp for display with timezone information
 * @param {Date|FirebaseTimestamp} timestamp - The timestamp to format
 * @param {string} timezone - IANA timezone string
 * @returns {string} Formatted timestamp string
 */
export function formatTimestampWithTimezone(timestamp, timezone = 'UTC') {
  try {
    let date;
    
    // Handle Firebase Timestamp
    if (timestamp && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }
    
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
    
    return formatter.format(date);
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return 'Invalid date';
  }
}

/**
 * Get timezone display name
 * @param {string} timezone - IANA timezone string
 * @returns {string} Human-readable timezone name
 */
export function getTimezoneDisplayName(timezone) {
  const option = TIMEZONE_OPTIONS.find(opt => opt.value === timezone);
  return option ? option.label : timezone || 'UTC';
}

/**
 * Validate timezone string
 * @param {string} timezone - IANA timezone string
 * @returns {boolean} Whether timezone is valid
 */
export function isValidTimezone(timezone) {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch (error) {
    return false;
  }
}
