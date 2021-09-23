function formatMoney(number) {
    let money = Number(number).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })
    return money
}

module.exports = formatMoney