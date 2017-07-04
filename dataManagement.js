var Database = function(id) {
  this.id = id;
};

var Company = function(brand, grade, domain) {

    this.brand = brand;
    this.grade = grade;
    this.override = false;
    this.known = false;
    this.domain = domain;

}

function validateStatus(grade) {
  var statusValidation = /^\b(A|B|C|D|F)\b$/;
  return statusValidation.test(grade);
}

Company.prototype.changeStatus = function(newStatus) {
  if (!validateStatus(newStatus)) return 'Invalid status';

  if (this.status === newStatus) {
    return this.brand + ' already has the status ' + this.status;
  } else {
    this.status = newStatus;
    return this.brand + '\'s status has been updated to ' + this.status;
  }
}

Database.prototype.addCompany = function(brand, grade, domain) {
  if (!validateStatus(grade)) return 'Invalid status';
  if (this.hasOwnProperty(brand)) return 'Company already in database';
  this[domain] = new Company(brand, grade, domain);
  return brand + 'has been added with a grade of ' + grade + ' and a domain of ' + domain;
}

Database.prototype.removeCompany = function(brand) {
  delete this[brand];
  return brand + ' has been deleted from the database';
}

Company.prototype.changeOverrideStatus = function() {

  if (this.override) {
    return 'This company is already been whitelisted';
  } else {
    this.override = true;
    return 'This company has been whitelisted';
  }
}

// what about changing status one time? like a single exception

Company.prototype.addKnown = function() {
    if (this.known) {
    return 'This something that makes sense'; // fix this later
  } else {
    this.known = true;
    return 'This company has been added to your known list';
  }
}


// seed hard coded test database

let seed = new Database('dev');

seed.addCompany('Southwest', 'B', 'southwest');
seed.addCompany('JetBlue', 'B', 'jetblue');
seed.addCompany('Delta', 'D', 'delta');
seed.addCompany('United', 'F', 'united');
seed.addCompany('American Airlines', 'F', 'aa');
seed.addCompany('Frontier', 'B', 'flyfrontier');
seed.addCompany('Virgin', 'B', 'virginamerica');
seed.addCompany('Spirit', 'C', 'spirit');

console.log(seed);

module.exports = seed;
