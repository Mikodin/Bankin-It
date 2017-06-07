/* eslint jsx-a11y/img-has-alt: 0 */

export default class Account {
  constructor(name = undefined,
    initialAmount = 0,
    percentage = 0,
    parentId = undefined,
    fbKey = '') {
    // TODO: Hacky but it works for now.  I'll pull in a library at some point
    this.id = Math.floor(Math.random() * 100000);
    this.name = name;
    this.percentageOfParent = percentage;
    this.parentId = parentId;
    this.fbKey = fbKey;

    this.amount = this.calculateAmount(initialAmount, this.percentageOfParent);
    this.percent = 100;
    this.childAccounts = [];
    this.error = '';
  }

  calculateAmount(amount, percentage) {
    return amount * (percentage / 100);
  }
}
