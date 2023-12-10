document.getElementById('salary').addEventListener('input', calculateRent);
document.getElementById('baseRent').addEventListener('input', calculateRent);
document.getElementById('utilities').addEventListener('input', calculateRent);
document.getElementById('hoaFees').addEventListener('input', calculateRent);
document.getElementById('internet').addEventListener('input', calculateRent);
document.getElementById('parking').addEventListener('input', calculateRent);

async function getExchangeRate() {
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/EUR');
        const data = await response.json();
        return data.rates.RON;
    } catch (error) {
        console.error('Eroare la obținerea cursului de schimb:', error);
        return 1; // În caz de eroare, utilizăm un curs de schimb implicit
    }
}

async function calculateRent() {
    const salary = parseFloat(document.getElementById('salary').value) || 0;
    const baseRent = parseFloat(document.getElementById('baseRent').value) || 0;
    const utilities = parseFloat(document.getElementById('utilities').value) || 0;
    const hoaFees = parseFloat(document.getElementById('hoaFees').value) || 0;
    const internet = parseFloat(document.getElementById('internet').value) || 0;
    const parking = parseFloat(document.getElementById('parking').value) || 0;

    const exchangeRate = await getExchangeRate();

    const totalRentRON = baseRent + utilities + hoaFees + internet + parking;
    const totalRentEUR = (totalRentRON / exchangeRate).toFixed(2);

    const percentage = ((totalRentRON / salary) * 100).toFixed(2);

    document.getElementById('totalRent').textContent = totalRentRON + ' RON';
    document.getElementById('subtotalEuro').textContent = totalRentEUR + ' EUR';
    document.getElementById('percentage').textContent = percentage + '%';

    // Calculăm procentul din salariu pentru Chirie lunară de bază și îl afișăm
    const percentageOfSalary = ((baseRent / salary) * 100).toFixed(2);
    document.getElementById('percentageOfSalary').textContent = percentageOfSalary + '%';
}

// Inițializăm calculele la încărcarea paginii
calculateRent();
