class Account {
  constructor(accountName, total, percentage) {
    this.id = Math.floor(Math.random() * 100000);
    this.accountName = accountName;
    this.percentage = percentage;
    this.total = total;
    this.subAccounts = [];

    this.reCalculateTotal(this.total);
  }

  reCalculateTotal(total) {
    this.total = this.calculateTotal(total);

    this.subAccounts = this.subAccounts.map((sub) => {
      const account = sub.reCalculateTotal(this.total);

      return account;
    });

    return this;
  }

  calculateTotal(total) {
    const decimal = this.convertPercentageToDecimal(this.percentage);

    return total * decimal;
  }

  convertPercentageToDecimal(percent) {
    return percent / 100;
  }

  addAccount(account) {
    this.subAccounts.push(account);
  }
}

export default Account;
