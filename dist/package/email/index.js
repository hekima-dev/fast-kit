"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasValidDomain = exports.validateMXRecord = exports.normalize = exports.getUsername = exports.getDomain = exports.isValid = void 0;
const dns_1 = __importDefault(require("dns"));
const string = __importStar(require("../string"));
/**
 * Check if the provided string is a valid email
 * @param email - string to be validated as email
 * @returns boolean - true if email is valid, false otherwise
 */
const isValid = (email) => {
    try {
        if (string.isNotEmpty(email)) {
            // Regular expression to match email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // Validate email using regex
            const isEmailValid = emailRegex.test(email);
            // Return true if email is valid
            return isEmailValid;
        }
        return false;
    }
    catch (error) {
        // Handle error without throw
        console.error(`Error in isValidEmail function: ${error.message}`);
        // Return false if there was an error
        return false;
    }
};
exports.isValid = isValid;
/**
 * Get the domain of the provided email address
 * @param email - string of the email address to get the domain from
 * @returns string - the domain of the provided email address, or an empty string if the email is invalid
 */
const getDomain = (email) => {
    try {
        if ((0, exports.isValid)(email)) {
            // Split email by '@' symbol to get domain
            const emailParts = email.split('@');
            const domain = emailParts[1];
            // Return domain
            return domain;
        }
        return "";
    }
    catch (error) {
        // Handle error without throw
        console.error(`Error in getEmailDomain function: ${error.message}`);
        // Return empty string if there was an error
        return '';
    }
};
exports.getDomain = getDomain;
/**
 * Get the username of the provided email address
 * @param email - string of the email address to get the username from
 * @returns string - the username of the provided email address, or an empty string if the email is invalid
 */
const getUsername = (email) => {
    try {
        if ((0, exports.isValid)(email)) {
            // Split email by '@' symbol to get username
            const emailParts = email.split('@');
            const username = emailParts[0];
            // Return username
            return username;
        }
        return '';
    }
    catch (error) {
        // Handle error without throw
        console.error(`Error in getEmailUsername function: ${error.message}`);
        // Return empty string if there was an error
        return '';
    }
};
exports.getUsername = getUsername;
/**
 * Normalize the provided email address by converting to lowercase and removing any spaces
 * @param email - string of the email address to normalize
 * @returns string - the normalized email address, or an empty string if the email is invalid
 */
const normalize = (email) => {
    try {
        if ((0, exports.isValid)(email)) {
            // Convert email to lowercase and remove spaces
            const normalizedEmail = email.toLowerCase().replace(/\s/g, '');
            // Return normalized email
            return normalizedEmail;
        }
        return '';
    }
    catch (error) {
        // Handle error without throw
        console.error(`Error in normalizeEmail function: ${error.message}`);
        // Return empty string if there was an error
        return '';
    }
};
exports.normalize = normalize;
/**
 * Validates the given email address and checks if its MX record is valid.
 * @param email - The email address to validate.
 * @returns A boolean value indicating whether the email is valid and its MX record is valid.
 */
const validateMXRecord = async (email) => {
    try {
        if ((0, exports.isValid)(email)) {
            // Use the built-in `dns` module to get the MX records for the domain
            await new Promise((resolve, reject) => {
                dns_1.default.resolveMx((0, exports.getDomain)(email), (error) => {
                    if (error)
                        reject(error);
                    else
                        resolve(true);
                });
            });
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(error.message);
        // If there is any error in the try block, the email is invalid or its MX record is invalid
        return false;
    }
};
exports.validateMXRecord = validateMXRecord;
/**
 * @returns true if the domain of the given email exists and is valid, false otherwise.
 * @param email The email to check.
 */
async function hasValidDomain(email) {
    try {
        await new Promise((resolve, reject) => {
            dns_1.default.resolve((0, exports.getDomain)(email), (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.hasValidDomain = hasValidDomain;
//# sourceMappingURL=index.js.map