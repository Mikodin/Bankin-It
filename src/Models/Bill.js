class Bill {
  constructor(name, amount) {
    // TODO: Hacky but it works for now.  I'll pull in a library at some point
    this.id = Math.floor(Math.random() * 100000);
    this.name = name;
    this.amount = amount;
  }
}

export default Bill;
