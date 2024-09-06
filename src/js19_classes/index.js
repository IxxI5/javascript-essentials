// index.js
// Classes (Classes, Inheritance, Subclasses)
// Vehicle Management System example

// Base class representing a generic Vehicle
class Vehicle {
  constructor(brand, model, year) {
    this._brand = brand; // Notice we use an underscore to indicate a "private" property
    this._model = model; // Conventionally, properties starting with _ are considered private
    this._year = year;
  }

  // Getter for brand property
  get brand() {
    return this._brand;
  }

  // Setter for brand property
  set brand(newBrand) {
    if (newBrand) {
      this._brand = newBrand; // Sets a new brand if provided
    } else {
      console.log("Invalid brand");
    }
  }

  // Getter for model property
  get model() {
    return this._model;
  }

  // Setter for model property
  set model(newModel) {
    if (newModel) {
      this._model = newModel; // Sets a new model if provided
    } else {
      console.log("Invalid model");
    }
  }

  // Getter for year property
  get year() {
    return this._year;
  }

  // Setter for year property (with a basic validation)
  set year(newYear) {
    if (newYear > 1900 && newYear <= new Date().getFullYear()) {
      this._year = newYear; // Sets the year if it's valid
    } else {
      console.log("Invalid year");
    }
  }

  // Method to display vehicle details
  displayInfo() {
    console.log(`${this._year} ${this._brand} ${this._model}`);
  }

  // Method to calculate the vehicle's age
  calculateAge() {
    const currentYear = new Date().getFullYear();
    return currentYear - this._year;
  }
}

// Subclass representing a Car, inheriting from Vehicle
class Car extends Vehicle {
  constructor(brand, model, year, doors, fuelType) {
    super(brand, model, year); // Call the constructor of the parent class
    this._doors = doors; // New property specific to Car
    this._fuelType = fuelType; // New property specific to Car
  }

  // Getter for doors property
  get doors() {
    return this._doors;
  }

  // Setter for doors property (with a basic validation)
  set doors(newDoors) {
    if (newDoors > 0 && newDoors <= 5) {
      this._doors = newDoors; // Sets a valid number of doors
    } else {
      console.log("Invalid number of doors");
    }
  }

  // Getter for fuelType property
  get fuelType() {
    return this._fuelType;
  }

  // Setter for fuelType property (with validation)
  set fuelType(newFuelType) {
    const validTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
    if (validTypes.includes(newFuelType)) {
      this._fuelType = newFuelType; // Sets the fuel type if valid
    } else {
      console.log("Invalid fuel type");
    }
  }

  // Override displayInfo to include car-specific information
  displayInfo() {
    console.log(
      `${this._year} ${this._brand} ${this._model} with ${this._doors} doors (${this._fuelType})`
    );
  }

  // Method specific to Car: Calculate the fuel consumption based on distance
  calculateFuelConsumption(distance) {
    const fuelConsumption = (distance / 12).toFixed(2); // Assuming 12 km/l mileage
    console.log(`Fuel consumed for ${distance} km: ${fuelConsumption} liters`);
  }
}

// Subclass representing a Truck, inheriting from Vehicle
class Truck extends Vehicle {
  constructor(brand, model, year, capacity) {
    super(brand, model, year); // Call the parent constructor
    this._capacity = capacity; // Capacity in tons
  }

  // Getter for capacity property
  get capacity() {
    return this._capacity;
  }

  // Setter for capacity property (with a validation for positive values)
  set capacity(newCapacity) {
    if (newCapacity > 0) {
      this._capacity = newCapacity;
    } else {
      console.log("Invalid capacity");
    }
  }

  // Method specific to Truck: Check if it can carry a certain weight
  canCarry(weight) {
    if (weight <= this._capacity) {
      console.log(`The truck can carry ${weight} tons`);
    } else {
      console.log(
        `The truck cannot carry ${weight} tons, max capacity is ${this._capacity} tons`
      );
    }
  }
}

// Subclass representing a Motorcycle, inheriting from Vehicle
class Motorcycle extends Vehicle {
  constructor(brand, model, year, engineCapacity) {
    super(brand, model, year); // Call the parent constructor
    this._engineCapacity = engineCapacity; // New property for engine capacity
  }

  // Getter for engineCapacity property
  get engineCapacity() {
    return this._engineCapacity;
  }

  // Setter for engineCapacity property (validating a positive value)
  set engineCapacity(newCapacity) {
    if (newCapacity > 0) {
      this._engineCapacity = newCapacity;
    } else {
      console.log("Invalid engine capacity");
    }
  }

  // Method specific to Motorcycle: Display engine capacity
  displayEngineCapacity() {
    console.log(
      `${this._brand} ${this._model} has an engine capacity of ${this._engineCapacity} cc`
    );
  }
}

// Example usage of the classes

// Creating a Car instance
const car = new Car("Toyota", "Corolla", 2020, 4, "Petrol");
car.displayInfo(); // Output: 2020 Toyota Corolla with 4 doors (Petrol)
console.log(`Car age: ${car.calculateAge()} years`); // Output: Car age: 4 years
car.calculateFuelConsumption(120); // Output: Fuel consumed for 120 km: 10.00 liters

// Update car properties using setters
car.doors = 5; // Setting a valid number of doors
car.fuelType = "Diesel"; // Changing fuel type
car.brand = ""; // Attempt to set an invalid brand (empty string)
car.displayInfo(); // Output: 2020 Toyota Corolla with 5 doors (Diesel)

// Creating a Truck instance
const truck = new Truck("Ford", "F-150", 2018, 5);
truck.displayInfo(); // Output: 2018 Ford F-150
console.log(`Truck age: ${truck.calculateAge()} years`); // Output: Truck age: 6 years
truck.canCarry(4); // Output: The truck can carry 4 tons
truck.canCarry(6); // Output: The truck cannot carry 6 tons, max capacity is 5 tons

// Creating a Motorcycle instance
const motorcycle = new Motorcycle("Yamaha", "YZF-R3", 2021, 321);
motorcycle.displayInfo(); // Output: 2021 Yamaha YZF-R3
console.log(`Motorcycle age: ${motorcycle.calculateAge()} years`); // Output: Motorcycle age: 3 years
motorcycle.displayEngineCapacity(); // Output: Yamaha YZF-R3 has an engine capacity of 321 cc

// Using setters on the Motorcycle instance
motorcycle.engineCapacity = 400; // Updating engine capacity
motorcycle.displayEngineCapacity(); // Output: Yamaha YZF-R3 has an engine capacity of 400 cc

/** Output:
 *  2020 Toyota Corolla with 4 doors (Petrol)
    Car age: 4 years
    Fuel consumed for 120 km: 10.00 liters
    Invalid brand
    2020 Toyota Corolla with 5 doors (Diesel)
    2018 Ford F-150
    Truck age: 6 years
    The truck can carry 4 tons
    The truck cannot carry 6 tons, max capacity is 5 tons
    2021 Yamaha YZF-R3
    Motorcycle age: 3 years
    Yamaha YZF-R3 has an engine capacity of 321 cc
    Yamaha YZF-R3 has an engine capacity of 400 cc
 */
