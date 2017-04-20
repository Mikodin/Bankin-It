export default class Account {
  constructor(name, initialAmount, percentage) {
    // TODO: Hacky but it works for now.  I'll pull in a library at some point
    this.id = Math.floor(Math.random() * 100000);
    this.name = name;
    this.percentageOfParent = percentage;
    this.amount = this.calculateAmount(initialAmount, this.percentageOfParent);
    this.percent = 100;
    this.childAccounts = [];
  }

  calculateAmount(amount, percentage) {
    return amount * (percentage / 100);
  }
}
