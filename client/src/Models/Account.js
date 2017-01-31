class Account {
  constructor(total, percentage) {
    this.total = total;
    this.percentage = percentage;
  }

  calculateTotal() {
    return this.total * this.percentage;
  }
}

export default Account;
