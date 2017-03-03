class Account {
  constructor(accountName, total, percentage) {
    this.accountName = accountName;
    this.percentage = percentage;
    this.total = total * percentage;
    this.subAccounts = [];
  }

  calculateTotal(total) {
    return total * this.percentage;
  }

  reCalculateTotal(total) {
    this.total = total * this.percentage;

    this.subAccounts = this.subAccounts.map((sub) => {
      const account = sub.reCalculateTotal(this.total);

      return account;
    });

    return this;
  }

  addAccount(account) {
    this.subAccounts.push(account);
  }
}

export default Account;
