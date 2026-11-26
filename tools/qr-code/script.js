
const qrText = document.getElementById("qrText");
const qrSize = document.getElementById("qrSize");
const darkColor = document.getElementById("darkColor");
const lightColor = document.getElementById("lightColor");

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyBtn");

const qrContainer = document.getElementById("qrcode");
const message = document.getElementById("message");

let qrCode = null;

function generateQR() {
  const text = qrText.value.trim();

  if (!text) {
    message.textContent = "請先輸入網址或文字！";
    qrText.focus();
    return;
  }

  const size = Number(qrSize.value);

  qrContainer.innerHTML = "";

  qrCode = new QRCode(qrContainer, {
    text: text,
    width: size,
    height: size,
    colorDark: darkColor.value,
    colorLight: lightColor.value,
    correctLevel: QRCode.CorrectLevel.H
  });

  downloadBtn.disabled = false;
  message.textContent = "✓ QR Code 產生成功！";
}

function downloadQR() {
  const canvas = qrContainer.querySelector("canvas");

  if (!canvas) {
    message.textContent = "請先產生 QR Code！";
    return;
  }

  const link = document.createElement("a");
  link.download = "qr-studio.png";
  link.href = canvas.toDataURL("image/png");
  link.click();

  message.textContent = "✓ 圖片下載已開始！";
}

async function copyText() {
  const text = qrText.value.trim();

  if (!text) {
    message.textContent = "請先輸入文字！";
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    message.textContent = "✓ 已複製到剪貼簿！";
  } catch (error) {
    message.textContent = "無法複製，請手動選取文字。";
  }
}

generateBtn.addEventListener("click", generateQR);
downloadBtn.addEventListener("click", downloadQR);
copyBtn.addEventListener("click", copyText);

// 改變設定後重新產生 QR Code
qrSize.addEventListener("change", () => {
  if (qrText.value.trim()) generateQR();
});

darkColor.addEventListener("input", () => {
  if (qrText.value.trim()) generateQR();
});

lightColor.addEventListener("input", () => {
  if (qrText.value.trim()) generateQR();
});
