const CryptoJS = require("crypto-js");

async function loadChalk() {
  const chalk = await import("chalk");
  return chalk.default;
}

function encryptString(algorithm, plaintext, secretKey) {
  let encrypted = "";

  switch (algorithm.toUpperCase()) {
    case "AES":
      encrypted = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
      break;

    case "DES":
      encrypted = CryptoJS.DES.encrypt(plaintext, secretKey).toString();
      break;

    case "TRIPLEDES":
      encrypted = CryptoJS.TripleDES.encrypt(plaintext, secretKey).toString();
      break;

    case "RC4":
      encrypted = CryptoJS.RC4.encrypt(plaintext, secretKey).toString();
      break;

    case "RABBIT":
      encrypted = CryptoJS.Rabbit.encrypt(plaintext, secretKey).toString();
      break;

    case "RC4DROP":
      encrypted = CryptoJS.RC4Drop.encrypt(plaintext, secretKey).toString();
      break;

    default:
      console.log("Unsupported algorithm");
      return null;
  }

  return encrypted;
}

function decryptString(algorithm, encryptedText, secretKey) {
  let decrypted = "";

  switch (algorithm.toUpperCase()) {
    case "AES":
      decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
      break;

    case "DES":
      decrypted = CryptoJS.DES.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
      break;

    case "TRIPLEDES":
      decrypted = CryptoJS.TripleDES.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
      break;

    case "RC4":
      decrypted = CryptoJS.RC4.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
      break;

    case "RABBIT":
      decrypted = CryptoJS.Rabbit.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
      break;

    case "RC4DROP":
      decrypted = CryptoJS.RC4Drop.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
      break;

    default:
      console.log("Unsupported algorithm");
      return null;
  }

  return decrypted;
}

async function main() {
  const chalk = await loadChalk();

  const plaintext = "1951_83c3abf6-451b-4c45-9d61-e66a9a29635b";
  const secretKey = "mySecretKey";

  const algorithms = ["AES", "DES", "TripleDES", "RC4", "Rabbit", "RC4Drop"];

  algorithms.forEach(algorithm => {
    const encryptedText = encryptString(algorithm, plaintext, secretKey);
    const decryptedText = decryptString(algorithm, encryptedText, secretKey);

    console.log(chalk.blue(`Algorithm: ${algorithm}`));
    console.log(chalk.green(`Encrypted: ${encryptedText}`));
    console.log(chalk.yellow(`Decrypted: ${decryptedText}`));
    console.log(chalk.gray('--------------------------------'));
  });
}

main();