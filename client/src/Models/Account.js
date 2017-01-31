class Account {
  constructor(accountName , total, percentage) {
    this.accountName = accountName;
    this.total = total;
    this.percentage = percentage;
    this.subAccounts = [];
  }

  calculateTotal(total) {
    return total * this.percentage;
  }

  addAccount(account) {
    this.subAccounts.push(account);
  }
}

export default Account;
