// ابدأ بتحميل ملف accounts.json
async function loadAccounts() {
  try {
    const response = await fetch('/js/accounts.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return [];
  }
}

// البحث عن البريد الإلكتروني والرصيد
async function updateCredit() {
  const email = getCookie('email');
  if (!email) {
    console.log('No email found in cookies');
    return;
  }

  const accounts = await loadAccounts();
  const account = accounts.find(acc => acc.email === email);

  const creditElement = document.getElementById('credit'); // استخدام id = "credit"
  if (account) {
    creditElement.textContent = account.credit || 'none';
  }
}

// الحصول من الكوكيز
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

// تنفيذ الكود عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', updateCredit);
